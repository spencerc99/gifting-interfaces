import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/base.scss";
import { getGiftingInterfaces, Gift, CustomGift } from "./utils/api";
import { GiftView } from "./components/GiftView";
import { LoadingScreen } from "./components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./utils";
import { GiftDetailView } from "./components/GiftDetailView";
import { PlayProvider } from "@playhtml/react";
import { CustomGiftsDrawer } from "./components/CustomGiftsDrawer";
import { Instructions } from "./components/Instructions";
import { SpotifyRadio } from "./components/SpotifyRadio";

function App() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [activeGift, setActiveGift] = useState<Gift | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const giftData = await getGiftingInterfaces();
        setGifts(giftData);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGifts();
  }, []);

  // Only render regular gifts in the main area
  const giftsToRender = useMemo(() => {
    return gifts;
  }, [gifts]);

  return (
    <PlayProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" text="Loading gifts..." />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen p-8"
          >
            <Instructions />
            <div className="fixed top-0 right-0 z-50">
              <SpotifyRadio
                playlistUrl="https://open.spotify.com/embed/playlist/6wg8puxlCshrUuzI4P8neT?utm_source=generator"
                width="100px"
                height="100px"
              />
            </div>
            <div
              className="relative overflow-auto z-50 mt-36 overflow-visible"
              style={{
                minWidth: `${VIEWPORT_WIDTH}px`,
                minHeight: `${VIEWPORT_HEIGHT}px`,
              }}
            >
              {giftsToRender.map((gift, index) => (
                <GiftView
                  key={gift.id}
                  gift={gift}
                  onClick={() => setActiveGift(gift)}
                />
              ))}
            </div>
            {/* Custom Gifts Drawer */}
            <CustomGiftsDrawer onGiftClick={(gift) => setActiveGift(gift)} />
            {activeGift && (
              <GiftDetailView
                gift={activeGift}
                onClose={() => setActiveGift(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PlayProvider>
  );
}

export default App;
