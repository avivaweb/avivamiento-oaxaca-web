export const siteConfig = {
    whatsapp: {
        get number() {
            return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "529511234567";
        }
    },
    youtube: {
        get channelId() {
            return process.env.NEXT_PUBLIC_YOUTUBE_ID || "UCcOMgfZtPbjoMBVHuzqWYSg";
        },
        get apiKey() {
            return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || "AIzaSyDhqY0Jro3q7yMh_JUCdi5ayxvluJRjNB0";
        }
    }
};
