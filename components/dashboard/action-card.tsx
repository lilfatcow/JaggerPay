import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action: string;
  onClick: () => void;
}

export function ActionCard({ title, description, icon: Icon, action, onClick }: ActionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" onClick={onClick}>
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}