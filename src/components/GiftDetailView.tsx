import { Gift, APIGift } from "../utils/api";
import styles from "./GiftDetailView.module.scss";
import { ImageOrVideo } from "./ImageOrVideo";
import { GiftViewInnerView } from "./GiftView";
import { motion, AnimatePresence } from "framer-motion";

interface GiftDetailViewProps {
  gift: Gift;
  onClose: () => void;
}

function isAPIGift(gift: Gift): gift is APIGift {
  return !("type" in gift);
}

function APIGiftContent({ gift }: { gift: APIGift }) {
  const transformedImageUrls = (gift?.imageUrls || []).map(
    (url) => url.replace("https://codahosted.io", "https://codaio.imgix.net"),
    {
      auto: "format,compress",
      fit: "max",
      w: "450",
    }
  );

  return (
    <>
      <h2 className="text-2xl">{gift.title || "Untitled Gift"}</h2>
      {gift.description.split("\n").map((paragraph, i) => (
        <p key={i} className="mb-4">
          {paragraph}
        </p>
      ))}

      <div className="mt-8 space-y-4 flex flex-wrap gap-4 justify-center">
        {transformedImageUrls.map((url, index) => (
          <ImageOrVideo
            key={index}
            src={url}
            alt={gift.imageAltText?.[index] || ""}
            className="w-full rounded-xl shadow-md"
          />
        ))}
      </div>

      <div className="flex flex-col mt-6">
        {gift.link && (
          <a
            href={gift.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-300 hover:text-blue-400"
          >
            View Project →
          </a>
        )}
        {gift.websiteLink && (
          <a
            href={gift.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-300 hover:text-blue-400"
          >
            Gifter's Website →
          </a>
        )}
      </div>
    </>
  );
}

export function GiftDetailView({ gift, onClose }: GiftDetailViewProps) {
  const theme = "default"; // Simplified theme handling
  const isCustomGift = "type" in gift && gift.type === "custom";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
        onClick={onClose}
      >
        <div
          className={`${styles.giftDetailView} relative ${styles[theme]} ${
            isCustomGift ? styles.customGift : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Gift wrapping overlay */}
          <div className={`absolute z-20 ${styles.giftOverlay}`}>
            <GiftViewInnerView
              gift={gift}
              size={isCustomGift ? "small" : "large"}
            />
          </div>

          <button
            className="absolute top-8 right-8 text-white hover:text-gray-200 z-10"
            onClick={onClose}
          >
            <img src="/X.svg" alt="Close" className="w-10 h-10" />
          </button>

          <div className={styles.content}>
            <div className={styles.detailSection}>
              {isAPIGift(gift) ? (
                <APIGiftContent gift={gift} />
              ) : (
                gift.renderContent()
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
