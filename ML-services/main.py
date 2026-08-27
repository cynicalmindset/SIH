from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health():
    return {
        "status": "ok",
        "ml": "connected"
    }


@app.post("/predict")
def predict(data: dict):
    return {
        "latitude": 18.52,
        "longitude": 72.84,
        "confidence": 0.95
    }
