import { CustomGift } from "../utils/api";
import { About } from "./About";
import styles from "./CustomGiftsDrawer.module.scss";
import { Gacha } from "./Gacha";
import { ThankYous } from "./ThankYous";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiftViewInnerView } from "./GiftView";

interface CustomGiftsDrawerProps {
  onGiftClick: (gift: CustomGift) => void;
}

const CustomGifts: CustomGift[] = [
  {
    type: "custom",
    id: "about",
    wrappingImg: "/2d/gift.svg",
    renderContent: () => <About />,
    theme: "brown",
    label: {
      text: "About Gift Interfaces",
      color: "#8B4513",
    },
  },
  {
    type: "custom",
    id: "thank-yous",
    wrappingImg: "/2d/thank-you.svg",
    renderContent: () => <ThankYous />,
    theme: "blue",
    label: {
      text: "Thank You Cards",
      color: "#4444ff",
    },
  },
  {
    type: "custom",
    id: "gacha",
    wrappingImg: "/2d/gacha.svg",
    renderContent: () => <Gacha />,
    theme: "brown",
    label: {
      text: "Gift Inspo Gacha",
      color: "#9333ea",
    },
  },
];

// Function to generate a random rotation between -10 and 10 degrees
const getRandomRotation = () => Math.random() * 20 - 10;

export function CustomGiftsDrawer({ onGiftClick }: CustomGiftsDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className={`${styles.drawer} shadow-xl`}
      animate={{ y: isExpanded ? "10px" : "70%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
        animate={{ rotate: isExpanded ? 180 : 0, translateX: "-50%" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* <div className={styles.toggleBorder} /> */}
        <div className={styles.chevron}>
          <img src="arrow.svg" alt="" />
        </div>
      </motion.button>

      <AnimatePresence>
        <motion.div
          className={styles.drawerContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className={styles.border} />
          <div className={styles.container}>
            <div className={styles.giftGrid}>
              {CustomGifts.map((gift) => (
                <div
                  key={gift.id}
                  className={styles.giftItem}
                  onClick={() => onGiftClick(gift)}
                >
                  <GiftViewInnerView gift={gift} size="full" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
