# Sarathi-Grid: Project Features, Problem Statement & Future Roadmap

This document merges the specifications of the **Sarathi-Grid Command & Control** system with the existing **आरोग्य संपन्न वारी** pilgrim-support frontend to define the complete system architecture, current features, and alignment roadmap.

---

## 1. Problem Statement & Context (Sarathi-Grid)

*   **Heavy Logistical Traffic Conflicts:** Luggage trucks, water tankers, and heavy logistical support vehicles mingle in an unregulated, dangerous manner with dense pedestrian pilgrim groups (Warkaris) on narrow rural roads.
*   **Gridlocks & Emergency Blockades:** This mingling causes severe traffic gridlocks, prevents ambulance and emergency vehicle access, and poses fatal vehicular accident risks to devotees.
*   **Technological Friction:** Existing crowd management strategies are incomplete because they expect elderly, rural pilgrims navigating extreme weather to use complex mobile apps, creating massive friction.

---

## 2. Core Use Case

*   **Orchestration Dashboard:** Highway Police and Dindi Transport Managers utilize a centralized, web-based "Command & Control" traffic orchestration dashboard (Sarathi-Grid).
*   **Temporal & Spatial Separation:** The platform separates heavy supply vehicles from pedestrians by requiring supply trucks to book dispatch time-slots using automated SMS.
*   **Zero-Friction for Devotees:** By targeting system administrators (police and transport managers) rather than the devotees themselves, the system ensures zero technological barriers for the pilgrims while keeping them safe.

---

## 3. System Architecture: The Two Coordinated Layers

To solve the problem statement, the system is designed in two primary layers:
1.  **Pilgrim/Field Support Layer (Current Website):** The mobile-friendly web locator used by pilgrims, field volunteers, and on-ground responders.
2.  **Command & Control Orchestration Layer (Sarathi-Grid Dashboard):** The administrative dashboard used by Highway Police and Transport Managers.

```mermaid
graph TD
    subgraph Pilgrim / Field Layer
        A[Pilgrim Mobile Web UI] -->|Submits Help Request| B(Emergency Help Modal)
        C[Field Volunteer / Police Map] -->|Locates Emergency| D(Nearest Ambulance / PHC)
    end

    subgraph Command & Control Layer (Sarathi-Grid)
        E[Data Fusion Engine] -->|Aggregates CCTV/GPS/Drone/Warkari Alerts| F[Predictive Congestion Engine]
        F -->|Trigger Alert| G[Predictive Bottleneck Alerting]
        G -->|Initiate Remediation| H[Automated Remediation]
        H -->|Reroutes/Delays Dispatch| I[SMS Gateway - Twilio]
        J[Emergency Corridor Control] -->|Signals| K[Green Corridor Route Activation]
    end

    B -->|Ingested as Live Report Field| E
    K -->|Pushes Green Corridor Status| C
```

---

## 4. Current Features (Pilgrim & Field Support Layer)
These features represent the on-ground support layer. They help pilgrims locate resources and manually request help without needing complex logins:

*   **Leaflet Interactive Map:** Displays pilgrimage routes and custom marker categories (Ambulances, Doctors, Water Tankers, Police, Toilets, Visava halts, and Charanseva).
*   **Route Tabs Filter:** Switch map data between Dnyaneshwar Palkhi, Tukaram Palkhi, or view both.
*   **Mukkam Horizontal Strip:** Scrollable halt villages timeline. Clicking any halt centers the map and displays nearby services.
*   **Interactive Search & Radius Chips:** Fuzzy search for vehicles/doctors, and toggle radius filters (100m, 200m, 300m, 500m, 1km, or All).
*   **Walking Time Calculator:** Dynamically shows walking duration (e.g. `🚶 ५ मि. चालत`) and distance to facilities from current location.
*   **Weather Widget:** Reads GPS coordinates to display current temperatures, rainfall forecasts, and alerts via Open-Meteo.
*   **Emergency Contact Sheets:** Expandable directories for 108 Ambulance, Police, Health Officers, and Taluka Officers.
*   **Advice Media Clips:** Plays health precaution audio/video feeds directly.
*   **Location Sharing Request:** Simple form to request emergency backup by entering Dindi details.

---

## 5. Required Features (Sarathi-Grid Orchestration Layer)
To fulfill the core use case for police and coordinators, the following backend and dashboard capabilities are required to build or integrate:

*   **Command Dashboard:** A presentation layer built with React.js, Next.js, and Mapbox GL JS for real-time traffic, pedestrian, and asset monitoring by police and transport managers.
*   **Predictive Congestion Engine:** An integrated AI module that continuously analyzes live variables (weather, devotee density, walking speed, road width) to proactively forecast infrastructural bottlenecks.
*   **Predictive Bottleneck Alerting:** An algorithm that triggers a critical alert if it calculates that a fast-moving convoy will catch up to a slow-moving, high-density pedestrian zone by cross-referencing real-time walking speeds with scheduled vehicle travel times.
*   **Automated Remediation:** An autonomous AI function that instantly revokes an initial truck dispatch SMS and generates solutions by issuing a dynamically delayed time-slot or rerouting the vehicle to an adjacent rural artery.
*   **Data Fusion Integration:** Systems to ingest field data from:
    *   Drone surveillance video streams
    *   Truck GPS telemetry
    *   Roadside CCTV edge analytics
    *   Weather APIs
    *   Traffic police incident reports
*   **Emergency Corridor Control:** A decision layer function to manage dedicated green corridors for improved emergency response.
*   **SMS Communication Gateway:** An offline field coordination layer utilizing Twilio to send dispatch alerts directly to supply truck drivers.

---

## 6. Development Integration Roadmap (Aligning the App to the PS)

To successfully align the current app's features with the **Sarathi-Grid** system, the following integration items must be implemented:

1.  **Ingest Field Help Requests:** Connect the current pilgrim "Help Request" modal to post data directly to the **Data Fusion Integration** engine of the Command Dashboard, mapping devotee emergencies in real-time.
2.  **Expose Green Corridor Status:** When the **Emergency Corridor Control** activates a dedicated corridor on the Command Dashboard, push this state to the pilgrim map. The route line should change color (e.g. flashing green) on the Warkari map to alert volunteers to clear the path.
3.  **Twilio Alert Logger:** Integrate log feeds from the **SMS Communication Gateway** into the command logs to let coordinators see which truck drivers have been rerouted or delayed.
4.  **Admin Login for Directories:** Restructure the expandable directories (District Officers, Municipal Health, Police) so that administrative contacts can be updated securely by system admins directly through the command dashboard.
