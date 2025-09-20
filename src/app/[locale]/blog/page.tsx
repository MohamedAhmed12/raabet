import { Metadata } from "next";
import BlogCard from "./components/BlogCard";
import { getBlogPosts } from "./actions/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: locale === "ar" ? "المدونة - رابط" : "Blog - Rabet Link",
    description:
      locale === "ar"
        ? "اكتشف أحدث المقالات والنصائح حول إنشاء الروابط الشخصية وتحسين حضورك الرقمي"
        : "Discover the latest articles and tips about creating personal links and improving your digital presence",
    openGraph: {
      title: locale === "ar" ? "المدونة - رابط" : "Blog - Rabet Link",
      description:
        locale === "ar"
          ? "اكتشف أحدث المقالات والنصائح حول إنشاء الروابط الشخصية وتحسين حضورك الرقمي"
          : "Discover the latest articles and tips about creating personal links and improving your digital presence",
      url: `${baseUrl}/${locale}/blog`,
      siteName: "Rabet Link",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        ar: `${baseUrl}/ar/blog`,
        "x-default": `${baseUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === "ar" ? "المدونة" : "Blog"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === "ar"
              ? "اكتشف أحدث المقالات والنصائح حول إنشاء الروابط الشخصية وتحسين حضورك الرقمي"
              : "Discover the latest articles and tips about creating personal links and improving your digital presence"}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <BlogCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {locale === "ar"
                ? "لا توجد مقالات متاحة حالياً"
                : "No blog posts available yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
