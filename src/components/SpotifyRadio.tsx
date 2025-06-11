import { useState, useRef, useEffect } from "react";
import styles from "./SpotifyRadio.module.scss";

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

interface SpotifyRadioProps {
  playlistUrl: string;
}

export const SpotifyRadio: React.FC<SpotifyRadioProps> = ({ playlistUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  const embedControllerRef = useRef<any>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add the Spotify Embed SDK
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    // Extract the URI from the playlist URL
    // Convert from format like "https://open.spotify.com/embed/playlist/6wg8puxlCshrUuzI4P8neT"
    // to "spotify:playlist:6wg8puxlCshrUuzI4P8neT"
    const uri = playlistUrl
      .replace("https://open.spotify.com/embed/", "spotify:")
      .replace("/", ":")
      .split("?")[0];

    // Initialize the IFrame API
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = elementRef.current;
      if (!element) return;

      const options = {
        width: "100%",
        height: "0", // Hide the iframe
        uri: uri,
      };

      const callback = (EmbedController: any) => {
        embedControllerRef.current = EmbedController;

        // Set up event listeners
        EmbedController.addListener("ready", () => {
          console.log("Embed is ready");
          setEmbedReady(true);
        });

        EmbedController.addListener("playback_update", (e: any) => {
          setIsPlaying(!e.data.isPaused);
        });
      };

      IFrameAPI.createController(element, options, callback);
    };

    return () => {
      // Cleanup - check if script still exists before removing
      const existingScript = document.querySelector(
        'script[src="https://open.spotify.com/embed/iframe-api/v1"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [playlistUrl]);

  const togglePlay = async () => {
    if (!embedControllerRef.current || !embedReady) {
      // Fallback: open Spotify in new tab if embed isn't ready
      window.open(playlistUrl.replace("/embed", ""), "_blank");
      return;
    }

    try {
      if (isPlaying) {
        // If currently playing, pause
        await embedControllerRef.current.pause();
        setIsPlaying(false);
      } else {
        // If not playing, start playing
        // Start playing (the playback_update listener will handle state updates)
        await embedControllerRef.current.resume();
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
      // Fallback: open Spotify in new tab
      window.open(playlistUrl.replace("/embed", ""), "_blank");
    }
  };

  const getButtonText = () => {
    if (isPlaying) return "Pause";
    return "Play";
  };

  const getButtonIcon = () => {
    return <img src="/2d/boombox.svg" alt="Play music" className="w-5 h-5" />;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-2 px-3 py-2 h-10 rounded-md transition-colors whitespace-nowrap bg-gray-100 hover:bg-gray-200`}
          aria-label={isPlaying ? "Stop music" : "Play music"}
        >
          <div className="flex-shrink-0">{getButtonIcon()}</div>
          <span className={`font-medium text-sm text-purple-600`}>
            {getButtonText()}
          </span>
        </button>
      </div>

      <a
        href={playlistUrl.replace("/embed", "")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 text-sm whitespace-nowrap"
      >
        playlist
      </a>

      {/* Hidden Spotify iframe controller */}
      <div style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}>
        <div ref={elementRef}></div>
      </div>
    </div>
  );
};
