"use client";

import { motion } from "framer-motion";
import { HandHelping, Clock8, AppWindow, Star } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface Review {
  id: number;
  name: string;
  title: string;
  review: string;
  image: string;
  stars: number;
}
export default function AnimatedBar() {
  const messages = [
    { text: "Powerful Block Builder", icon: AppWindow },
    { text: "Go Live in Minutes", icon: Clock8 },
    { text: "Fully Customizable", icon: HandHelping },
  ];

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle the array and take 6 random reviews
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setReviews(shuffled);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);
  return (
    <>
      <div className="bg-[#fed396] py-4 overflow-hidden whitespace-nowrap">
        {/* the animated bar */}
        <motion.div
          className="flex space-x-16 text-white font-bold text-2xl uppercase tracking-wide w-max"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Duplicate the messages for a seamless effect */}
          {Array(3)
            .fill(messages)
            .flat()
            .map(({ text, icon: Icon }, index) => (
              <div key={index} className="flex items-center space-x-2 px-4">
                <Icon size={28} /> {/* Lucide Icon */}
                <p>{text}</p>
              </div>
            ))}
        </motion.div>
      </div>
      <div>
        {/* the reviews */}
        <div className="relative w-full overflow-hidden py-10 bg-[#D7A9FF]">
  {/* First Motion Bar - Infinite Loop */}
  <div className="relative flex w-full overflow-hidden">
    <motion.div
      className="flex w-max flex-nowrap"
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{
        repeat: Infinity,
        duration: 15,
        ease: "linear",
      }}
    >
      {[...reviews, ...reviews].map((review, index) => (
        <div key={index} className="flex-shrink-0 w-80">
          <Card className="w-80 h-64 p-4 bg-white shadow-md rounded-xl">
            <CardContent className="flex flex-col justify-between h-full">
              {/* Star Rating */}
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
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
    </motion.div>
  </div>

  {/* Add Space Between Sections */}
  <div className="h-10"></div>

  {/* Second Motion Bar - Infinite Loop */}
  <div className="relative flex w-full overflow-hidden">
    <motion.div
      className="flex w-max flex-nowrap"
      initial={{ x: 0 }}
      animate={{ x: "-100%" }}
      transition={{
        repeat: Infinity,
        duration: 18,
        ease: "linear",
      }}
    >
      {[...reviews, ...reviews].map((review, index) => (
        <div key={index} className="flex-shrink-0 w-80">
          <Card className="w-80 h-64 p-4 bg-white shadow-md rounded-xl">
            <CardContent className="flex flex-col justify-between h-full">
              {/* Star Rating */}
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
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
    </motion.div>
  </div>
</div>
[]
      </div>
    </>
  );
}
