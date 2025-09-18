import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getRelatedPosts } from "../actions/blog";

interface BlogNavigationProps {
  currentSlug: string;
  locale: string;
}

export default async function BlogNavigation({
  currentSlug,
  locale,
}: BlogNavigationProps) {
  const relatedPosts = await getRelatedPosts(currentSlug, locale, 3);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {locale === "ar" ? "مقالات ذات صلة" : "Related Articles"}
        </h3>

        {relatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {locale === "ar"
              ? "لا توجد مقالات ذات صلة متاحة حالياً"
              : "No related articles available at the moment"}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-sky-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
        </Link>

        <div className="text-sm text-gray-500">
          {locale === "ar" ? "شارك هذا المقال" : "Share this article"}
        </div>
      </div>
    </div>
  );
}
