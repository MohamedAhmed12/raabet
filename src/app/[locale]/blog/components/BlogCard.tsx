import { BlogPostSummary } from "@/types/blog";
import { Calendar, ChevronRight, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate } from "../utils";

interface BlogCardProps {
  post: BlogPostSummary;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      {post.featuredImage && (
        <div className="aspect-w-16 aspect-h-9 h-55 relative">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-col px-3 py-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatBlogDate(post.publishedAt, locale)}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>
                {post.readTime} {locale === "ar" ? "دقائق" : "min read"}
              </span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center justify-center bg-blue-100 text-blue-900 font-medium text-[.8rem] px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
