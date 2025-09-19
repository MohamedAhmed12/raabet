import { MetadataRoute } from "next";
import { getBlogPosts } from "./[locale]/blog/actions/blog";

// This tells Next.js to generate the sitemap at request time instead of build time, so DB will be available.
export const dynamic = "force-dynamic";
// revalidate cache after 48 hours in seconds (2 days)
export const revalidate = 172800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rabetlink.com";

  // Get blog posts for both locales
  const [enPosts, arPosts] = await Promise.all([
    getBlogPosts("en"),
    getBlogPosts("ar"),
  ]);

  // Create blog post URLs with hreflang alternates
  const blogUrls: MetadataRoute.Sitemap = [
    ...enPosts.map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          ar: `${baseUrl}/ar/blog/${post.slug}`,
          "x-default": `${baseUrl}/en/blog/${post.slug}`, // fallback
        },
      },
    })),
    ...arPosts.map((post) => ({
      url: `${baseUrl}/ar/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${post.slug}`,
          ar: `${baseUrl}/ar/blog/${post.slug}`,
          "x-default": `${baseUrl}/en/blog/${post.slug}`,
        },
      },
    })),
  ];

  return [
    // Root removed since it perminantly redirects
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          "x-default": `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          "x-default": `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          ar: `${baseUrl}/ar/blog`,
          "x-default": `${baseUrl}/en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          ar: `${baseUrl}/ar/blog`,
          "x-default": `${baseUrl}/en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/pricing`,
          ar: `${baseUrl}/ar/pricing`,
          "x-default": `${baseUrl}/en/pricing`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/pricing`,
          ar: `${baseUrl}/ar/pricing`,
          "x-default": `${baseUrl}/en/pricing`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          ar: `${baseUrl}/ar/contact`,
          "x-default": `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          ar: `${baseUrl}/ar/contact`,
          "x-default": `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy`,
          ar: `${baseUrl}/ar/privacy`,
          "x-default": `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy`,
          ar: `${baseUrl}/ar/privacy`,
          "x-default": `${baseUrl}/en/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms`,
          ar: `${baseUrl}/ar/terms`,
          "x-default": `${baseUrl}/en/terms`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms`,
          ar: `${baseUrl}/ar/terms`,
          "x-default": `${baseUrl}/en/terms`,
        },
      },
    },
    ...blogUrls,
  ];
}
