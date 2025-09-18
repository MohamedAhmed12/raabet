import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "../components/BlogContent";
import BlogNavigation from "../components/BlogNavigation";
import { getBlogPost } from "../actions/blog";

interface BlogPostPageProps {
  params: {
    locale: string;
    blogkey: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, blogkey } = await params;

  // Decode the blogkey to handle Arabic characters properly
  const decodedBlogkey = decodeURIComponent(blogkey);
  const post = await getBlogPost(decodedBlogkey, locale);

  if (!post) {
    return {
      title:
        locale === "ar" ? "المقال غير موجود - رابط" : "Post Not Found - Rabet ",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  return {
    title: `${post.title} - ${locale === "ar" ? "رابط" : "Rabet"}`,
    description: post.excerpt,
    keywords: post.tags?.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/${locale}/blog/${decodedBlogkey}`,
      siteName: "Rabet Link",
      locale: locale,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${decodedBlogkey}`,
      languages: {
        ar: `${baseUrl}/ar/blog/${decodedBlogkey}`,
        en: `${baseUrl}/en/blog/${decodedBlogkey}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, blogkey } = await params;

  // Decode the blogkey to handle Arabic characters properly
  const decodedBlogkey = decodeURIComponent(blogkey);
  const post = await getBlogPost(decodedBlogkey, locale);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rabet Link",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${decodedBlogkey}`,
    },
    keywords: post.tags?.join(", "),
    articleSection: "Technology",
    wordCount: post.content.split(" ").length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogContent post={post} locale={locale} />
          <BlogNavigation currentSlug={decodedBlogkey} locale={locale} />
        </article>
      </div>
    </>
  );
}
