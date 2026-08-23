
---

### `backend/README.md`

```markdown
# Backend

Backend service for the Oil Spill Detection, Vessel Attribution and Impact Prediction System.

The backend acts as the orchestration layer between the frontend, ML model, oceanographic data, AIS data and database.

---

# Responsibilities

The backend handles:

- Employee authentication
- Role-based authorization
- Satellite image upload
- ML inference
- Spill data storage
- Wind data integration
- Ocean-current integration
- Spill hindcasting
- Spill forecasting
- AIS data processing
- Vessel filtering
- Vessel trajectory analysis
- Vessel attribution
- Suspect vessel scoring
- Future impact prediction
- Dashboard APIs

---

# Backend Architecture

```text
                       FRONTEND
                           |
                           v
                  ┌────────────────┐
                  │   API SERVER   │
                  │    FastAPI     │
                  └───────┬────────┘
                          |
             ┌────────────┼─────────────┐
             │            │             │
             v            v             v
          AUTH        SPILL API      ANALYSIS
             │            │             │
             │            v             │
             │       ML SERVICE         │
             │            │             │
             │            v             │
             │     Spill Geometry       │
             │                          │
             └────────────┬─────────────┘
                          |
                          v
                  ┌───────────────┐
                  │ DRIFT ENGINE  │
                  └───────┬───────┘
                          |
              ┌───────────┴───────────┐
              │                       │
              v                       v
       ┌──────────────┐        ┌──────────────┐
       │  HINDCASTING │        │ FORECASTING  │
       └──────┬───────┘        └──────┬───────┘
              │                       │
              v                       v
       Probable Origin         6/12/24h Forecast
              │                       │
              v                       v
       ┌──────────────┐        ┌──────────────┐
       │   AIS ENGINE │        │ IMPACT ENGINE│
       └──────┬───────┘        └──────┬───────┘
              │                       │
              v                       │
       ┌──────────────┐               │
       │ ATTRIBUTION  │               │
       │    ENGINE    │               │
       └──────┬───────┘               │
              │                       │
              v                       │
       Suspect Ranking                │
              │                       │
              └───────────┬───────────┘
                          v
                    PostgreSQL
                      PostGIS