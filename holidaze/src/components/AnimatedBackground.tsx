import { motion } from "framer-motion";

const blobs = [
  {
    className:
      "left-[-120px] top-[10%] h-72 w-72 bg-cyan-400/20 blur-3xl md:h-96 md:w-96",
    x: [0, 60, -30, 0],
    y: [0, -40, 40, 0],
  },
  {
    className:
      "right-[-140px] top-[18%] h-80 w-80 bg-indigo-400/20 blur-3xl md:h-[26rem] md:w-[26rem]",
    x: [0, -70, 30, 0],
    y: [0, 50, -30, 0],
  },
  {
    className:
      "left-[15%] bottom-[-160px] h-72 w-72 bg-teal-300/20 blur-3xl md:h-96 md:w-96",
    x: [0, 40, -60, 0],
    y: [0, -30, 40, 0],
  },
];

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0f1733]" />
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${blob.className}`}
          animate={{ x: blob.x, y: blob.y }}
          transition={{
            duration: 22 + index * 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
