import React, { ReactNode, useRef, useState, useEffect } from "react";
import "./Tree.css";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { useSpring, animated as a } from "@react-spring/web";
import useMeasure from "react-use-measure";

const Tree = ({
  children,
  title,
  ownKey,
  openKey,
  goToKey,
}: {
  children?: ReactNode;
  title: string;
  ownKey: string;
  openKey: string;
  goToKey: (key: string, mode: "open" | "close") => void;
}) => {
  const [isOpen, setIsOpen] = useState(ownKey === openKey);
  const previousIsOpen = useRef(isOpen);

  const forceOpen = openKey.startsWith(ownKey);

  useEffect(() => {
    if (forceOpen && !previousIsOpen.current) {
      setIsOpen(true);
    } else if (!forceOpen && previousIsOpen.current) {
      setIsOpen(false);
    }
  }, [forceOpen]);

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
      <div
        className="titlerow"
        onClick={() => goToKey(ownKey, isOpen ? "close" : "open")}
      >
        {isOpen ? (
          <AiOutlineMinusSquare style={{ opacity: children ? 1 : 0.3 }} />
        ) : (
          <AiOutlinePlusSquare />
        )}
        <span
          className="title"
          style={{ color: ownKey === openKey ? "red" : "inherit" }}
        >
          {" "}
          {title}
        </span>
      </div>
      <a.div
        className="content"
        style={{
          opacity,
          height: isOpen && previousIsOpen.current === isOpen ? "auto" : height,
        }}
      >
        <a.div ref={ref} className="children" style={{ opacity, y }}>
          {children}
        </a.div>
      </a.div>
    </div>
  );
};

export default Tree;
