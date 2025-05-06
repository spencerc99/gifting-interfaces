import { useState, useRef, useEffect } from "react";
import styles from "./SpotifyRadio.module.scss";

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

interface SpotifyRadioProps {
  playlistUrl: string;
  width?: string;
  height?: string;
}

export const SpotifyRadio: React.FC<SpotifyRadioProps> = ({
  playlistUrl,
  width = "300px",
  height = "300px",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedControllerRef = useRef<any>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add the Spotify Embed SDK
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the IFrame API
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = elementRef.current;
      if (!element) return;

      // Extract the URI from the playlist URL
      // Convert from format like "https://open.spotify.com/embed/playlist/6wg8puxlCshrUuzI4P8neT"
      // to "spotify:playlist:6wg8puxlCshrUuzI4P8neT"
      const uri = playlistUrl
        .replace("https://open.spotify.com/embed/", "spotify:")
        .replace("/", ":")
        .split("?")[0];

      console.log(uri);

      const options = {
        width: "100%",
        height: "0", // Hide the iframe
        uri: uri,
      };

      const callback = (EmbedController: any) => {
        embedControllerRef.current = EmbedController;
      };

      IFrameAPI.createController(element, options, callback);
    };

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, [playlistUrl]);

  const togglePlay = async () => {
    if (embedControllerRef.current) {
      if (!isPlaying) {
        await embedControllerRef.current.resume();
      } else {
        await embedControllerRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={togglePlay}
        className={styles.radioButton}
        style={{ width, height }}
        aria-label={isPlaying ? "Stop music" : "Play music"}
      >
        <img
          src="/radio-image.png"
          alt="Vintage Radio"
          className={`${styles.radioImage} ${isPlaying ? styles.playing : ""}`}
        />
      </button>
      <div ref={elementRef} style={{ display: "none" }} />
    </div>
  );
};
