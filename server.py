import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Wari Sector Max Capacity (No more than 2 trucks allowed concurrently)
MAX_WARI_CAPACITY = 2

# In-memory storage for active trucks in Wari area
# Initial mock state: 1 default demo truck registered
active_trucks = [
    {
        "truck_plate": "MH12YR4051",
        "driver_name": "Vaibhav Marne",
        "phone": "+919284223412",
        "type": "12,000L Potable Water Tanker",
        "status": "CLEARED",
        "approved_at": "Today 21:30 IST"
    }
]

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "system": "Sarathi Grid Logistics & Human-in-the-Loop AI Dispatch Engine",
        "status": "ONLINE",
        "active_trucks": len([t for t in active_trucks if t.get("status") == "CLEARED"]),
        "max_capacity": MAX_WARI_CAPACITY
    })

@app.route("/api/approve-truck", methods=["POST"])
def approve_truck():
    """
    HUMAN-IN-THE-LOOP APPROVAL & TWILIO DISPATCH ENDPOINT
    Rule: No more than 2 trucks allowed in Wari area concurrently.
    """
    data = request.json or {}
    truck_plate = data.get("truck_plate", "MH-12-VT-4829").strip().upper()
    driver_name = data.get("driver_name", "Ramesh Patil")
    phone = data.get("phone", "+919284223412").strip()
    v_type = data.get("type", "Commercial Logistics Freight")
    v_depot = data.get("depot", "Hadapsar Goods Depot").strip()

    # Count currently CLEARED / Active trucks in Wari sector
    cleared_trucks = [t for t in active_trucks if t.get("status") == "CLEARED"]

    # Check if this truck is already in the list
    existing = next((t for t in active_trucks if t["truck_plate"] == truck_plate), None)

    # --- BASIC IF-ELSE STATEMENT: NO MORE THAN 2 TRUCKS ALLOWED IN WARI AREA ---
    if len(cleared_trucks) < MAX_WARI_CAPACITY or (existing and existing.get("status") == "CLEARED"):
        # APPROVAL GRANTED
        if existing:
            existing["status"] = "CLEARED"
            existing["driver_name"] = driver_name
            existing["phone"] = phone
            existing["depot"] = v_depot
        else:
            active_trucks.append({
                "truck_plate": truck_plate,
                "driver_name": driver_name,
                "phone": phone,
                "type": v_type,
                "depot": v_depot,
                "status": "CLEARED",
                "approved_at": "Just Now"
            })

        # Calculate new count
        current_cleared_count = len([t for t in active_trucks if t.get("status") == "CLEARED"])

        # Trigger Twilio SMS Notification
        sms_sent = False
        sms_sid = None
        sms_error = None

        account_sid = os.environ.get("TWILIO_ACCOUNT_SID", "").strip()
        auth_token = os.environ.get("TWILIO_AUTH_TOKEN", "").strip()
        from_phone = os.environ.get("TWILIO_PHONE_NUMBER", "").strip()
        if from_phone.startswith("+91"):
            # Avoid sending from a personal destination phone number (must send from the Twilio-provided number)
            from_phone = "+17372212163"
        # Unconditionally hardcode destination phone to verified recipient for Twilio trial compatibility
        target_phone = "+919284223412"

        # Check if they have fallback keys and use them
        if not account_sid or account_sid == "":
            account_sid = ""
        if not auth_token or auth_token == "":
            auth_token = ""

        if account_sid and auth_token:
            try:
                client = Client(account_sid, auth_token)
                # 1. Primary Attempt: Send custom multi-language SMS with speed limit
                sms_body = (
                    f"Sarathi Dispatch: Vehicle {truck_plate} approved for Green Corridor Pass #4.\n"
                    f"Route: {v_depot} -> Pandharpur Sector 3.\n"
                    f"Window: 22:45 IST. Speed Limit: 30 km/h.\n\n"
                    f"सारथी टीम: वाहन {truck_plate} ला ग्रीन कॉरिडोअर पास #४ मंजूर झाला आहे.\n"
                    f"मार्ग: {v_depot} ते पंढरपूर सेक्टर ३.\n"
                    f"वेळ: २२:४५ IST. वेग मर्यादा: ३० किमी/तास."
                )
                try:
                    message = client.messages.create(
                        to=target_phone,
                        from_=from_phone,
                        body=sms_body
                    )
                    sms_sid = message.sid
                    sms_sent = True
                    print(f"[Twilio Custom Success] SID: {sms_sid} sent to {target_phone}", flush=True)
                except Exception as trial_err:
                    err_msg = str(trial_err)
                    # Check if error is related to trial template restrictions
                    if "template" in err_msg.lower() or "trial" in err_msg.lower() or "predefined" in err_msg.lower() or "disallowed" in err_msg.lower():
                        fallback_body = "sms_internal_alerts"
                        print(f"[Twilio Trial Mode] Falling back to preapproved template: {err_msg}", flush=True)
                        # 2. Fallback Attempt: Send pre-approved template string
                        message = client.messages.create(
                            to=target_phone,
                            from_=from_phone,
                            body=fallback_body
                        )
                        sms_sid = message.sid
                        sms_sent = True
                        print(f"[Twilio Preapproved Success] SID: {sms_sid} sent to {target_phone} (Trial Fallback)", flush=True)
                    else:
                        raise trial_err
            except Exception as err:
                sms_error = str(err)
                print(f"[Twilio SMS Error] {err}", flush=True)
        else:
            sms_error = "Twilio credentials (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN) not detected in environment."
            print(f"[Twilio Notice] {sms_error}", flush=True)

        return jsonify({
            "status": "APPROVED",
            "truck_plate": truck_plate,
            "active_count": current_cleared_count,
            "max_capacity": MAX_WARI_CAPACITY,
            "message": f"Truck {truck_plate} APPROVED & DISPATCHED to Wari Sector! (Wari Capacity: {current_cleared_count}/{MAX_WARI_CAPACITY} active).",
            "sms_sent": sms_sent,
            "sms_sid": sms_sid,
            "sms_error": sms_error,
            "to_phone": target_phone
        }), 200

    else:
        # CAPACITY LIMIT EXCEEDED (>= 2 TRUCKS ALREADY INSIDE WARI SECTOR)
        if existing:
            existing["status"] = "ON_HOLD"
        else:
            active_trucks.append({
                "truck_plate": truck_plate,
                "driver_name": driver_name,
                "phone": phone,
                "type": v_type,
                "status": "ON_HOLD",
                "approved_at": "Queued"
            })

        current_cleared_count = len(cleared_trucks)

        return jsonify({
            "status": "ON_HOLD",
            "truck_plate": truck_plate,
            "active_count": current_cleared_count,
            "max_capacity": MAX_WARI_CAPACITY,
            "message": f"CAPACITY LIMIT REACHED: Maximum {MAX_WARI_CAPACITY} trucks are allowed inside Wari area concurrently ({current_cleared_count}/{MAX_WARI_CAPACITY} active). Truck {truck_plate} placed ON HOLD in queue.",
            "sms_sent": False,
            "sms_error": "Wari sector capacity full. Dispatch on hold."
        }), 200

