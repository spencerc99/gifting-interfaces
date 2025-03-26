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
  "bg-purple-200",
  "bg-red-200",
  "bg-orange-200",
  "bg-teal-200",
  "bg-gray-200",
  "bg-indigo-200",
  "bg-lime-200",
];

// Get deterministic style values based on gift properties
export function getGiftLabelStyles(gift: Gift) {
  // Use the same hash function but with a different seed for label styling
  const hash = generateHash(gift.id + "_label");

  return {
    rotation: (hash % 20) - 10, // Range: -10 to 10 degrees
    color: labelColors[hash % labelColors.length],
    transform: {
      // Use different bits of hash for x/y percentages
      x: `${(hash % 10) + 40}%`, // Range: -0% to -50%
      y: `${((hash >> 4) % 10) + 40}%`, // Range: -0% to -50%
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    moveStartPos.current = { x: touch.clientX, y: touch.clientY };
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!moveStartPos.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - moveStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - moveStartPos.current.y);

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

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMoved.current) {
      e.preventDefault(); // Prevent ghost clicks
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
        className="h-48 max-w-60 object-contain flex-shrink-0"
        style={{
          minWidth: "40px",
          width: "auto",
        }}
      />

      {/* From/To label with deterministic styling */}
      {(gift.from || gift.to) && (
        <div
          className={`absolute p-2 rounded shadow-md text-sm ${labelStyles.color}`}
          style={{
            bottom: 0,
            right: 0,
            transform: `translate(${labelStyles.transform.x}, ${labelStyles.transform.y}) rotate(${labelStyles.rotation}deg)`,
            transformOrigin: "center",
            opacity: 0.9,
          }}
        >
          {gift.from && <div>from: {gift.from}</div>}
          {gift.to && <div>to: {gift.to}</div>}
        </div>
      )}
    </>
  );
}
