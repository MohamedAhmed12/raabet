"use client";

import { Icon } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface Review {
  id: number;
  name: string;
  title: string;
  review: string;
  image: string;
  stars: number;
}
export const ReviewsSlider = ({
  reviews,
  speed,
}: {
  reviews: Review[];
  speed: number;
}) => {
  return (
    <Marquee autoFill speed={speed} className="overflow-hidden min-h-[200px]">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-[375px] h-[231px] flex space-x-16 text-white font-bold text-2xl uppercase tracking-wide"
        >
          <Card className="m-2 bg-white shadow-md rounded-xl border-l-1 border-r-1 border-black">
            <CardContent className="flex flex-col justify-between w-full h-full">
              {/* Star Rating */}
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Icon name="star" key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm line-clamp-3">
                {review.review}
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-3 mt-3">
                <Image
                  src={review.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={review.name}
                />
                <div>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs text-blue-500">{review.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </Marquee>
  );
};
