"use client";

import { Icon } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { memo } from "react";
import Marquee from "react-fast-marquee";

interface Review {
  id: number;
  name: string;
  title: string;
  review: string;
  image: string;
  stars: number;
}

interface StarsProps {
  count: number;
}

const Stars = memo(({ count }: StarsProps) => {
  const MAX_STARS = 5;
  const safeCount = Math.min(count, MAX_STARS);

  return (
    <div className="flex gap-1">
      {Array.from({ length: safeCount }).map((_, i) => (
        <Icon
          name="star"
          key={i}
          size={18}
          fill="currentColor"
          className="animate-pulse"
        />
      ))}
    </div>
  );
});

const ReviewCard = memo(({ review }: { review: Review }) => {
  return (
    <div className="w-[320px] lg:w-[375px] aspect-[375/231] flex space-x-16 text-white font-bold text-xl lg:text-2xl uppercase tracking-wide">
      <Card className="m-2 bg-white shadow-md rounded-xl border-l-1 border-r-1 border-black">
        <CardContent className="flex flex-col justify-between w-full h-full">
          {/* Star Rating */}
          <div className="flex items-center text-yellow-500">
            <Stars count={review.stars} />
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-xs lg:text-sm line-clamp-3">{review.review}</p>

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
              <p className="text-xs lg:text-sm font-bold">{review.name}</p>
              <p className="text-[.7rem] lg:text-xs text-blue-500">{review.title}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

const MemoizedReviews = memo(({ reviews }: { reviews: Review[] }) => {
  return [...reviews, ...reviews].map((review, index) => (
    <ReviewCard key={index} review={review} />
  ));
});

export const ReviewsSlider = ({
  reviews,
  speed,
}: {
  reviews: Review[];
  speed: number;
}) => {
  return (
    <Marquee
      speed={speed}
      className="overflow-hidden min-h-[180px] lg:min-h-[232px]"
      pauseOnHover
      gradient={false}
    >
      <div className="flex gap-4">
        <MemoizedReviews reviews={reviews} />
      </div>
    </Marquee>
  );
};
