import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, Volume, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock stock data
const mockStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.80, change: 4.23, changePercent: 0.17, volume: '2.5M' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3567.90, change: 45.60, changePercent: 1.29, volume: '1.8M' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1678.45, change: 23.15, changePercent: 1.40, volume: '3.2M' },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1432.80, change: -18.90, changePercent: -1.30, volume: '2.1M' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 945.60, change: -12.30, changePercent: -1.28, volume: '4.1M' },
];

const mockChartData = [
  { time: '9:15', price: 2410, volume: 45000 },
  { time: '9:30', price: 2425, volume: 52000 },
  { time: '10:00', price: 2435, volume: 48000 },
  { time: '10:30', price: 2428, volume: 51000 },
  { time: '11:00', price: 2445, volume: 47000 },
  { time: '11:30', price: 2452, volume: 49000 },
  { time: '12:00', price: 2457, volume: 46000 },
];

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);

  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Stock Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks by symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Search Results */}
            <div className="grid gap-2 max-h-64 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                    selectedStock.symbol === stock.symbol ? 'bg-muted border-primary' : 'border-border'
                  }`}
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(stock.price)}</div>
                      {formatChange(stock.change, stock.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Stock Analysis */}
      {selectedStock && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock Details */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">{selectedStock.symbol}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl font-bold">{formatPrice(selectedStock.price)}</div>
                {formatChange(selectedStock.change, selectedStock.changePercent)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="font-medium">{selectedStock.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">₹2.45L Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">24.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">52W High</span>
                  <span className="font-medium">₹2,856.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">52W Low</span>
                  <span className="font-medium">₹2,102.50</span>
                </div>
              </div>

              <div className="pt-4">
                <Badge variant={selectedStock.changePercent >= 0 ? "default" : "destructive"}>
                  {selectedStock.changePercent >= 0 ? 'Bullish' : 'Bearish'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Price Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={selectedStock.changePercent >= 0 ? "hsl(var(--bullish))" : "hsl(var(--bearish))"} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume className="h-5 w-5" />
                Volume Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), 'Volume']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="hsl(var(--info))" 
                      strokeWidth={2}
                      fill="hsl(var(--info))"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StockSearch;