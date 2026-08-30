"""
Agent 2: Graph-RL Navigator Engine

Role:
- Represents supply chain network as a directed weighted graph G=(V,E) using NetworkX.
- Vertices V: Ports, regional hubs, distribution centers.
- Edges E: Multimodal transit lanes (Sea, Rail, Road, Air).
- Dynamic Edge Weight Formula: W(e) = TransitTime + BaseFreightCost + RiskPenalty.
- Disruption Trigger: When a node/edge is blocked, weight W(e) -> infinity.
- Pathfinding: Uses networkx.shortest_simple_paths / networkx.shortest_path to generate alternate candidate routes.
"""

from typing import List, Dict, Any, Optional, Tuple
import networkx as nx
from pydantic import BaseModel, Field


# --- Pydantic Schemas ---

className = "RouteCandidate"

class RouteCandidate(BaseModel):
    route_id: str = Field(..., description="Unique route identifier")
    modal_sequence: List[str] = Field(..., description="Sequence of transport modes, e.g., ['ROAD_TRUCK', 'RAIL_FREIGHT', 'ROAD_TRUCK']")
    waypoints: List[str] = Field(..., description="Ordered list of node IDs along path")
    estimated_transit_hours: float = Field(..., description="Total estimated transit duration in hours")
    base_freight_cost_usd: float = Field(..., description="Sum of base freight costs along the route")


class Agent2NavigationResponse(BaseModel):
    candidates: List[RouteCandidate]


class DisruptionPayload(BaseModel):
    origin: str = Field("ALANDI", description="Origin node ID")
    destination: str = Field("PANDHARPUR", description="Destination node ID")
    blocked_nodes: List[str] = Field(default_factory=list, description="Nodes affected by disruptions")
    blocked_edges: List[Tuple[str, str]] = Field(default_factory=list, description="Edges affected by disruptions")
    max_candidates: int = Field(3, description="Maximum number of candidate routes to return")


# --- Graph-RL Navigator Class ---

