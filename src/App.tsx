import { useEffect, useState } from "react";
import "./styles/base.scss";
import { getGiftingInterfaces, Gift } from "./utils/api";
import { GiftView } from "./components/GiftView";

function App() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [activeGift, setActiveGift] = useState<Gift | null>(null);

  useEffect(() => {
    async function fetchGifts() {
      const giftData = await getGiftingInterfaces();
      setGifts(giftData);
    }
    fetchGifts();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gifts.map((gift, index) => (
          <GiftView
            key={index}
            gift={gift}
            isActive={activeGift === gift}
            onClick={() => setActiveGift(gift)}
            onClose={() => setActiveGift(null)}
          />
        ))}
        {/* TODO: add about button (gift) */}
        {/* TODO: add thank you notes (gift) */}
        {/* TODO: add ability to open each gift and have way to populate the modal (gift) */}
        {/* TODO: add gift for each  */}
      </div>
    </div>
  );
}

export default App;
