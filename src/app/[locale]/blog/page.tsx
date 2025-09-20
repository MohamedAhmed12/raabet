import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogCard from "./components/BlogCard";
import { getBlogPosts } from "./actions/blog";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: t("pageTitle"),
    description: t("description"),
    openGraph: {
      title: t("pageTitle"),
      description: t("description"),
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
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = await getBlogPosts(locale);
  const fontClass = getFontClassClient(locale);

  return (
    <div className={cn("min-h-screen bg-gray-50 py-12", fontClass)}>
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
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
              {t("noPostsAvailable")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
