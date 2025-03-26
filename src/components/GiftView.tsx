import { Gift } from "../utils/api";
import { getGiftPosition, generateHash } from "../utils";
import { CanMoveElement } from "@playhtml/react";
import { useRef } from "react";

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
  // Workaround to handle the drag to move interaction & click open modal interaction
  const position = getGiftPosition(gift);
  const moveStartPos = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    moveStartPos.current = { x: e.clientX, y: e.clientY };
    hasMoved.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!moveStartPos.current) return;

    const deltaX = Math.abs(e.clientX - moveStartPos.current.x);
    const deltaY = Math.abs(e.clientY - moveStartPos.current.y);

    // If moved more than 5px in any direction, consider it a drag
    if (deltaX > 5 || deltaY > 5) {
      hasMoved.current = true;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasMoved.current) {
      onClick();
    }
    moveStartPos.current = null;
  };

  return (
    <CanMoveElement>
      <div
        id={gift.id}
        className={`absolute cursor-pointer transition-transform hover:scale-105`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          overflow: "visible",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <GiftViewInnerView gift={gift} />
      </div>
    </CanMoveElement>
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
