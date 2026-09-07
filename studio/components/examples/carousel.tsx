"use client";
import { Example } from "@/components/examples/example";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function Preview() {
  return (
    <div className="example-stack">
      <CarouselBasic />
    </div>
  );
}
function CarouselBasic() {
  return (
    <Example title="Basic">
      <Carousel className="mx-auto max-w-xs sm:max-w-sm">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((slide) => (
            <CarouselItem key={slide}>
              <div className="p-1 style-luma:p-2.5">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{slide}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
    </Example>
  );
}
