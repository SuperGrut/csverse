import fetch from "node-fetch";

export async function fetchYouTubeVideoData(videoId, apiKey) {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet; // Return the snippet object
    } else {
      console.warn(`No items found for video ID: ${videoId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube API data:", error);
    return null; // Return null or re-throw error based on desired error handling
  }
}
