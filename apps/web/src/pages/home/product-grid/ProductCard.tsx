import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  title: string;
  description: string;
  contentWeight: string;
  bestBefore: string;
  imageUrl: string;
}

export function ProductCard({
  title,
  description,
  contentWeight,
  bestBefore,
  imageUrl,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden bg-muted/50 border-none">
      <div
        className="h-48 bg-muted"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <div className="text-sm space-y-1 text-muted-foreground">
          <p>Content weight: {contentWeight}</p>
          <p>Best before: {bestBefore}</p>
        </div>
      </CardContent>
    </Card>
  );
}
