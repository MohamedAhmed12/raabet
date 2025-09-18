export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  tags?: string[];
  readTime?: number;
  locale: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  featuredImage?: string;
  tags?: string[];
  readTime?: number;
  locale: string;
}
