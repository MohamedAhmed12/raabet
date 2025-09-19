"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreateBlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage?: string;
  tags?: string[];
  readTime?: number;
  locale: string;
  publishedAt?: Date;
}

export interface UpdateBlogPostData {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
  readTime?: number;
  publishedAt?: Date;
}

export async function createBlogPost(data: CreateBlogPostData) {
  try {
    const blogPost = await prisma.blog.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        featuredImage: data.featuredImage,
        tags: data.tags || [],
        readTime: data.readTime,
        locale: data.locale,
        publishedAt: data?.publishedAt?.toISOString() || new Date(),
      },
    });

    revalidatePath(`/${data.locale}/blog`);
    return { success: true, data: blogPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(
  slug: string,
  locale: string,
  data: UpdateBlogPostData
) {
  try {
    const blogPost = await prisma.blog.update({
      where: {
        slug_locale: {
          slug: slug,
          locale: locale,
        },
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/${locale}/blog`);
    revalidatePath(`/${locale}/blog/${slug}`);
    return { success: true, data: blogPost };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(slug: string, locale: string) {
  try {
    await prisma.blog.delete({
      where: {
        slug_locale: {
          slug: slug,
          locale: locale,
        },
      },
    });

    revalidatePath(`/${locale}/blog`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const blogPost = await prisma.blog.findUnique({
      where: { id },
    });

    return { success: true, data: blogPost };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: "Failed to fetch blog post" };
  }
}

export async function incrementBlogViewCount(slug: string, locale: string) {
  try {
    await prisma.blog.updateMany({
      where: {
        slug: slug,
        locale: locale,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return { success: false, error: "Failed to increment view count" };
  }
}

export async function getBlogStats() {
  try {
    const stats = await prisma.blog.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        viewCount: true,
      },
    });

    const postsByLocale = await prisma.blog.groupBy({
      by: ["locale"],
      _count: {
        id: true,
      },
    });

    return {
      success: true,
      data: {
        totalPosts: stats._count.id,
        totalViews: stats._sum.viewCount || 0,
        postsByLocale: postsByLocale.reduce((acc, item) => {
          acc[item.locale] = item._count.id;
          return acc;
        }, {} as Record<string, number>),
      },
    };
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return { success: false, error: "Failed to fetch blog stats" };
  }
}