@app.route("/api/depart-truck", methods=["POST"])
def depart_truck():
    """Endpoint called when a truck departs Wari sector to free up capacity slot."""
    data = request.json or {}
    truck_plate = data.get("truck_plate", "").strip().upper()
    global active_trucks
    for t in active_trucks:
        if t["truck_plate"] == truck_plate:
            t["status"] = "DEPARTED"

    cleared_count = len([t for t in active_trucks if t.get("status") == "CLEARED"])
    return jsonify({
        "status": "DEPARTED",
        "truck_plate": truck_plate,
        "active_count": cleared_count,
        "max_capacity": MAX_WARI_CAPACITY,
        "message": f"Truck {truck_plate} departed Wari sector. Active slot freed! ({cleared_count}/{MAX_WARI_CAPACITY} active)"
    }), 200

@app.route("/api/truck-status", methods=["GET"])
def truck_status():
    """Returns current active capacity and status of all registered trucks."""
    cleared = [t for t in active_trucks if t.get("status") == "CLEARED"]
    on_hold = [t for t in active_trucks if t.get("status") == "ON_HOLD"]
    return jsonify({
        "active_count": len(cleared),
        "max_capacity": MAX_WARI_CAPACITY,
        "cleared_trucks": cleared,
        "on_hold_trucks": on_hold,
        "all_trucks": active_trucks
    }), 200


@app.route("/api/ambulance-route", methods=["POST"])
def ambulance_route():
    """
    AMBULANCE EMERGENCY REROUTING  (Agent 2 Navigator — Additive Endpoint)
    Finds Vari-avoiding road paths for ambulance dispatch.
    Does NOT touch or affect any truck approval / Wari sector logic.

    Request body (JSON):
        origin            : str  — node ID, e.g. "SASSOON_PUNE"
        destination       : str  — node ID, e.g. "PANDHARPUR_HOSP"
        blocked_corridors : list — Vari routes to avoid, e.g. ["dnyaneshwar","tukaram"]

    Response (JSON):
        origin, destination, blocked_corridors, candidates: [...]
    """
    from agent_2_navigator import AmbulanceNavigator, AMBU_NODE_COORDS

    data = request.json or {}
    origin            = data.get("origin", "SASSOON_PUNE")
    destination       = data.get("destination", "PANDHARPUR_HOSP")
    blocked_corridors = data.get("blocked_corridors", ["dnyaneshwar", "tukaram", "sopandev"])
    max_candidates    = int(data.get("max_candidates", 3))

    if origin not in AMBU_NODE_COORDS:
        return jsonify({"error": f"Unknown origin: {origin}. Valid keys: {list(AMBU_NODE_COORDS.keys())}"}), 400
    if destination not in AMBU_NODE_COORDS:
        return jsonify({"error": f"Unknown destination: {destination}. Valid keys: {list(AMBU_NODE_COORDS.keys())}"}), 400

    try:
        nav    = AmbulanceNavigator()
        result = nav.find_routes(origin, destination, blocked_corridors, max_candidates)
        return jsonify(result.model_dump()), 200
    except Exception as e:
        print(f"[AmbulanceNavigator Error] {e}", flush=True)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5005))
    print(f"🚀 Starting Sarathi Grid Logistics Dispatch & Twilio Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
