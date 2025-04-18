
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface PaymentTrendsProps {
  data: Array<{
    date: string;
    amount: number;
  }>;
}

const PaymentTrendsChart = ({ data }: PaymentTrendsProps) => {
  return (
    <Card className="lg:col-span-2 card-transition animate-slide-in" data-testid="payment-trends">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2" size={20} />
          Payment Trends
        </CardTitle>
        <CardDescription>Last 7 days payment volume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B3D458" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#B3D458" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: "4px" }} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#B3D458" 
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTrendsChart;
