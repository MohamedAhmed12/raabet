// import ReactPlayer from "react-player";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import SongLinkEmbed from "react-song-embed";

// // Supported platforms and their domains
// const supportedPlatforms = {
//   youtube: ["youtube.com", "youtu.be"],
//   vimeo: ["vimeo.com"],
//   twitch: ["twitch.tv"],
//   dailymotion: ["dailymotion.com", "dai.ly"],
// };

// // Get error message for invalid URL
// function getPlatformErrorMessage(url: string): string {
//   const supportedDomains = Object.values(supportedPlatforms).flat().join(", ");
//   return `No media was found for this URL. Please use one of the following platforms: ${supportedDomains}`;
// }

// interface AudioBlockProps {
//   block: {
//     url: string;
//   };
//   onUpdateBlockProperty: (key: string, value: string) => void;
// }

// export const AudioBlock = ({
//   block,
//   onUpdateBlockProperty,
// }: AudioBlockProps) => {
//   const [url, setUrl] = useState(block.url);
//   const [error, setError] = useState("");

//   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newUrl = e.target.value;
//     setUrl(newUrl);
//     setError(""); // Clear any previous error
//     onUpdateBlockProperty("url", newUrl);
//   };

//   function extractDailymotionVideoId(url: string): string | null {
//     try {
//       const parsed = new URL(url);

//       // Handle dai.ly short URLs
//       if (parsed.hostname.includes("dai.ly")) {
//         return parsed.pathname.slice(1);
//       }

//       // Handle full dailymotion URLs
//       if (parsed.hostname.includes("dailymotion.com")) {
//         // Handle video/xxx format
//         const match = parsed.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
//         if (match) return match[1];

//         // Handle geo embed URLs
//         const geoVideoId = parsed.searchParams.get("video");
//         if (geoVideoId) return geoVideoId;

//         // Handle embed URLs
//         const embedMatch = parsed.pathname.match(
//           /\/embed\/video\/([a-zA-Z0-9]+)/
//         );
//         if (embedMatch) return embedMatch[1];
//       }

//       return null;
//     } catch {
//       return null;
//     }
//   }

//   // Configuration for react-player
//   const embedConfig = {
//     youtube: {
//       youtube: {
//         playerVars: { showinfo: 1 },
//       },
//     },
//     vimeo: {
//       vimeo: {
//         playerOptions: {
//           autoplay: false,
//           muted: false,
//           loop: false,
//           byline: false,
//           portrait: false,
//           title: false,
//           transparent: true,
//           responsive: true,
//           playsinline: true,
//         },
//       },
//     },
//     twitch: {
//       twitch: {},
//     },
//   };

//   const getVideoId = (url: string) => {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };
//   const videoId = getVideoId(url);

//   return (
//     <div className="flex flex-col gap-4">
//       <Input
//         type="url"
//         placeholder="Enter media URL"
//         value={url}
//         onChange={handleUrlChange}
//         className="w-full"
//       />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//       {url && (
//         <div className="max-w-full w-full h-[200px]">
//           {(() => {
//             try {
//               const parsedUrl = new URL(url);
//               const hostname = parsedUrl.hostname.replace("www.", "");
//               const platform = Object.entries(supportedPlatforms).find(
//                 ([_, domains]) =>
//                   domains.some((domain) => hostname.endsWith(domain))
//               )?.[0];

//               // if (!platform) {
//               //   return <SongLinkEmbed url={url} height={225} />;
//               // }

