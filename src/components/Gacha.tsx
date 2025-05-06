import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Block {
  title: string;
  description: string;
  image?: {
    display: {
      url: string;
    };
  };
  base_class?: string;
  class?: string;
  href: string;
}

interface ChannelResponse {
  contents: Block[];
  length: number;
  page: number;
  per: number;
}

interface GachaProps {}

export const Gacha: React.FC<GachaProps> = ({}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentGift, setCurrentGift] = useState<Block | null>(null);
  const [showGift, setShowGift] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all blocks with pagination
  const fetchAllBlocks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let allBlocks: Block[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(
          `https://api.are.na/v2/channels/gifting-interfaces/contents?page=${page}`
        );
        const data: ChannelResponse = await response.json();

        // Filter blocks to only include those from this channel
        const channelBlocks = data.contents.filter(
          (block) => block.base_class === "Block" && block.class !== "Block"
        );

        allBlocks = [...allBlocks, ...channelBlocks];

        // Check if we've reached the end
        // TODO: cahnge this.
        hasMore = data.length === data.per && false;
        page++;
      }

      setBlocks(allBlocks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching from Are.na:", error);
      setError("Failed to load gifts. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlocks();
  }, []);

  const getRandomBlock = () => {
    if (blocks.length === 0) return null;
    return blocks[Math.floor(Math.random() * blocks.length)];
  };

  const handleGachaClick = async () => {
    if (isAnimating || isLoading) return;

    setIsAnimating(true);
    setShowGift(false);

    // Use cached blocks to get random gift
    const gift = getRandomBlock();

    // Animate the ball coming out
    setTimeout(() => {
      setCurrentGift(gift);
      setShowGift(true);
      setIsAnimating(false);
    }, 2000);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
        <button
          onClick={fetchAllBlocks}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      )}

      {/* Gacha Machine */}
      <motion.div
        className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
        onClick={handleGachaClick}
      >
        <img src={"/gacha.png"} alt="Gacha Machine" className="w-full h-auto" />
      </motion.div>

      {/* Ball Animation */}
      <AnimatePresence>
        {isAnimating && !showGift && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-16 h-16 bg-red-500 rounded-full"
            initial={{ y: -100, x: "-50%" }}
            animate={{
              y: ["-100%", "100%"],
              rotate: [0, 720],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Gift Reveal */}
      <AnimatePresence>
        {showGift && currentGift && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm w-full m-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <iframe
                src={`https://are.na/block/${currentGift.id}`}
                className="w-full rounded-lg mb-4 h-[400px]"
              />
              {/* {currentGift.image && (
                <img
                  src={currentGift.image.display.url}
                  alt={currentGift.title}
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{currentGift.title}</h3>
              <p className="text-gray-600 mb-6">{currentGift.description}</p> */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://are.na/block/${currentGift.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-center transition-colors"
                >
                  View on Are.na
                </a>
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setShowGift(false);
                    // Wait for close animation to finish before allowing new pull
                    setTimeout(() => {
                      handleGachaClick();
                    }, 500);
                  }}
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
