import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/base.scss";
import { getGiftingInterfaces, Gift, CustomGift } from "./utils/api";
import { GiftView } from "./components/GiftView";
import { LoadingScreen } from "./components/LoadingSpinner";
import { ThankYous } from "./components/ThankYous";
import { About } from "./components/About";
import { motion, AnimatePresence } from "framer-motion";
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./utils";
import { GiftDetailView } from "./components/GiftDetailView";
import { PlayProvider } from "@playhtml/react";

const CustomGifts: CustomGift[] = [
  {
    type: "custom",
    id: "thank-yous",
    wrappingImg: "envelope.png",
    renderContent: () => <ThankYous />,
    theme: "blue",
  },
  // {
  //   type: "custom",
  //   id: "about",
  //   wrappingImg: "gift-stamp.png",
  //   renderContent: () => <About />,
  //   theme: "brown",
  // },
];

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

  const giftsToRender = useMemo(() => {
    return [...gifts, ...CustomGifts];
  }, [gifts, CustomGifts]);

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
            <div className="absolute top-8 left-8 z-50">
              <h1 className="text-8xl font-bold whitespace-nowrap">
                Gift Interfaces
              </h1>
              <p className="text-xl opacity-50">SFPC Winter 2025</p>
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
