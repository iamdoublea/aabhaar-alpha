import { useEffect, useState } from "react";

export default function MarketOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^NSEI"
        );
        const json = await res.json();
        setData(json.quoteResponse.result[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      {data ? (
        <p>
          NIFTY 50: ₹{data.regularMarketPrice} ({data.regularMarketChange.toFixed(2)})
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
