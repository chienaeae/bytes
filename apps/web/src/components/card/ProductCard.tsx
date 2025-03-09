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
    <Card className="overflow-hidden hover:shadow-float transition-shadow dark:shadow-border dark:shadow-md">
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
          <p className="min-h-10 text-sm text-muted-foreground line-clamp-2 break-words text-ellipsis overflow-hidden">
            {description}
          </p>
        </div>
        <div className="text-sm space-y-1 text-muted-foreground">
          <p className="line-clamp-1 break-words text-ellipsis overflow-hidden">
            Content weight: {contentWeight}
          </p>
          <p>Best before: {bestBefore}</p>
        </div>
      </CardContent>
    </Card>
  );
}
