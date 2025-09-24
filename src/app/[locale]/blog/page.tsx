import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import { getBlogPosts } from "./actions/blog";
import BlogCard from "./components/BlogCard";

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
  const t = await getTranslations({ locale });
  const posts = await getBlogPosts(locale);
  const fontClass = getFontClassClient(locale);

  return (
    <div>
      <NextLink
        href="/"
        className="bg-gray-50 flex items-center gap-1 px-4 sm:px-6 lg:px-8 pt-4"
      >
        <Link
          size={21}
          width={21}
          strokeWidth={3.5}
          fontWeight={800}
          className="text-[#1b97f5]"
        />
        <span className={cn("font-bold text-deep-blue-gray capitalize", locale === "ar" ? "text-3xl" : "text-2xl")}>
          {t("Shared.rabet")}
        </span>
      </NextLink>
      <div className={cn("min-h-screen bg-gray-50 py-12", fontClass)}>
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t("Blog.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("Blog.description")}
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
                {t("Blog.noPostsAvailable")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
