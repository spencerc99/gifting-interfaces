import { useState, useRef, useEffect } from 'react';

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

// List of track URIs from the Gift Interfaces playlist
const PLAYLIST_TRACKS = [
  "spotify:track:1ZgQcxut2hLRZTrbM54fOV", // Tizita - Hailu Mergia
  "spotify:track:3t4mslZa0wJYrj2UjlsyPX", // Coffee's on Me - 落日飛車 Sunset Rollercoaster
  "spotify:track:4p5ZGsDB5bqdFMIRoLEslq", // Girls Like Sade - June Freedom, Nana Fofie
  "spotify:track:7nSataGo54Le0IfcFQCFLN", // Love Love - Gilsons
  "spotify:track:4syRWjlQqS2FokBP34KSzz", // The Gift (feat. Collin Raye & Susan Ashton) - Jim Brickman, Collin Raye, Susan Ashton
  "spotify:track:1dmJWX0nWAx5gjDzAohSbO", // Cerca De Ti - Hermanos Gutiérrez
  "spotify:track:2xa9224f1RXkIDoRvs58yI", // give u the moon - Lil Peep
  "spotify:track:6Vj7DZQaggi1ZbjSw5PdKH", // giving - slowed - GIOVANNA, Austin Marc
  "spotify:track:2P4BA3QhE36bmceVdBS60g", // Come Close - Ry-Lo
  "spotify:track:1PSoJffiX1XVc0ZXUWHe2R", // Walden Pond - Atta Boy
  "spotify:track:42gjjuenEHj7wBUlbuO3RM", // Sing for Myself - Voices in Your Head
  "spotify:track:0ROKraHEf4F02IyaudmAt6", // 3 Rounds And A Sound - Blind Pilot
  "spotify:track:3G6XpCfczuhbTSBlgfqe9v", // El lugar correcto - Natalia Lafourcade
  "spotify:track:1fRlDQzrpvWd4BlIzifUkJ", // Keep Me in Your Heart - Warren Zevon
  "spotify:track:7lPqXJsHCPWmcOqgO1poAy", // My Favorite Things - Pomplamoose
  "spotify:track:52VwZsyzyFaQEAwTYMH479", // In Dreams - tomemitsu
  "spotify:track:2UY1uX2Wt5cj5mUVCa4c3O", // Taking Things For Granted - Joy Oladokun
  "spotify:track:0Bq0tBC2jtH2td1ILgZ28K", // Chemex - Gabriel Kahane
  "spotify:track:6iywI1870JvnLwbQJEvh2o", // Gift of a Friend - Demi Lovato
  "spotify:track:5sTcB227je1ByKWTEBj2me", // You Lucky One - Villagers
  "spotify:track:6KtjWCtKEUiwWrRdzzsQZj", // Give It Away - Andrew Bird
  "spotify:track:12F6ItVyyYstsaL1Lyg6uh", // Given - Shaina Taub
  "spotify:track:58rxpgox81Lb5kw3NO0Sq7", // Parting Gift - Fiona Apple
  "spotify:track:0yfVAnObp9F3Y32Rbl6pes", // Holy - Jamila Woods
  "spotify:track:1IzD9f2LJ9NV0yEvKFlsiV", // Terms Of Endearment - Demo - Sammy Copley
  "spotify:track:6DBAhTpomE1z4QW6rtX1fX", // Sister Winter - Sufjan Stevens
  "spotify:track:4zsxXFyX1D4s0KKU3uFCSl", // If a tree falls in love with a river - Lau Noah, Jacob Collier
  "spotify:track:4LesrBswFnLcHmwDslst1q", // First Time - Hozier
  "spotify:track:35WjWVaGGmA6RU0kgyOxZ6", // Joy Inside My Tears - Stevie Wonder
  "spotify:track:4W8IEREeLldaSQyGXcZQ2I", // Strawberry Letter 23 - Shuggie Otis
  "spotify:track:5gNTRfMRPZg1U07j7KSSaG", // c2.0 - Charli xcx
  "spotify:track:4p1lZQdX9XXYqg0yhhhxTq", // I Dedicate (Pt. 3) - Brandy
  "spotify:track:2ZEwMwHaUECDWKkDh8rL0O", // The Moon and the Sky - Sade
  "spotify:track:0lVdukU9ejbFQwZIhg47hx", // Everyday Is Like Sunday - 2011 Remaster - Morrissey
  "spotify:track:3cjvqsvvU80g7WJPMVh8iq", // Genesis - Grimes
  "spotify:track:5NSmVuhSf3JxrCewijurpf", // The Giving Tree - Plain White T's
  "spotify:track:0Pj9cTJcWbrDPjtCKx4Ody", // Present Without A Bow - Kacey Musgraves, Leon Bridges
  "spotify:track:6Zrs6gUUaSkM1Z7d0FxOlF", // Present - Lloyd Vaan
  "spotify:track:70RNYGbgFi8GbenFohGOJg", // Present - Ethan Tasch
  "spotify:track:5JG3U42FqDQqYvMAC8h8Sr", // Daydreaming ~ 楽想 - Grégoire Blanc
  "spotify:track:33cQCiAJsy5xOKYkhLQ9ga", // Good Hand - Saintseneca
  "spotify:track:68jZByx2c1UWtRyIX7gpN7", // tiny things - Tiny Habits
];

