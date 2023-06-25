import React, { ReactNode, useRef, useState, useEffect } from "react";
import "./Tree.css";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";

const Tree = ({ children, title }: { children?: ReactNode; title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const previousIsOpen = useRef(isOpen);

  useEffect(() => {
    previousIsOpen.current = isOpen;
  }, [isOpen]);

  const [ref, { height: contentHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 20 },
    to: {
      height: isOpen ? contentHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });

  return (
    <div className="tree">
      <div className="titlerow" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <AiOutlineMinusSquare style={{ opacity: children ? 1 : 0.3 }} />
        ) : (
          <AiOutlinePlusSquare />
        )}
        <span className="title"> {title}</span>
      </div>
      <animated.div
        className="content"
        style={{
          opacity,
          height: isOpen && previousIsOpen.current === isOpen ? "auto" : height,
        }}
      >
        <animated.div ref={ref} className="children" style={{ opacity, y }}>
          {children}
        </animated.div>
      </animated.div>
    </div>
  );
};

export default Tree;