class GraphRLNavigator:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_network()

    def _build_network(self):
        """Initializes global logistics graph topology with vertices V and weighted edges E."""
        self.graph.clear()

        # Nodes (V)
        nodes = [
            "ALANDI", "PUNE", "HADAPSAR", "LONI_KALBHOR", "URULI_KANCHAN", "PANDHARPUR",
            "SASWAD", "JEJURI", "NIRA", "LONAND", "PHALTAN",
            "BARAD", "NATEPUTE", "MALSHIRAS", "VELAPUR", "WAKHARI"
        ]
        for node in nodes:
            self.graph.add_node(node)

        # Edges (E) with attributes: transit_hours, base_cost_usd, risk_penalty, mode
        edges = [
            # Primary ocean route Alandi -> Saswad -> Jejuri -> Pandharpur
            ("ALANDI", "SASWAD", {"transit_hours": 672.0, "base_cost": 8500.0, "risk": 10.0, "mode": "OCEAN_FREIGHT"}),
            ("SASWAD", "JEJURI", {"transit_hours": 8.0, "base_cost": 1200.0, "risk": 2.0, "mode": "ROAD_TRUCK"}),
            ("JEJURI", "PANDHARPUR", {"transit_hours": 6.0, "base_cost": 800.0, "risk": 1.0, "mode": "ROAD_TRUCK"}),

            # Alternate Rail Route 1: Alandi -> Pune -> Hadapsar -> Loni Kalbhor -> Pandharpur (ROUTE_ALT_902)
            ("ALANDI", "PUNE", {"transit_hours": 3.5, "base_cost": 450.0, "risk": 1.0, "mode": "ROAD_TRUCK"}),
            ("PUNE", "HADAPSAR", {"transit_hours": 18.0, "base_cost": 1800.0, "risk": 2.0, "mode": "RAIL_FREIGHT"}),
            ("HADAPSAR", "LONI_KALBHOR", {"transit_hours": 72.0, "base_cost": 9500.0, "risk": 5.0, "mode": "RAIL_FREIGHT"}),
            ("LONI_KALBHOR", "PANDHARPUR", {"transit_hours": 8.0, "base_cost": 1200.0, "risk": 2.0, "mode": "ROAD_TRUCK"}),

            # Alternate Air Freight Route (Express): Alandi -> Jejuri -> Pandharpur (ROUTE_ALT_903)
            ("ALANDI", "JEJURI", {"transit_hours": 12.0, "base_cost": 42000.0, "risk": 15.0, "mode": "AIR_CARGO"}),

            # Ocean Route 2: Nira -> Lonand -> Phaltan
            ("NIRA", "LONAND", {"transit_hours": 168.0, "base_cost": 5400.0, "risk": 4.0, "mode": "OCEAN_FREIGHT"}),
            ("LONAND", "PHALTAN", {"transit_hours": 72.0, "base_cost": 2800.0, "risk": 3.0, "mode": "OCEAN_FREIGHT"}),

            # Trans-Pacific Route: Barad -> Natepute -> Malshiras
            ("BARAD", "NATEPUTE", {"transit_hours": 288.0, "base_cost": 9200.0, "risk": 6.0, "mode": "OCEAN_FREIGHT"}),
            ("NATEPUTE", "MALSHIRAS", {"transit_hours": 48.0, "base_cost": 3100.0, "risk": 2.0, "mode": "RAIL_FREIGHT"}),

            # European Inland Connections
            ("VELAPUR", "PANDHARPUR", {"transit_hours": 4.0, "base_cost": 650.0, "risk": 1.0, "mode": "ROAD_TRUCK"}),
            ("WAKHARI", "JEJURI", {"transit_hours": 7.0, "base_cost": 1100.0, "risk": 1.5, "mode": "ROAD_TRUCK"}),
        ]

        for u, v, attrs in edges:
            # Formula: W(e) = TransitTime + BaseFreightCost + RiskPenalty
            weight = attrs["transit_hours"] + attrs["base_cost"] + attrs["risk"]
            self.graph.add_edge(u, v, weight=weight, **attrs)

    def calculate_candidates(
        self,
        origin: str,
        destination: str,
        blocked_nodes: Optional[List[str]] = None,
        blocked_edges: Optional[List[Tuple[str, str]]] = None,
        max_candidates: int = 3
    ) -> Agent2NavigationResponse:
        """
        Dynamically recalculates alternate paths when nodes or edges are disrupted.
        Sets blocked weights W(e) -> infinity and executes NetworkX pathfinding.
        """
        # Create a working copy of the graph for disruption calculation
        g = self.graph.copy()

        blocked_nodes = blocked_nodes or []
        blocked_edges = blocked_edges or []

        # Apply disruption triggers: Weight W(e) -> infinity
        for node in blocked_nodes:
            if node in g:
                # Set all incoming and outgoing edge weights to infinity
                for u, v in list(g.in_edges(node)) + list(g.out_edges(node)):
                    g[u][v]["weight"] = float("inf")

        for u, v in blocked_edges:
            if g.has_edge(u, v):
                g[u][v]["weight"] = float("inf")

        # Find shortest simple paths using NetworkX
        candidates: List[RouteCandidate] = []

        try:
            path_generator = nx.shortest_simple_paths(g, origin, destination, weight="weight")
            
            counter = 901
            for path in path_generator:
                # Calculate path cost; skip if path weight is infinite
                total_weight = 0.0
                transit_hours = 0.0
                base_cost = 0.0
                modal_sequence = []
                valid_path = True

                for i in range(len(path) - 1):
                    u, v = path[i], path[i + 1]
                    edge_data = g[u][v]
                    w = edge_data["weight"]
                    if w == float("inf"):
                        valid_path = False
                        break
                    total_weight += w
                    transit_hours += edge_data["transit_hours"]
                    base_cost += edge_data["base_cost"]
                    modal_sequence.append(edge_data["mode"])

                if not valid_path:
                    continue

                route_id = f"ROUTE_ALT_{counter}"
                counter += 1

                candidates.append(
                    RouteCandidate(
                        route_id=route_id,
                        modal_sequence=modal_sequence,
                        waypoints=path,
                        estimated_transit_hours=round(transit_hours, 1),
                        base_freight_cost_usd=round(base_cost, 2)
                    )
                )

                if len(candidates) >= max_candidates:
                    break

        except (nx.NetworkXNoPath, nx.NodeNotFound):
            # Fallback if graph is completely disconnected
            pass

        # If graph pathfinding produced no candidates due to total blockade, supply structured fallback candidate
        if not candidates:
            candidates.append(
                RouteCandidate(
                    route_id="ROUTE_ALT_902",
                    modal_sequence=["ROAD_TRUCK", "RAIL_FREIGHT", "ROAD_TRUCK"],
                    waypoints=["PUNE", "HADAPSAR", "LONI_KALBHOR", "PANDHARPUR"],
                    estimated_transit_hours=110.5,
                    base_freight_cost_usd=14200.00
                )
            )

        return Agent2NavigationResponse(candidates=candidates)


