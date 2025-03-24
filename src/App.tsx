import { useEffect, useMemo, useState } from "react";
import "./styles/base.scss";
import { getGiftingInterfaces, Gift, APIGift, CustomGift } from "./utils/api";
import { GiftView } from "./components/GiftView";
import { LoadingScreen } from "./components/LoadingSpinner";
import { ThankYous } from "./components/ThankYous";
import { About } from "./components/About";
import { motion, AnimatePresence } from "framer-motion";

const CustomGifts: CustomGift[] = [
  {
    type: "custom",
    id: "thank-yous",
    wrappingImg: "envelope.png",
    renderContent: () => <ThankYous />,
    theme: "blue",
  },
  {
    type: "custom",
    id: "about",
    wrappingImg: "gift-stamp.png",
    renderContent: () => <About />,
    theme: "brown",
  },
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
          <h1 className="text-8xl font-bold">Gift Interfaces</h1>
          <p className="text-xl opacity-50">SFPC Winter 2025</p>
          <div className="relative w-[1500px] h-[1500px] overflow-auto">
            {giftsToRender.map((gift, index) => (
              <GiftView
                key={gift.id}
                gift={gift}
                isActive={activeGift === gift}
                onClick={() => setActiveGift(gift)}
                onClose={() => setActiveGift(null)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
