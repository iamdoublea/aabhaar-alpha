from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from prophet import Prophet
import pandas as pd

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict/{symbol}")
def predict(symbol: str):
    try:
        data = yf.download(symbol + ".NS", period="1y", interval="1d")
        df = data.reset_index()[["Date", "Close"]].rename(columns={"Date": "ds", "Close": "y"})

        model = Prophet()
        model.fit(df)
        future = model.make_future_dataframe(periods=5)
        forecast = model.predict(future)

        return forecast[["ds", "yhat"]].tail(5).to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
