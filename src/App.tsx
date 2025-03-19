import { useEffect, useState } from "react";
import "./styles/base.scss";
import { getGiftingInterfaces, Gift } from "./utils/api";

function App() {
  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    async function fetchGifts() {
      const giftData = await getGiftingInterfaces();
      setGifts(giftData);
    }
    fetchGifts();
  }, []);

  return (
    <div className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gifts.map((gift, index) => (
          <div key={index} className="relative">
            {/* Gift wrapping image */}
            <img
              src={gift.wrappingImg}
              alt={gift.title}
              className="w-full h-48 object-contain"
            />

            {/* From/To label */}
            <div className="absolute bottom-0 right-0 bg-blue-200 p-2 rounded shadow-md text-sm">
              {gift.title && <div>{gift.title}</div>}
              <div>from: {gift.from}</div>
              <div>to: {gift.to}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
