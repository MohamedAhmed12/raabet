export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  featuredImage?: string | null;
  tags: string[];
  readTime?: number | null;
  locale: string;
  createdAt: Date;
  viewCount: number;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  featuredImage?: string | null;
  tags: string[];
  readTime?: number | null;
  locale: string;
  createdAt: Date;
  viewCount: number;
}