function getRandomTrack() {
  return PLAYLIST_TRACKS[Math.floor(Math.random() * PLAYLIST_TRACKS.length)];
}

export const Instructions = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string>("");
  const [embedReady, setEmbedReady] = useState(false);
  const embedControllerRef = useRef<any>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial random track
    const initialTrack = getRandomTrack();
    setCurrentTrack(initialTrack);

    // Add the Spotify Embed SDK
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the IFrame API
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = elementRef.current;
      if (!element) return;

      const options = {
        width: "100%",
        height: "0", // Hide the iframe
        uri: initialTrack,
      };

      const callback = (EmbedController: any) => {
        embedControllerRef.current = EmbedController;
        
        // Set up event listeners
        EmbedController.addListener('ready', () => {
          console.log('Embed is ready');
          setEmbedReady(true);
        });

        EmbedController.addListener('playback_update', (e: any) => {
          setIsPlaying(!e.data.isPaused);
          if (!e.data.isPaused) {
            setIsLoading(false); // Stop loading when playback starts
          }
        });
      };

      IFrameAPI.createController(element, options, callback);
    };

    return () => {
      // Cleanup - check if script still exists before removing
      const existingScript = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const playRandomTrack = async () => {
    if (!embedControllerRef.current || !embedReady) {
      // Fallback: open Spotify in new tab if embed isn't ready
      window.open('https://open.spotify.com/playlist/6wg8puxlCshrUuzI4P8neT', '_blank');
      return;
    }

    try {
      if (isPlaying) {
        // If currently playing, pause
        await embedControllerRef.current.pause();
        setIsPlaying(false);
        setIsLoading(false);
      } else {
        // If not playing, select a random track and play
        setIsLoading(true);
        const randomTrack = getRandomTrack();
        setCurrentTrack(randomTrack);
        
        // Load the new track in background
        await embedControllerRef.current.loadUri(randomTrack);
        
        // Start playing (the playback_update listener will handle state updates)
        await embedControllerRef.current.play();
      }
    } catch (error) {
      console.error('Error controlling playback:', error);
      setIsLoading(false);
      // Fallback: open Spotify in new tab
      window.open('https://open.spotify.com/playlist/6wg8puxlCshrUuzI4P8neT', '_blank');
    }
  };

  const playNextTrack = async () => {
    if (!embedControllerRef.current || !embedReady) {
      return;
    }

    try {
      setIsLoading(true);
      const randomTrack = getRandomTrack();
      setCurrentTrack(randomTrack);
      
      // Load and play the new track
      await embedControllerRef.current.loadUri(randomTrack);
      await embedControllerRef.current.play();
    } catch (error) {
      console.error('Error playing next track:', error);
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    if (isPlaying) return 'Stop music';
    return 'Play music';
  };

  const getButtonIcon = () => {
    if (isLoading) {
      return (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-purple-600 rounded-full animate-spin"></div>
      );
    }
    return <img src="/2d/boombox.svg" alt="Play music" className="w-5 h-5" />;
  };
  return (
    <div
      style={{
        position: "absolute",
        left: "-6px",
        backgroundColor: "white",
        fontSize: "12px",
      }}
      className="flex flex-col gap-4 py-4 px-8 pb-6 max-w-md rounded-xl shadow-lg"
    >
      <h1 className="text-7xl font-bold whitespace-nowrap">Gift Interfaces</h1>
      <p>
        The vessels on this page contain gifts developed by students at the{" "}
        <a href="https://sfpc.study">School for Poetic Computation's</a> Gift
        Interfaces class in{" "}
        <a href="https://sfpc.study/sessions/winter-25/gift-interfaces">
          Winter 2025
        </a>
        .
      </p>

      <p>
        Open a container to find the gift within. Then share it with a friend
        who would enjoy it.
      </p>

      {/* Add the functional radio at the bottom */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={playRandomTrack}
            disabled={isLoading}
            className={`flex items-center gap-2 px-3 h-10 rounded-md transition-colors ${
              isLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label={isPlaying ? "Stop music" : "Play random music"}
          >
            {getButtonIcon()}
            <span className={`font-medium ${isLoading ? 'text-gray-500' : 'text-purple-600'}`}>
              {getButtonText()}
            </span>
          </button>
          
          {/* Next track button - only show when music is playing or loading */}
          {(isPlaying || isLoading) && (
            <button
              onClick={playNextTrack}
              disabled={isLoading}
              className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label="Next track"
              title="Next track"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-purple-600 rounded-full animate-spin"></div>
              ) : (
                <span className="text-lg">⏭️</span>
              )}
            </button>
          )}
        </div>
        
        <a 
          href="https://open.spotify.com/playlist/6wg8puxlCshrUuzI4P8neT" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          playlist
        </a>
      </div>
      
      {/* Hidden Spotify iframe controller */}
      <div ref={elementRef} style={{ display: "none" }} />
    </div>
  );
};