import { motion, AnimatePresence } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="relative w-48 h-48">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute origin-center"
            style={{
              inset: i * 4,
              backgroundImage: 'url("/xv.png")',
              backgroundColor:
                i === 0 ? "#245D7F" : i === 1 ? "#486c46" : "#45b7d1",
              backgroundBlendMode: "multiply",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transformOrigin:
                i === 0 ? "bottom right" : i === 1 ? "top left" : "center",
            }}
            animate={{
              rotate: [
                0,
                i === 0 ? 15 : i === 1 ? -15 : 220,
                i === 0 ? -15 : i === 1 ? 15 : -75,
                0,
              ],
              scale: [1, i === 2 ? 1.3 : 1.1, i === 2 ? 0.9 : 0.95, 1],
              x: [
                0,
                i === 0 ? 20 : i === 1 ? -20 : 0,
                i === 0 ? -20 : i === 1 ? 20 : 0,
                0,
              ],
              y: [
                0,
                i === 0 ? -15 : i === 1 ? 15 : 0,
                i === 0 ? 15 : i === 1 ? -15 : 0,
                0,
              ],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1], // Custom easing for more organic movement
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 border-4 border-dashed border-white/30 rounded-xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export const LoadingScreen = ({ text }: { text?: string }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm gap-20">
      <LoadingSpinner />
      {text && <p className="text-gray-500">{text}</p>}
    </div>
  );
};
