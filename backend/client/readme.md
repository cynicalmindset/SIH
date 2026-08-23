
---

### `frontend/README.md`

```markdown
# Frontend

Frontend dashboard for the Oil Spill Detection, Vessel Attribution and Impact Prediction System.

The frontend provides an interactive marine intelligence dashboard for authorized employees to detect spills, investigate potential vessels and visualize current and future spill movement.

---

# Features

- Employee login
- JWT authentication
- Role-based dashboard
- Satellite image upload
- Spill detection results
- Interactive map
- Spill polygon visualization
- Spill origin visualization
- Backtracked spill trajectory
- AIS vessel routes
- Suspect vessel ranking
- Vessel details
- 6-hour prediction
- 12-hour prediction
- 24-hour prediction
- Impact area visualization
- Analysis history

---

# Application Flow

```text
                         LOGIN
                           |
                           v
                      DASHBOARD
                           |
              ┌────────────┴────────────┐
              │                         │
              v                         v
        UPLOAD IMAGE              ANALYSIS HISTORY
              |
              v
        START ANALYSIS
              |
              v
       SPILL DETECTION
              |
              v
        SPILL DETAILS
              |
       ┌──────┴────────┐
       │               │
       v               v
     ORIGIN         VESSELS
       │               │
       │               v
       │         SUSPECT RANKING
       │               │
       └───────┬───────┘
               v
        IMPACT FORECAST
               |
       ┌───────┼────────┐
       │       │        │
       v       v        v
      +6h     +12h     +24h
       │       │        │
       └───────┼────────┘
               v
             MAP