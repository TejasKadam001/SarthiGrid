# locator-map.html — Feature Breakdown

This is the **core operational page** of the project. It is a full-stack interactive map + resource directory system for the Ashadhi Wari pilgrimage, built for both pilgrims (field use) and command-level officials (admin dashboard).

---

## 1. Live Leaflet Map

- Interactive map rendered via **Leaflet.js** (open-source, works offline)
- Shows the **full Wari route** from Pune to Pandharpur for both palkhi processions
- Clickable markers with popup cards for every resource point
- **Live Tracking overlay card** on the map showing:
  - Today's destination (Loni Kalbhor / Saswad)
  - Estimated arrival time
  - Live countdown timer (hrs / min / sec)
- "Back to Route" button to re-center map on the procession path
- "My Location" button using device GPS to center map on user

---

## 2. Dual Palkhi Filter (Tab System)

Three tabs to switch between:
- **Both** — show all resources for both processions
- **Dnyaneshwar Maharaj** — filter to Dnyaneshwar route only
- **Tukaram Maharaj** — filter to Tukaram route only

---

## 3. Search + Proximity Radius Filter

- **Text search bar** — search by location name, doctor name, or vehicle number
- **Radius chips** — filter resources within: 100m / 200m / 300m / 1km / 5km / All
- Results update live as user types or taps a chip

---

## 4. Mukkam Halt Schedule Strip

- Horizontal scrollable strip showing **palkhi overnight halt schedule**
- Each mukkam shows location + date
- Tapping a mukkam zooms the map to that location
- Data from `wari-mukkams.js`

---

## 5. Emergency Dial Buttons

Two large one-tap call buttons:
- **108** — Ambulance
- **112** — Emergency / Police

---

## 6. Live Weather Card

- Fetches real-time weather from **Open-Meteo API**
- Shows: temperature, location, sky condition, rainfall estimate
- Links to AccuWeather for full forecast

---

## 7. Resource Directory (Collapsible Panels)

Four expandable accordion sections with real data:

| Panel | Contents |
|---|---|
| **Other Health Helplines** | 104, 102, 155388, 1077 with purpose labels |
| **District-Level Officials** | Pune, Satara, Solapur — admin, health, taluka contacts |
| **State / Divisional / MCGM Officials** | State-level health + urban contacts |
| **Police Contacts** | 44 police stations, 87 officers along the Wari route |

---

## 8. Map Legend + Category Filter Bar

Filter map markers by type:
- All / Ambulance / Doctor-Hospital / Water / Toilet / Police / Charanseva / Hirkani / Mukkam

---

## 9. Sub-filters (per category)

| Category | Sub-filters |
|---|---|
| Ambulance | All / ALS Advanced / BLS Basic / 102 / 108 |
| Doctor/Hospital | All / PHC / Rural Hospital / Private / Apla Dawakhana / ICU-Trauma |
| Water | All / Tanker Filling Points / Approximate (every 500m) |
| Halt | All / Mukkam (overnight) / Visava (rest stop) |

---

## 10. Resource Locator Cards (Search Results List)

Each resource found within the selected radius appears as a card with:
- Resource name + type badge
- Doctor name, vehicle number, or contact person
- Phone number (tap to call)
- **Direction** button → Google Maps turn-by-turn navigation
- **Share** button → native share sheet

---

## 11. Ambulance Directory

From `wari-ambulance-contacts-2026.js`:
- ALS / BLS / 102 / 108 ambulances mapped along both routes
- Each card: Vehicle number, service type, pilot / EA name, contact, zone/phase

---

## 12. Health Awareness Clips (Video / Audio)

- Featured clip shown at top
- Expandable list of all clips with count badge
- Health precaution videos/audio for pilgrims
- Data from `wari-clips.js`

---

## 13. Officials & Dignitaries Directory

From `wari-officials.js` + `wari-dignitaries.js`:
- Named officials across Pune, Satara, Solapur districts
- Role, designation, phone number — organized by district

---

## 14. Offline Readiness

- All data files are local JS — **works without internet**
- Status indicator shows offline/online state
- `online`/`offline` event listeners update the status bar

---

## 15. Clock Display

- Live digital clock updating every second in the top bar

---

## 16. Bilingual Support (English / Marathi)

- All UI labels use `data-i18n` attributes
- Language switching between Marathi and English
- Preference saved in `localStorage`

---

## 17. Data Sources (all local, all real)

| File | What it contains |
|---|---|
| `wari-mukkams.js` | Palkhi halt schedule with coords |
| `wari-points-dnyaneshwar-halts.js` | Dnyaneshwar route halts |
| `wari-points-tukaram-halts.js` | Tukaram route halts |
| `wari-points-tukaram.js` | Tukaram resource points |
| `wari-points-phc102.js` | Primary Health Centres + 102 ambulances |
| `wari-points-water-filling.js` | Water tanker filling locations |
| `wari-points-water-solapur.js` | Solapur district water points |
| `wari-points-hirkani.js` | Hirkani (women's safety) booths |
| `wari-points-charanseva.js` | Foot care service points |
| `wari-points-police.js` | Police posts along the route |
| `wari-points-satara.js` | Satara district resources |
| `wari-points-solapur.js` | Solapur district resources |
| `wari-points-toilets.js` | Toilet / sanitation points |
| `wari-points-icu.js` | ICU / trauma centres |
| `wari-points-private.js` | Private hospitals |
| `wari-points-dho-mo.js` | DHO / MO (District Health Officer) contacts |
| `wari-points-mrsac.js` | MRSAC survey-mapped points |
| `wari-ambulance-contacts-2026.js` | Full 2026 ambulance fleet directory |
| `wari-officials.js` | District officials directory |
| `wari-dignitaries.js` | Dignitaries and senior contacts |
| `wari-clips.js` | Health awareness video/audio |
| `wari-routes-full.js` | Full route polyline (both palkhis) |
| `wari-route-dnyaneshwar-pune.js` | Dnyaneshwar route from Pune |
| `wari-analytics.js` | Analytics / usage tracking |

---

## Summary — What This Page IS

> A **command-and-field operations hub** — simultaneously usable by:
> - A **pilgrim on foot** looking for the nearest ambulance or water point
> - A **police officer** checking which post covers an incident zone
> - An **admin/commander** monitoring resources, routes, and contacts across 3 districts
