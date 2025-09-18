import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import { formatBlogDate } from "../utils";

interface BlogContentProps {
  post: BlogPost;
  locale: string;
}

export default function BlogContent({ post, locale }: BlogContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{formatBlogDate(post.publishedAt)}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>
                {post.readTime} {locale === "ar" ? "دقائق قراءة" : "min read"}
              </span>
            </div>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center justify-center bg-blue-100 text-blue-900 font-medium text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.featuredImage && (
          <div className="aspect-w-16 aspect-h-9 h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
        dangerouslySetInnerHTML={{
          __html: post.content
            .replace(
              /^# (.*$)/gim,
              '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">$1</h1>'
            )
            .replace(
              /^## (.*$)/gim,
              '<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h2>'
            )
            .replace(
              /^### (.*$)/gim,
              '<h3 class="text-xl font-bold text-gray-900 mt-4 mb-2">$1</h3>'
            )
            .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/gim, "<em>$1</em>")
            .replace(/\n\n/gim, '</p><p class="mb-4">')
            .replace(/^(?!<[h|l])(.*$)/gim, '<p class="mb-4">$1</p>'),
        }}
      />
    </article>
  );
}
