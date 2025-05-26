// export type EmbedInfo = {
//   title: string;
//   src: string;
// } | null;

// export async function generateEmbedInfo(url: string): Promise<EmbedInfo> {
//   try {
//     // Handle Twitch URLs first
//     if (url.includes("twitch.tv")) {
//       try {
//         const urlObj = new URL(url);
//         const channel = urlObj.pathname.split("/").filter(Boolean)[0];
//         if (!channel) return null;
//         const domain = process.env.NEXT_PUBLIC_TWITCH_PARENT || "localhost";
//         return {
//           title: `${channel}`,
//           src: `https://player.twitch.tv/?channel=${channel}&parent=${domain}`,
//         };
//       } catch (err) {
//         console.error("Error processing Twitch URL:", err);
//         return null;
//       }
//     }

//     // Handle other platforms using oEmbed
//     let oembedUrl = "";
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
//     } else if (url.includes("vimeo.com")) {
//       oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
//     } else if (url.includes("soundcloud.com")) {
//       oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
//     } else if (url.includes("spotify.com")) {
//       oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
//     }

//     if (!oembedUrl) return null;

//     try {
//       const res = await fetch(oembedUrl);
//       if (!res.ok) return null;

//       const data = await res.json();
      
//       // Extract the URL from the HTML response
//       const html = data.html || "";
//       const srcMatch = html.match(/src="([^"]+)"/);
//       const src = srcMatch ? srcMatch[1] : null;

//       if (!src) return null;

//       return { title: data.title, src };
//     } catch (err) {
//       console.error("Error fetching oEmbed data:", err);
//       return null;
//     }
//   } catch (err) {
//     console.error("Error in generateEmbedInfo:", err);
//     return null;
//   }
// }

export type EmbedInfo = {
  title: string;
  src: string;
} | null;

export async function generateEmbedInfo(url: string): Promise<EmbedInfo | null> {
  try {
    // Validate URL structure
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Validate and sanitize input
    const sanitizedUrl = url.trim();
    
    // Define allowed domains
    const allowedDomains = [
      'youtube.com',
      'youtu.be',
      'vimeo.com',
      'soundcloud.com',
      'twitch.tv',
      'open.spotify.com'
    ];

    // Check if domain is allowed
    if (!allowedDomains.some(domain => hostname.includes(domain))) {
      console.error('Invalid domain:', hostname);
      return null;
    }

    // Handle Twitch URLs
    if (hostname.includes('twitch.tv')) {
      try {
        const channel = urlObj.pathname.split("/").filter(Boolean)[0];
        if (!channel) {
          console.error('No channel found in Twitch URL');
          return null;
        }
        
        const domain = process.env.NEXT_PUBLIC_TWITCH_PARENT || "localhost";
        return {
          title: channel,
          src: `https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(domain)}`,
        };
      } catch (err) {
        console.error("Error processing Twitch URL:", err);
        return null;
      }
    }

    // Handle other platforms using oEmbed
    let oembedUrl = "";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(sanitizedUrl)}&format=json`;
    } else if (hostname.includes("vimeo.com")) {
      oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(sanitizedUrl)}`;
    } else if (hostname.includes("soundcloud.com")) {
      oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(sanitizedUrl)}`;
    } else if (url.includes("spotify.com")) {
      oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
    }

    if (!oembedUrl) return null;

    try {
      const res = await fetch(oembedUrl);
      if (!res.ok) return null;

      const data = await res.json();
      
      // Extract the URL from the HTML response
      const html = data.html || "";
      const srcMatch = html.match(/src="([^"]+)"/);
      const src = srcMatch ? srcMatch[1] : null;

      if (!src) return null;

      return { title: data.title, src };
    } catch (err) {
      console.error("Error fetching oEmbed data:", err);
      return null;
    }
  } catch (err) {
    console.error("Error in generateEmbedInfo:", err);
    return null;
  }
}
