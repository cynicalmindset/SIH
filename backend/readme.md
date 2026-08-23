<<<<<<< HEAD

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
=======
# Oil Spill Detection & Vessel Attribution System

An intelligent marine surveillance system that combines satellite imagery, oceanographic data, and AIS vessel data to detect oil spills, trace their probable origin, identify potentially responsible vessels, and predict future spill impact.

## Problem Statement

Marine oil spills can cause severe ecological and economic damage. In many cases, identifying the vessel responsible for a spill is difficult.

This system provides an automated pipeline to:

- Detect oil spills from satellite imagery
- Characterize the detected spill
- Estimate spill geometry, area and age
- Use wind and ocean-current data to model spill movement
- Hindcast the spill to estimate its probable origin
- Correlate the origin with historical AIS vessel data
- Rank potentially responsible vessels
- Forecast future spill movement
- Estimate affected area after 6, 12 and 24 hours
- Visualize the entire analysis through an interactive dashboard

---

# System Flow

```text
                         ┌──────────────────┐
                         │     EMPLOYEE     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AUTHENTICATION  │
                         │   JWT + RBAC     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    DASHBOARD     │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │    SATELLITE IMAGE       │
                    │       SAR / EO           │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       ML MODEL            │
                    │                           │
                    │ Oil Spill Detection       │
                    │ Segmentation              │
                    │ Classification            │
                    │ Geometry Extraction       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     SPILL ANALYSIS        │
                    │                           │
                    │ Area                      │
                    │ Polygon                   │
                    │ Centroid                  │
                    │ Confidence                │
                    │ Estimated Age             │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴────────────────┐
                 │                                │
                 ▼                                ▼
       ┌───────────────────┐            ┌───────────────────┐
       │    WIND DATA      │            │  OCEAN CURRENT    │
       │                   │            │                   │
       │ Speed             │            │ Speed             │
       │ Direction         │            │ Direction         │
       └─────────┬─────────┘            └─────────┬─────────┘
                 │                                │
                 └────────────────┬───────────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │    DRIFT ENGINE     │
                       └──────────┬──────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
                   ▼                             ▼
          ┌──────────────────┐          ┌──────────────────┐
          │   HINDCASTING    │          │   FORECASTING    │
          │                  │          │                  │
          │ Backward Drift   │          │ Forward Drift    │
          │                  │          │                  │
          │ Origin Location  │          │ +6 Hours         │
          │ Origin Time      │          │ +12 Hours        │
          └────────┬─────────┘          │ +24 Hours        │
                   │                    └────────┬─────────┘
                   │                             │
                   ▼                             ▼
          ┌──────────────────┐          ┌──────────────────┐
          │    AIS ENGINE    │          │   IMPACT ENGINE  │
          │                  │          │                  │
          │ Historical AIS   │          │ Future Polygons  │
          │ Spatial Filter   │          │ Affected Area    │
          │ Time Filter      │          │ Risk Zones       │
          └────────┬─────────┘          └────────┬─────────┘
                   │                             │
                   ▼                             │
          ┌──────────────────┐                   │
          │ VESSEL           │                   │
          │ CORRELATION      │                   │
          │                  │                   │
          │ Proximity        │                   │
          │ Time Match       │                   │
          │ Trajectory       │                   │
          │ Speed            │                   │
          │ Heading          │                   │
          │ Behaviour        │                   │
          └────────┬─────────┘                   │
                   │                             │
                   ▼                             │
          ┌──────────────────┐                   │
          │ SUSPECT SCORING  │                   │
          │                  │                   │
          │ Vessel #1 → 92%  │                   │
          │ Vessel #2 → 76%  │                   │
          │ Vessel #3 → 54%  │                   │
          └────────┬─────────┘                   │
                   │                             │
                   └──────────────┬──────────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │    FINAL ANALYSIS    │
                       │                      │
                       │ Spill Information    │
                       │ Origin               │
                       │ Suspect Vessel       │
                       │ Confidence           │
                       │ Future Impact        │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │      DASHBOARD       │
                       │                      │
                       │ Interactive Map      │
                       │ Vessel Routes        │
                       │ Spill Polygon        │
                       │ Origin Point         │
                       │ 6/12/24h Forecast    │
                       └──────────────────────┘
>>>>>>> cda8d640d4846b5f6e3830c294247ce954784b5a
