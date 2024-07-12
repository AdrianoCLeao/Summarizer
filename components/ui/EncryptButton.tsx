import { useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link as ScrollLink, scroller } from "react-scroll";

const Example = () => {
  return (
    <div className="grid min-h-[200px] place-content-center bg-transparent p-4">
      <EncryptButton />
    </div>
  );
};

const TARGET_TEXT = "Try it now";
const CYCLES_PER_LETTER = 1;
const SHUFFLE_TIME = 40;

const CHARS = "!@#$%^*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  const handleClick = () => {
    scroller.scrollTo("target-section", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <ScrollLink to="summarizer" smooth={true} duration={1000}>
      <motion.button
        whileHover={{
          scale: 1.025,
        }}
        whileTap={{
          scale: 0.975,
        }}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        onClick={handleClick}
        className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-800 bg-neutral-900 px-4 py-2 font-medium text-neutral-300 transition-colors hover:text-Purple-400"
      >
        <div className="relative z-10 flex items-center gap-2">
          <FiArrowDown />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%",
          }}
          animate={{
            y: "-100%",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          }}
          className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-purple-400/0 from-40% via-purple-400/100 to-purple-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </motion.button>
    </ScrollLink>
  );
};

export default Example;