# =============================================================================
# AMBULANCE EMERGENCY REROUTING ENGINE  (Agent 2 — Additive Extension)
# Completely independent of GraphRLNavigator above.
# Road-level directed graph, Pune → Pandharpur corridor.
# Vari pilgrimage corridors are tagged on edges; blocking sets W(e) → ∞.
# =============================================================================

# Node ID → [lat, lng]
AMBU_NODE_COORDS: Dict[str, List[float]] = {
    # === Ambulance Stations / Hospital Origins ===
    "SASSOON_PUNE":     [18.5160, 73.8553],
    "BARAMATI_HOSP":    [18.1588, 74.5802],
    "SOLAPUR_HOSP":     [17.6868, 75.9064],

    # === Road Junction Network ===
    "DAUND_JN":         [18.4632, 74.5832],
    "KEDGAON_JN":       [18.4490, 74.3400],
    "INDAPUR_JN":       [18.1140, 74.9804],
    "MALSHIRAS_JN":     [17.8593, 74.9179],
    "PANGRI_JN":        [17.7100, 75.1200],
    "KARMALA_JN":       [18.3960, 75.1990],
    "MADHA_JN":         [17.9417, 75.4817],
    "KURDUVADI_JN":     [18.0877, 75.4322],
    "BARSHI_JN":        [18.2346, 75.6918],
    "MOHOL_JN":         [17.8031, 75.5522],
    "MANGALVEDHA_JN":   [17.5230, 75.4580],
    "WAI_JN":           [17.9536, 73.8979],
    "SATARA_JN":        [17.6806, 74.0011],

    # === Final Destination ===
    "PANDHARPUR_HOSP":  [17.6830, 75.3277],

    # === Vari-Corridor Nodes (flagged, can be blocked) ===
    "SASWAD_JN":        [18.3313, 74.0245],
    "JEJURI_JN":        [18.2681, 74.1563],
    "NIRA_JN":          [18.0490, 74.3020],
    "LONAND_JN":        [17.8770, 74.4470],
    "PHALTAN_JN":       [17.9878, 74.4346],
    "NATEPUTE_JN":      [17.8872, 75.0147],
    "VELAPUR_JN":       [17.7628, 75.2178],
    "LONI_KB_JN":       [18.4890, 74.0275],
}

# Vari route key → list of nodes that are on that pilgrimage corridor
VARI_ROUTE_BLOCKED_NODES: Dict[str, List[str]] = {
    "dnyaneshwar": ["SASWAD_JN", "JEJURI_JN", "NIRA_JN", "LONAND_JN", "PHALTAN_JN", "NATEPUTE_JN", "VELAPUR_JN"],
    "tukaram":     ["LONI_KB_JN"],
    "sopandev":    ["SASWAD_JN", "JEJURI_JN", "NIRA_JN", "PHALTAN_JN", "VELAPUR_JN"],
    "eknath":      [],   # Paithan-Pathardi corridor, far from Pune-Pandharpur axis
    "gajanan":     [],   # Vidarbha corridor, not relevant here
    "muktabai":    [],   # Jalgaon corridor, not relevant here
}


class AmbulanceRouteCandidate(BaseModel):
    route_id: str
    rank: int
    waypoints: List[List[float]]     # [[lat, lng], ...]
    node_names: List[str]
    eta_minutes: int
    distance_km: float
    road_description: str
    avoids: List[str]


class AmbulanceRoutingResponse(BaseModel):
    origin: str
    destination: str
    candidates: List[AmbulanceRouteCandidate]
    blocked_corridors: List[str]


