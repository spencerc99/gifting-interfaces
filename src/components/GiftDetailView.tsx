import { Gift } from "../utils/api";
import styles from "./GiftDetailView.module.scss";

interface GiftDetailViewProps {
  gift: Gift;
  onClose: () => void;
}

export function GiftDetailView({ gift, onClose }: GiftDetailViewProps) {
  return (
    <div
      className={styles.giftDetailView}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="absolute top-8 right-8 text-white hover:text-gray-200 z-10"
        onClick={onClose}
      >
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.detailSection}>
          <h2 className="text-2xl">{gift.title || "Untitled Gift"}</h2>
          <p>{gift.description}</p>

          <div className="mt-8 space-y-4">
            {gift.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Gift image ${index + 1}`}
                className="w-full rounded-lg shadow-md"
              />
            ))}
          </div>

          {gift.link && (
            <a
              href={gift.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-blue-300 hover:text-blue-400"
            >
              View More →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
