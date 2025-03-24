import { Gift } from "../utils/api";
import { GiftDetailView } from "./GiftDetailView";
import { useRef } from "react";

interface GiftViewProps {
  gift: Gift;
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}

export function GiftView({ gift, isActive, onClick, onClose }: GiftViewProps) {
  return (
    <>
      <div
        className={`relative cursor-pointer transition-transform hover:scale-105`}
        onClick={onClick}
        style={{
          transform: isActive ? "scale(1.05)" : undefined,
          overflow: "visible",
        }}
      >
        {/* Gift wrapping image */}
        <img
          src={gift.wrappingImg}
          alt={gift.title}
          className="w-full h-48 object-contain"
        />

        {/* From/To label */}
        <div className="absolute bottom-0 right-0 bg-blue-200 p-2 rounded shadow-md text-sm">
          <div>from: {gift.from}</div>
          <div>to: {gift.to}</div>
        </div>
        {isActive && <GiftDetailView gift={gift} onClose={onClose} />}
      </div>
    </>
  );
}
