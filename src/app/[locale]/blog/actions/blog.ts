import { BlogPost, BlogPostSummary } from "@/types/blog";
import prisma from "@/lib/prisma";

export async function getBlogPosts(locale: string): Promise<BlogPostSummary[]> {
  return await prisma.blog.findMany({
    where: {
      locale: locale,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  const post = await prisma.blog.findFirst({
    where: {
      slug: slug,
      locale: locale,
    },
  });

  if (!post) {
    return null;
  }

  // Increment view count
  await prisma.blog.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });

  return post;
}

export async function getRelatedPosts(
  currentSlug: string,
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  return await prisma.blog.findMany({
    where: {
      locale: locale,
      slug: { not: currentSlug },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
  });
}

// Additional utility functions for blog management
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await prisma.blog.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getBlogPostsByTag(
  tag: string,
  locale: string
): Promise<BlogPostSummary[]> {
  return await prisma.blog.findMany({
    where: {
      locale: locale,
      tags: {
        has: tag,
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function searchBlogPosts(
  query: string,
  locale: string
): Promise<BlogPostSummary[]> {
  return await prisma.blog.findMany({
    where: {
      locale: locale,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}
