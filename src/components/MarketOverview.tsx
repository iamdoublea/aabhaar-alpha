import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const marketData = {
  nifty50: {
    value: 19245.30,
    change: 142.85,
    changePercent: 0.75,
    high: 19298.50,
    low: 19156.20
  },
  sensex: {
    value: 64718.56,
    change: 459.83,
    changePercent: 0.71,
    high: 64852.10,
    low: 64301.25
  },
  bankNifty: {
    value: 43158.70,
    change: -298.45,
    changePercent: -0.69,
    high: 43456.80,
    low: 43089.15
  }
};

const chartData = [
  { time: '9:15', nifty: 19102, sensex: 64259 },
  { time: '10:00', nifty: 19156, sensex: 64301 },
  { time: '11:00', nifty: 19203, sensex: 64456 },
  { time: '12:00', nifty: 19178, sensex: 64398 },
  { time: '1:00', nifty: 19234, sensex: 64567 },
  { time: '2:00', nifty: 19267, sensex: 64623 },
  { time: '3:00', nifty: 19245, sensex: 64718 },
];

const topGainers = [
  { name: 'RELIANCE', price: 2456.80, change: 4.23, changePercent: 0.17 },
  { name: 'TCS', price: 3567.90, change: 45.60, changePercent: 1.29 },
  { name: 'HDFCBANK', price: 1678.45, change: 23.15, changePercent: 1.40 },
];

const topLosers = [
  { name: 'ICICIBANK', price: 945.60, change: -12.30, changePercent: -1.28 },
  { name: 'INFY', price: 1432.80, change: -18.90, changePercent: -1.30 },
  { name: 'HINDUNILVR', price: 2234.15, change: -34.25, changePercent: -1.51 },
];

const MarketOverview = () => {
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  const formatChange = (change: number, percent: number) => {
    const isPositive = change >= 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-bullish' : 'text-bearish'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{percent.toFixed(2)}%)</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              NIFTY 50
              <Badge variant="outline">NSE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatPrice(marketData.nifty50.value)}</div>
              {formatChange(marketData.nifty50.change, marketData.nifty50.changePercent)}
              <div className="text-sm text-muted-foreground">
                H: {formatPrice(marketData.nifty50.high)} | L: {formatPrice(marketData.nifty50.low)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              SENSEX
              <Badge variant="outline">BSE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatPrice(marketData.sensex.value)}</div>
              {formatChange(marketData.sensex.change, marketData.sensex.changePercent)}
              <div className="text-sm text-muted-foreground">
                H: {formatPrice(marketData.sensex.high)} | L: {formatPrice(marketData.sensex.low)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              BANK NIFTY
              <Badge variant="outline">NSE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatPrice(marketData.bankNifty.value)}</div>
              {formatChange(marketData.bankNifty.change, marketData.bankNifty.changePercent)}
              <div className="text-sm text-muted-foreground">
                H: {formatPrice(marketData.bankNifty.high)} | L: {formatPrice(marketData.bankNifty.low)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Market Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="nifty" 
                  stroke="hsl(var(--bullish))" 
                  strokeWidth={2} 
                  name="NIFTY 50"
                />
                <Line 
                  type="monotone" 
                  dataKey="sensex" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={2} 
                  name="SENSEX"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-bullish">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topGainers.map((stock) => (
                <div key={stock.name} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">{formatPrice(stock.price)}</div>
                  </div>
                  {formatChange(stock.change, stock.changePercent)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-bearish">Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLosers.map((stock) => (
                <div key={stock.name} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">{formatPrice(stock.price)}</div>
                  </div>
                  {formatChange(stock.change, stock.changePercent)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketOverview;