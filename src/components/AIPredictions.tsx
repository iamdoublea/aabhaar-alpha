import { useState } from "react";

export default function AIPredictions() {
  const [symbol, setSymbol] = useState("");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async () => {
    if (!symbol) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/predict/${symbol}`);
      const data = await res.json();
      setPredictions(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">AI Stock Predictions</h2>
      <input
        type="text"
        placeholder="Enter NSE stock symbol (e.g., INFY)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchPrediction}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>

      {loading && <p>Loading...</p>}
      {predictions.length > 0 && (
        <ul className="mt-4">
          {predictions.map((p, i) => (
            <li key={i}>
              {p.ds}: ₹{p.yhat.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

