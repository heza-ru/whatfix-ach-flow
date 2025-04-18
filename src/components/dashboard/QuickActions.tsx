
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickActionItem {
  to: string;
  icon: React.ReactNode;
  text: string;
  primary?: boolean;
  testId: string;
}

const QuickActions = ({ actions }: { actions: QuickActionItem[] }) => {
  return (
    <Card className="card-transition animate-fade-up" style={{ animationDelay: '300ms' }} data-testid="quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks you can perform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <Link key={index} to={action.to} data-testid={`quick-action-${action.testId}`}>
            <Button 
              className={`w-full justify-start hover-lift ${
                action.primary 
                  ? 'bg-bank-primary hover:bg-bank-primary/90' 
                  : 'variant-outline'
              }`}
              variant={action.primary ? 'default' : 'outline'}
            >
              {action.icon}
              {action.text}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
