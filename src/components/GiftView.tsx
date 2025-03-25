import { Gift } from "../utils/api";
import { getGiftPosition, generateHash } from "../utils";

interface GiftViewProps {
  gift: Gift;
  onClick: () => void;
}

// Array of pastel background colors for labels
const labelColors = [
  "bg-blue-200",
  "bg-pink-200",
  "bg-yellow-200",
  "bg-green-200",
];

// Get deterministic style values based on gift properties
export function getGiftLabelStyles(gift: Gift) {
  // Use the same hash function but with a different seed for label styling
  const hash = generateHash(gift.id + "_label");

  return {
    rotation: (hash % 20) - 10, // Range: -10 to 10 degrees
    color: labelColors[hash % labelColors.length],
    position: {
      x: (hash % 20) - 10, // Range: -10 to 10px
      y: ((hash >> 4) % 20) - 10, // Use different bits for y offset
    },
  };
}

export function GiftView({ gift, onClick }: GiftViewProps) {
  const position = getGiftPosition(gift);

  return (
    <>
      <div
        can-move=""
        className={`absolute cursor-pointer transition-transform hover:scale-105`}
        onClick={onClick}
        style={{
          overflow: "visible",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <GiftViewInnerView gift={gift} />
      </div>
    </>
  );
}

export function GiftViewInnerView({ gift }: { gift: Gift }) {
  const labelStyles = getGiftLabelStyles(gift);
  return (
    <>
      <img
        src={gift.wrappingImg}
        alt={"wrappingImgAlt" in gift ? gift.wrappingImgAlt || "" : ""}
        className="w-full h-48 max-w-60 object-contain"
      />

      {/* From/To label with deterministic styling */}
      {(gift.from || gift.to) && (
        <div
          className={`absolute p-2 rounded shadow-md text-sm ${labelStyles.color}`}
          style={{
            bottom: `${labelStyles.position.y}px`,
            right: `${labelStyles.position.x}px`,
            transform: `rotate(${labelStyles.rotation}deg)`,
            transformOrigin: "center",
          }}
        >
          {gift.from && <div>from: {gift.from}</div>}
          {gift.to && <div>to: {gift.to}</div>}
        </div>
      )}
    </>
  );
}
