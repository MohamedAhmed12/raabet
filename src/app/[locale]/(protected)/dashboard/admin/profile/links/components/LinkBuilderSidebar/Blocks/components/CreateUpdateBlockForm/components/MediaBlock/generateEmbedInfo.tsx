export type EmbedInfo = {
  id?: string;
  clicked?: boolean;
  title: string;
  src: string;
};

export async function generateEmbedInfo(
  url: string
): Promise<EmbedInfo | null> {
  // Validate URL structure
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();

  // Validate and sanitize input
  const sanitizedUrl = url.trim();

  // Define allowed domains
  const allowedDomains = [
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "soundcloud.com",
    "twitch.tv",
    "open.spotify.com",
    "tiktok.com",
    "dailymotion.com",
    "bandcamp.com",
    "mixcloud.com",
    "audiomack.com",
    "deezer.com",
    "tunein.com",
    "music.apple.com",
  ];

  // Check if domain is allowed
  if (!allowedDomains.some((domain) => hostname.includes(domain))) {
    throw new Error("❌No embeddable media found for this domain.");
  }

  // Handle Twitch URLs
  if (hostname.includes("twitch.tv")) {
    try {
      const channel = urlObj.pathname.split("/").filter(Boolean)[0];
      if (!channel) {
        throw new Error("No channel found in Twitch URL");
      }

      const domain = process.env.NEXT_PUBLIC_TWITCH_PARENT || "localhost";
      return {
        title: channel,
        src: `https://player.twitch.tv/?channel=${encodeURIComponent(
          channel
        )}&parent=${encodeURIComponent(domain)}`,
      };
    } catch (err) {
      throw new Error("Error in Twitch URL:");
    }
  }

  // Handle Apple Music URLs
  if (hostname.includes("music.apple.com")) {
    const embedSrc = `https://embed.music.apple.com/${
      sanitizedUrl.split("music.apple.com/")[1]
    }`;
    const title = embedSrc.split(
      /music\.apple\.com\/[^/]+\/(song|album|music-video|playlist|artist)\/([^/]+)\/(\d+)/
    );
    return {
      title: title[2],
      src: embedSrc,
    };
  }

  // Handle other platforms using oEmbed
  let oembedUrl = "";
  if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
    oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("vimeo.com")) {
    oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
      sanitizedUrl
    )}`;
  } else if (hostname.includes("soundcloud.com")) {
    oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(
      sanitizedUrl
    )}`;
  } else if (hostname.includes("tiktok.com")) {
    oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("dailymotion.com")) {
    oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("bandcamp.com")) {
    oembedUrl = `https://bandcamp.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("mixcloud.com")) {
    oembedUrl = `https://www.mixcloud.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("audiomack.com")) {
    oembedUrl = `https://audiomack.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("deezer.com")) {
    oembedUrl = `https://www.deezer.com/services/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (hostname.includes("tunein.com")) {
    oembedUrl = `https://tunein.com/oembed?url=${encodeURIComponent(
      sanitizedUrl
    )}&format=json`;
  } else if (url.includes("spotify.com")) {
    oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(
      url
    )}`;
  }

  if (!oembedUrl) throw new Error("Error handling oEmbed url");

  try {
    const res = await fetch(oembedUrl);
    if (!res.ok) throw new Error(`HTTP error in oEmbed: ${res.status}`);

    const data = await res.json();

    const html = data.html || "";
    const srcMatch = html.match(/src="([^"]+)"/);
    const src = srcMatch ? srcMatch[1] : null;

    if (!src) throw new Error("Error extracting oEmbed src");

    return {
      title: data.title,
      src,
    };
  } catch (err) {
    throw new Error("Error fetching oEmbed data");
  }
}
