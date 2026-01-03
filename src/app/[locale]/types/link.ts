import { Prisma, Link as PrismaLink, Social } from "@prisma/client";

/**
 * Link type with all relations included
 * This is the type returned by fetchSingleLink and React Query
 */
export type LinkWithRelations = Prisma.LinkGetPayload<{
  include: {
    user: true;
    socials: true;
    blocks: true;
    qrcodes: true;
  };
}>;

/**
 * Link type with optional relations (for flexibility)
 * This replaces the old Link type from use-link-store
 * Makes all relations optional to match the old interface
 */
export type Link = Omit<LinkWithRelations, "user" | "socials" | "blocks" | "qrcodes"> & {
  user?: LinkWithRelations["user"] | null;
  socials?: LinkWithRelations["socials"] | null;
  blocks?: LinkWithRelations["blocks"] | null;
  qrcodes?: LinkWithRelations["qrcodes"] | null;
};

/**
 * Re-export Prisma types for convenience
 */
export type { PrismaLink, Social as LinkSocial };

