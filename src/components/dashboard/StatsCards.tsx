
import { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle: string;
  testId: string;
}

const StatsCards = ({ stats }: { stats: StatCardProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" data-testid="stats-grid">
      {stats.map((item, index) => (
        <Card 
          key={index} 
          className="card-transition animate-fade-up" 
          style={{ animationDelay: `${index * 100}ms` }} 
          data-testid={`stat-card-${item.testId}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              {item.icon}
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