//               // Handle Dailymotion URLs specially
//               if (platform === "dailymotion") {
//                 const videoId = extractDailymotionVideoId(url);
//                 if (!videoId) {
//                   setError("Invalid Dailymotion video ID");
//                   return null;
//                 }
//                 return (
//                   <div className="w-full h-[250px]">
//                     <iframe
//                       src={`https://www.dailymotion.com/embed/video/${videoId}`}
//                       width="100%"
//                       height="100%"
//                       allow="autoplay"
//                       allowFullScreen
//                       frameBorder="0"
//                     ></iframe>
//                   </div>
//                 );
//               }
//               if (platform === "youtube" || platform === "youtu.be") {
//                 return (
//                   <div className="w-full h-[250px]">
//                     <iframe
//                       src={`https://www.youtube.com/embed/${videoId}`}
//                       width="100%"
//                       height="100%"
//                       allow="autoplay; encrypted-media; picture-in-picture"
//                       allowFullScreen
//                       frameBorder="0"
//                       title="YouTube video player"
//                     ></iframe>
//                   </div>
//                 );
//               }

//               // return (
//               //   <ReactPlayer
//               //     url={url}
//               //     width="100%"
//               //     height={250}
//               //     playing={false}
//               //     controls={true}
//               //     className="w-full max-w-full"
//               //     config={embedConfig[platform as keyof typeof embedConfig]}
//               //   />
//               // );
//             } catch (err) {
//               setError(getPlatformErrorMessage(url));
//               return null;
//             }
//           })()}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import ReactPlayer from "react-player";

// interface AudioBlockProps {
//   block: {
//     url: string;
//   };
//   onUpdateBlockProperty: (key: string, value: string) => void;
// }

// export const AudioBlock = ({ block, onUpdateBlockProperty }: AudioBlockProps) => {
//   const [url, setUrl] = useState(block.url || "");

//   // Sync local url state if block.url changes from outside
//   useEffect(() => {
//     setUrl(block.url || "");
//   }, [block.url]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newUrl = e.target.value;
//     setUrl(newUrl);
//     onUpdateBlockProperty("url", newUrl);
//   };

//   return (
//     <div className="w-full h-[200px]">
//       <input
//         type="text"
//         placeholder="Paste your URL here..."
//         value={url}
//         onChange={handleChange}
//         style={{
//           width: "100%",
//           padding: "8px 12px",
//           marginBottom: 12,
//           fontSize: 16,
//           borderRadius: 4,
//           border: "1px solid #ccc",
//         }}
//       />
//       {url && (
//         <ReactPlayer
//           url={url}
//           controls
//           width="100%"
//           height="330px"
//           onPlay={() => onUpdateBlockProperty("lastPlayedAt", new Date().toISOString())}
//           onPause={() => onUpdateBlockProperty("lastPausedAt", new Date().toISOString())}
//         />
//       )}
//     </div>
//   );
// };

'use client';

import { useState } from 'react';
import {Block} from "@prisma/client";
import { generateEmbedInfo, EmbedInfo } from './MediaBlock/generateEmbedInfo';

export const AudioBlock = ({
  block,
  onUpdateBlockProperty,
}: {
  block: Block;
  onUpdateBlockProperty: (key: keyof Block, val: string) => void;
}) => {
  const [embedInfo, setEmbedInfo] = useState<EmbedInfo>(null);
  const [error, setError] = useState('');

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalUrl = e.target.value;
    console.log("originalUrl", originalUrl);
    
    try {
      const info = await generateEmbedInfo(originalUrl);
      console.log("embed info", info);
      
      if (info) {
        setEmbedInfo(info);
        onUpdateBlockProperty('title', info.title);
        // Keep the original URL in the block
        onUpdateBlockProperty('url', originalUrl);
        setError('');
      } else {
        setEmbedInfo(null);
        // Still save the original URL even if no embed info found
        onUpdateBlockProperty('url', originalUrl);
        setError('❌ No embeddable media found for this URL.');
      }
    } catch (error) {
      console.error('Error processing URL:', error);
      // Still save the original URL even if there's an error
      onUpdateBlockProperty('url', originalUrl);
      setError('❌ Error processing media URL');
      setEmbedInfo(null);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto space-y-4 p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Media URL</label>
          <input
            type="text"
            value={block.url || ''}
            onChange={handleUrlChange}
            placeholder="Paste your media URL"
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <input
            type="text"
            value={block.title || ''}
            onChange={(e) => onUpdateBlockProperty('title', e.target.value)}
            placeholder="Tag"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}