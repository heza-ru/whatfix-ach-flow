
import { Cell, Pie, PieChart as RechartPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieChart } from 'lucide-react';

interface PaymentStatusData {
  name: string;
  value: number;
  color: string;
}

interface PaymentStatusChartProps {
  data: PaymentStatusData[];
}

const PaymentStatusChart = ({ data }: PaymentStatusChartProps) => {
  return (
    <Card className="card-transition animate-slide-in" style={{ animationDelay: '200ms' }} data-testid="payment-status">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChart className="mr-2" size={20} />
          Payment Status
        </CardTitle>
        <CardDescription>Current payment distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentStatusChart;
