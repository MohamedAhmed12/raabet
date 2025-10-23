import { User } from "next-auth";

interface UserWithLinks extends Omit<User, 'links'> {
  links?: Array<{
    id: string;
    phone?: string;
    website?: string;
    instagram?: string;
    twitter?: string;
    socials?: Array<{
      icon: string;
      url: string;
      label?: string;
    }>;
  }>;
}

export function generateVCard(user: UserWithLinks | null): string | null {
  if (!user) return null;

  const link = user.links?.[0];
  if (!link) return null;

  let vcfContent = `BEGIN:VCARD
VERSION:2.1
FN:${user.fullname || 'Unknown'}`;

  // Add phone if available
  if (link.phone) {
    vcfContent += `\nTEL:${link.phone}`;
  }

  // Add email if available
  if (user.email) {
    vcfContent += `\nEMAIL:${user.email}`;
  }

  // Add website if available
  if (link.website) {
    vcfContent += `\nURL:${link.website}`;
  }

  // Add social media platforms dynamically
  let itemIndex = 1;

  // Add all social media platforms from the socials array
  if (link.socials && link.socials.length > 0) {
    link.socials.forEach((social) => {
      if (social.url && social.url.trim() !== '') {
        vcfContent += `\nITEM${itemIndex}.URL:${social.url}`;
        vcfContent += `\nITEM${itemIndex}.X-ABLABEL:${social.label || social.icon}`;
        itemIndex++;
      }
    });
  }

  vcfContent += `\nEND:VCARD`;

  return vcfContent;
}
