import { handleQRCodeRedirect } from "@/app/[locale]/qr-code/actions";

interface PageProps {
  searchParams: Promise<{ url?: string }>;
}

export default async function QRCodeRedirectPage({ searchParams }: PageProps) {
  const { url: trackedUrl } = await searchParams;

  if (!trackedUrl) {
    return null; // This will never be reached due to redirect in handleQRCodeRedirect
  }

  // Call the server action - it will handle the redirect
  await handleQRCodeRedirect(trackedUrl);
}
