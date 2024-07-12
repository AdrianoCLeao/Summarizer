import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TabProps {
  setPosition: React.Dispatch<React.SetStateAction<{
    left: number;
    width: number;
    opacity: number;
  }>>;
  onMouseEnter: (ref: React.RefObject<HTMLLIElement>) => void;
  children?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children, setPosition, onMouseEnter }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => onMouseEnter(ref)}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

const SlideTabs: React.FC = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleMouseEnter = (ref: React.RefObject<HTMLLIElement>) => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white dark-mode p-1"
      style={{ position: "sticky", top: 0 }} 
    >
      <Tab setPosition={setPosition} onMouseEnter={handleMouseEnter}>
        Home
      </Tab>
      <Tab setPosition={setPosition} onMouseEnter={handleMouseEnter}>
        Pricing
      </Tab>
      <Tab setPosition={setPosition} onMouseEnter={handleMouseEnter}>
        Features
      </Tab>
      <Tab setPosition={setPosition} onMouseEnter={handleMouseEnter}>
        Docs
      </Tab>
      <Tab setPosition={setPosition} onMouseEnter={handleMouseEnter}>
        Blog
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

export default SlideTabs;
