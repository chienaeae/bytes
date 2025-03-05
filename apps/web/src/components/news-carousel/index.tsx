import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function NewsCarousel() {
  const newsItems = [
    {
      id: 1,
      title: 'News Title 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing ut labore et dolore elit.',
      image: 'https://fakeimg.pl/300/?text=1',
    },
    {
      id: 2,
      title: 'News Title 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://fakeimg.pl/300/?text=2',
    },
    {
      id: 3,
      title: 'News Title 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      image: 'https://fakeimg.pl/300/?text=3',
    },
    {
      id: 4,
      title: 'News Title 4',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      image: 'https://fakeimg.pl/300/?text=4',
    },
  ];

  return (
    <section className="container mx-auto mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">NEWS</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {newsItems.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="p-0">
                  <div
                    className="aspect-[16/9] bg-muted rounded-t-lg"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
