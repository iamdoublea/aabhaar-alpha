import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, TrendingDown, Target, Zap, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Mock AI prediction data
const predictions = [
  {
    symbol: 'RELIANCE',
    currentPrice: 2456.80,
    prediction: 'BULLISH',
    targetPrice: 2580.00,
    confidence: 78,
    timeframe: '7 days',
    factors: ['Strong earnings', 'Sector momentum', 'Technical breakout'],
    risk: 'Medium'
  },
  {
    symbol: 'TCS',
    currentPrice: 3567.90,
    prediction: 'NEUTRAL',
    targetPrice: 3590.00,
    confidence: 65,
    timeframe: '7 days',
    factors: ['Mixed signals', 'Consolidation pattern'],
    risk: 'Low'
  },
  {
    symbol: 'HDFCBANK',
    currentPrice: 1678.45,
    prediction: 'BULLISH',
    targetPrice: 1750.00,
    confidence: 82,
    timeframe: '7 days',
    factors: ['Banking sector upturn', 'Strong fundamentals'],
    risk: 'Low'
  },
  {
    symbol: 'INFY',
    currentPrice: 1432.80,
    prediction: 'BEARISH',
    targetPrice: 1380.00,
    confidence: 71,
    timeframe: '7 days',
    factors: ['IT sector headwinds', 'Weak guidance'],
    risk: 'High'
  }
];

// Mock historical prediction accuracy
const accuracyData = [
  { day: 'Day 1', accuracy: 65 },
  { day: 'Day 2', accuracy: 68 },
  { day: 'Day 3', accuracy: 72 },
  { day: 'Day 4', accuracy: 75 },
  { day: 'Day 5', accuracy: 73 },
  { day: 'Day 6', accuracy: 76 },
  { day: 'Day 7', accuracy: 78 },
];

// Mock price prediction chart data
const predictionChartData = [
  { day: 0, actual: 2456, predicted: 2456, lower: 2456, upper: 2456 },
  { day: 1, actual: 2465, predicted: 2470, lower: 2450, upper: 2490 },
  { day: 2, actual: 2478, predicted: 2485, lower: 2460, upper: 2510 },
  { day: 3, actual: null, predicted: 2500, lower: 2475, upper: 2525 },
  { day: 4, actual: null, predicted: 2520, lower: 2490, upper: 2550 },
  { day: 5, actual: null, predicted: 2545, lower: 2510, upper: 2580 },
  { day: 6, actual: null, predicted: 2565, lower: 2530, upper: 2600 },
  { day: 7, actual: null, predicted: 2580, lower: 2545, upper: 2615 },
];

const AIPredictions = () => {
  const [selectedPrediction, setSelectedPrediction] = useState(predictions[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'BULLISH': return 'text-bullish';
      case 'BEARISH': return 'text-bearish';
      default: return 'text-muted-foreground';
    }
  };

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'BULLISH': return <TrendingUp className="h-4 w-4" />;
      case 'BEARISH': return <TrendingDown className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-bullish text-bullish-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'High': return 'bg-bearish text-bearish-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const generateNewPredictions = async () => {
    setIsGenerating(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Generate Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Market Predictions</h2>
          <p className="text-muted-foreground">Machine learning powered stock movement predictions</p>
        </div>
        <Button onClick={generateNewPredictions} disabled={isGenerating} className="flex items-center gap-2">
          <Brain className={`h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate New Predictions'}
        </Button>
      </div>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-bullish">78%</div>
              <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info">156</div>
              <div className="text-sm text-muted-foreground">Predictions Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">23</div>
              <div className="text-sm text-muted-foreground">Active Positions</div>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[60, 80]} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Accuracy']} />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="hsl(var(--bullish))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Predictions List and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((pred) => (
                <div
                  key={pred.symbol}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                    selectedPrediction.symbol === pred.symbol ? 'bg-muted border-primary' : 'border-border'
                  }`}
                  onClick={() => setSelectedPrediction(pred)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-lg">{pred.symbol}</div>
                      <div className="text-sm text-muted-foreground">Current: {formatPrice(pred.currentPrice)}</div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 font-medium ${getPredictionColor(pred.prediction)}`}>
                        {getPredictionIcon(pred.prediction)}
                        {pred.prediction}
                      </div>
                      <Badge className={getRiskColor(pred.risk)} variant="secondary">
                        {pred.risk} Risk
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Target: {formatPrice(pred.targetPrice)}</div>
                      <div className="text-xs text-muted-foreground">{pred.timeframe}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{pred.confidence}% Confidence</div>
                      <div className="w-16 bg-muted h-1 rounded mt-1">
                        <div 
                          className="h-1 bg-bullish rounded" 
                          style={{ width: `${pred.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prediction Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Price Prediction - {selectedPrediction.symbol}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Prediction Summary */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="font-semibold">{formatPrice(selectedPrediction.currentPrice)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Target Price</div>
                  <div className="font-semibold">{formatPrice(selectedPrediction.targetPrice)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expected Return</div>
                  <div className={`font-semibold ${
                    selectedPrediction.targetPrice > selectedPrediction.currentPrice ? 'text-bullish' : 'text-bearish'
                  }`}>
                    {((selectedPrediction.targetPrice - selectedPrediction.currentPrice) / selectedPrediction.currentPrice * 100).toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="font-semibold">{selectedPrediction.confidence}%</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tickFormatter={(value) => `Day ${value}`} />
                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        value ? formatPrice(value) : 'N/A', 
                        name.charAt(0).toUpperCase() + name.slice(1)
                      ]}
                      labelFormatter={(label) => `Day ${label}`}
                    />
                    <ReferenceLine x={2.5} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--foreground))" 
                      strokeWidth={2}
                      connectNulls={false}
                      name="Actual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="hsl(var(--bullish))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Key Factors */}
              <div>
                <div className="text-sm font-medium mb-2">Key Prediction Factors:</div>
                <div className="space-y-1">
                  {selectedPrediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-warning" />
                      {factor}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="bg-warning/10 border-warning">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div className="text-sm">
              <strong>Disclaimer:</strong> These predictions are generated using machine learning models and historical data. 
              They are for informational purposes only and should not be considered as financial advice. 
              Always conduct your own research and consult with financial advisors before making investment decisions.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPredictions;