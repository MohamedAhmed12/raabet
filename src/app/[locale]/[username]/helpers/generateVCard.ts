import { User } from "next-auth";

export function generateVCard(user: User | null): string | null {
  if (!user) return null;

  return `
    BEGIN:VCARD
    VERSION:3.0
    FN:${user.fullname}
    TEL:${user?.links?.[0].phone}
    EMAIL:${user.email}
    ITEM1.URL:${user?.links?.[0].website}
    ITEM1.X-ABLABEL:Website
    ITEM2.URL:${user?.links?.[0].instagram}
    ITEM2.X-ABLABEL:Instagram
    ITEM3.URL:${user?.links?.[0].twitter}
    ITEM3.X-ABLABEL:Twitter
    END:VCARD
  `;
}