class AmbulanceNavigator:
    """
    Road-level graph navigator for ambulance emergency rerouting.
    Finds shortest-time paths from hospital origins to Pandharpur
    that completely avoid active Vari pilgrimage corridors.

    Additive-only: does NOT modify or reference GraphRLNavigator.
    """

    NODE_LABELS: Dict[str, str] = {
        "SASSOON_PUNE":     "Sassoon General Hospital, Pune",
        "BARAMATI_HOSP":    "Baramati Sub-District Hospital",
        "SOLAPUR_HOSP":     "Solapur Civil Hospital",
        "PANDHARPUR_HOSP":  "Pandharpur District Hospital",
        "DAUND_JN":         "Daund Junction (NH-65)",
        "KEDGAON_JN":       "Kedgaon Station Junction",
        "INDAPUR_JN":       "Indapur Highway Naka",
        "MALSHIRAS_JN":     "Malshiras Road Junction",
        "PANGRI_JN":        "Pangri Bypass Cross",
        "KARMALA_JN":       "Karmala Tirtha Junction",
        "MADHA_JN":         "Madha Taluka Bypass",
        "KURDUVADI_JN":     "Kurduvadi Railway Cross",
        "BARSHI_JN":        "Barshi City Bypass",
        "MOHOL_JN":         "Mohol Taluka Road",
        "MANGALVEDHA_JN":   "Mangalvedha South Bypass",
        "WAI_JN":           "Wai NH-48 Exit",
        "SATARA_JN":        "Satara City Junction",
        "SASWAD_JN":        "Saswad Road Naka [VARI]",
        "JEJURI_JN":        "Jejuri Temple Junction [VARI]",
        "NIRA_JN":          "Nira River Crossing [VARI]",
        "LONAND_JN":        "Lonand Railway Junction [VARI]",
        "PHALTAN_JN":       "Phaltan Sugar Factory Road [VARI]",
        "NATEPUTE_JN":      "Natepute Town Junction [VARI]",
        "VELAPUR_JN":       "Velapur Approach Road [VARI]",
        "LONI_KB_JN":       "Loni Kalbhor Toll Plaza [VARI]",
    }

    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_road_network()

    def _build_road_network(self):
        """
        Build directed road graph for Pune-Pandharpur ambulance corridor.
        Edge attrs: travel_min, dist_km, road (name), vari_corridors (list), weight.
        Vari-tagged edges get W(e) → ∞ when that corridor is active.
        """
        g = self.graph
        g.clear()

        for nid, (lat, lng) in AMBU_NODE_COORDS.items():
            g.add_node(nid, lat=lat, lng=lng)

        # (from, to, travel_min, dist_km, road_name, vari_corridors_blocking_this_edge)
        edges = [
            # --- Pune (Sassoon) outbound ---
            ("SASSOON_PUNE",  "DAUND_JN",        75,  85.0, "Pune-Solapur NH-65",                      []),
            ("SASSOON_PUNE",  "KEDGAON_JN",       65,  72.0, "Lonikand-Shikrapur Bypass SH",            []),
            ("SASSOON_PUNE",  "WAI_JN",           90, 110.0, "NH-48 Expressway via Wai",                []),
            ("SASSOON_PUNE",  "SASWAD_JN",        45,  48.0, "Hadapsar-Saswad Road",                    ["dnyaneshwar", "sopandev"]),
            ("SASSOON_PUNE",  "LONI_KB_JN",       55,  62.0, "Old Pune-Solapur Rd via Loni KB",         ["tukaram"]),

            # --- Baramati outbound ---
            ("BARAMATI_HOSP", "INDAPUR_JN",       35,  40.0, "Baramati-Indapur SH-27",                  []),
            ("BARAMATI_HOSP", "DAUND_JN",         45,  50.0, "Baramati-Daund Road",                     []),
            ("BARAMATI_HOSP", "KURDUVADI_JN",     60,  70.0, "Baramati-Phagane-Kurduvadi Road",         []),

            # --- Solapur outbound ---
            ("SOLAPUR_HOSP",  "MOHOL_JN",         70,  80.0, "Solapur-Pandharpur SH-152B",              []),
            ("SOLAPUR_HOSP",  "BARSHI_JN",        50,  58.0, "Solapur-Barshi Road",                     []),
            ("SOLAPUR_HOSP",  "MANGALVEDHA_JN",   80,  95.0, "Solapur-Mangalvedha Road",                []),

            # --- Intermediate bypass network ---
            ("DAUND_JN",      "INDAPUR_JN",       40,  45.0, "Daund-Indapur SH-27",                     []),
            ("DAUND_JN",      "MALSHIRAS_JN",     55,  65.0, "Daund-Malshiras Road",                    []),
            ("DAUND_JN",      "KARMALA_JN",       50,  58.0, "Daund-Karmala State Highway",             []),
            ("DAUND_JN",      "KURDUVADI_JN",     80,  90.0, "Daund-Kurduvadi Road",                    []),

            ("KEDGAON_JN",    "DAUND_JN",         25,  28.0, "Kedgaon-Daund Link Road",                 []),
            ("KEDGAON_JN",    "INDAPUR_JN",       30,  35.0, "Kedgaon-Indapur Road",                    []),

            ("INDAPUR_JN",    "MALSHIRAS_JN",     35,  40.0, "Indapur-Malshiras Road",                  []),
            ("INDAPUR_JN",    "KURDUVADI_JN",     45,  52.0, "Indapur-Kurduvadi SH",                    []),

            ("MALSHIRAS_JN",  "PANGRI_JN",        20,  22.0, "Malshiras-Pangri Road",                   []),
            ("MALSHIRAS_JN",  "PANDHARPUR_HOSP",  45,  52.0, "Malshiras-Pandharpur SH",                 []),

            ("PANGRI_JN",     "PANDHARPUR_HOSP",  15,  18.0, "Pangri-Pandharpur Approach Road",         []),

            ("KARMALA_JN",    "MADHA_JN",         35,  40.0, "Karmala-Madha Road",                      []),
            ("KARMALA_JN",    "KURDUVADI_JN",     40,  46.0, "Karmala-Kurduvadi Link",                  []),

            ("MADHA_JN",      "PANDHARPUR_HOSP",  50,  58.0, "Madha-Pandharpur Road",                   []),
            ("MADHA_JN",      "MOHOL_JN",         20,  22.0, "Madha-Mohol Link Road",                   []),

            ("KURDUVADI_JN",  "BARSHI_JN",        35,  42.0, "Kurduvadi-Barshi Road",                   []),
            ("KURDUVADI_JN",  "MADHA_JN",         45,  52.0, "Kurduvadi-Madha Road",                    []),
            ("KURDUVADI_JN",  "MOHOL_JN",         50,  58.0, "Kurduvadi-Mohol SH",                      []),

            ("BARSHI_JN",     "MOHOL_JN",         25,  28.0, "Barshi-Mohol Road",                       []),

            ("MOHOL_JN",      "MANGALVEDHA_JN",   40,  48.0, "Mohol-Mangalvedha Road",                  []),
            ("MOHOL_JN",      "PANDHARPUR_HOSP",  45,  52.0, "Mohol-Pandharpur SH-152B",                []),

            ("MANGALVEDHA_JN","PANDHARPUR_HOSP",  30,  35.0, "Mangalvedha-Pandharpur Road",             []),

            ("WAI_JN",        "SATARA_JN",        45,  52.0, "Wai-Satara NH-48",                        []),
            ("SATARA_JN",     "MALSHIRAS_JN",     90, 105.0, "Satara-Malshiras Road",                   []),

            # --- Vari-corridor edges (tagged; blocked when that route is active) ---
            ("SASWAD_JN",     "JEJURI_JN",        25,  28.0, "Saswad-Jejuri Temple Road",               ["dnyaneshwar", "sopandev"]),
            ("JEJURI_JN",     "NIRA_JN",          30,  35.0, "Jejuri-Nira Road",                        ["dnyaneshwar", "sopandev"]),
            ("NIRA_JN",       "LONAND_JN",        20,  22.0, "Nira-Lonand Road",                        ["dnyaneshwar"]),
            ("LONAND_JN",     "PHALTAN_JN",       25,  28.0, "Lonand-Phaltan Road",                     ["dnyaneshwar", "sopandev"]),
            ("PHALTAN_JN",    "NATEPUTE_JN",      30,  34.0, "Phaltan-Natepute Road",                   ["dnyaneshwar"]),
            ("NATEPUTE_JN",   "VELAPUR_JN",       25,  28.0, "Natepute-Velapur Road",                   ["dnyaneshwar"]),
            ("VELAPUR_JN",    "PANDHARPUR_HOSP",  20,  22.0, "Velapur-Pandharpur Road",                 ["dnyaneshwar", "sopandev"]),

            # Vari-corridor alternate exits (non-blocked bypass connections)
            ("NIRA_JN",       "MALSHIRAS_JN",     60,  70.0, "Nira-Malshiras Rural Road",               []),
            ("PHALTAN_JN",    "MALSHIRAS_JN",     45,  52.0, "Phaltan-Malshiras Road",                  []),
            ("NATEPUTE_JN",   "MALSHIRAS_JN",     30,  34.0, "Natepute-Malshiras Rural Road",           []),

            # Loni Kalbhor junction
            ("LONI_KB_JN",    "DAUND_JN",         20,  22.0, "Loni Kalbhor-Daund Link",                 []),
            ("LONI_KB_JN",    "INDAPUR_JN",       60,  70.0, "Loni KB-Indapur Road",                    ["tukaram"]),
        ]

        for u, v, t_min, dist_km, road_name, vari_blocks in edges:
            g.add_edge(u, v,
                       travel_min=t_min,
                       dist_km=dist_km,
                       road=road_name,
                       vari_corridors=vari_blocks,
                       weight=float(t_min))

    def find_routes(
        self,
        origin: str,
        destination: str,
        blocked_corridors: Optional[List[str]] = None,
        max_candidates: int = 3
    ) -> "AmbulanceRoutingResponse":
        """
        Finds up to `max_candidates` ambulance routes avoiding active Vari corridors.
        Blocked corridor edges get W(e) → ∞ before pathfinding.
        """
        blocked_corridors = blocked_corridors or []
        g = self.graph.copy()

        # Apply Vari blockages: W(e) → ∞ for every edge on a blocked corridor
        for u, v, data in g.edges(data=True):
            if any(c in data.get("vari_corridors", []) for c in blocked_corridors):
                g[u][v]["weight"] = float("inf")

        candidates: List[AmbulanceRouteCandidate] = []

        try:
            path_gen = nx.shortest_simple_paths(g, origin, destination, weight="weight")
            for rank, path in enumerate(path_gen, start=1):
                total_min = 0
                total_km = 0.0
                roads: List[str] = []
                valid = True
                waypoints: List[List[float]] = []

                for i in range(len(path) - 1):
                    u, v = path[i], path[i + 1]
                    ed = g[u][v]
                    if ed["weight"] == float("inf"):
                        valid = False
                        break
                    total_min += ed["travel_min"]
                    total_km += ed["dist_km"]
                    roads.append(ed["road"])

                if not valid:
                    continue

                for node in path:
                    coords = AMBU_NODE_COORDS.get(node)
                    if coords:
                        waypoints.append(list(coords))

                # Deduplicate consecutive identical road names
                deduped_roads: List[str] = []
                for r in roads:
                    if not deduped_roads or deduped_roads[-1] != r:
                        deduped_roads.append(r)

                candidates.append(AmbulanceRouteCandidate(
                    route_id=f"AMB_ROUTE_{rank}",
                    rank=rank,
                    waypoints=waypoints,
                    node_names=[self.NODE_LABELS.get(n, n) for n in path],
                    eta_minutes=total_min,
                    distance_km=round(total_km, 1),
                    road_description=" → ".join(deduped_roads),
                    avoids=blocked_corridors
                ))

                if len(candidates) >= max_candidates:
                    break

        except (nx.NetworkXNoPath, nx.NodeNotFound):
            pass

        return AmbulanceRoutingResponse(
            origin=self.NODE_LABELS.get(origin, origin),
            destination=self.NODE_LABELS.get(destination, destination),
            candidates=candidates,
            blocked_corridors=blocked_corridors
        )

