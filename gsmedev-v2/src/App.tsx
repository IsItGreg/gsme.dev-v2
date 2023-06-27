import React, { useEffect, useState } from "react";
import "./App.css";
import Tree from "./components/Tree";

interface TreeNode {
  title: string;
  children?: TreeNode[];
  text?: string[];
}

const content: TreeNode = {
  title: "hello",
  children: [
    {
      title: "about me",
      text: [
        "I am a software engineer working at Markforged. I recently got my Masters in CS from UMass Amherst.",
      ],
    },
    {
      title: "work",
      children: [
        {
          title: "Markforged",
          text: [
            "I work on the software that powers our 3D printers. I work on everything from the embedded software on the printers to the software that runs on the cloud.",
          ],
        },
        {
          title: "Rivet Health",
          text: [
            "I worked on a web application that helps patients find doctors that accept their insurance.",
          ],
        },
        {
          title: "Contract Logix",
          text: [
            "I worked on a web application that helps patients find doctors that accept their insurance.",
          ],
        },
      ],
    },
    {
      title: "education",
      children: [
        {
          title: "Master of Science in Computer Science - UMass Amherst",
          text: [
            "I work on the software that powers our 3D printers. I work on everything from the embedded software on the printers to the software that runs on the cloud.",
          ],
        },
        {
          title: "Bachelor of Science in Computer Science - UMass Lowell",
          text: [
            "I worked on a web application that helps patients find doctors that accept their insurance.",
          ],
        },
      ],
    },
    {
      title: "contact",
      text: [
        "email: gsmelkov@gmail.com\n",
        "linkedin: linkedin.com/in/greg-smelkov",
      ],
    },
  ],
};

const contentToKeyArray = (content: TreeNode, key = [0]): string[] => {
  const { children } = content;
  const keyString = key.join("-");

  const childKeys = children
    ? children.map((child) =>
        contentToKeyArray(child, [...key, children.indexOf(child)])
      )
    : [];

  return [keyString, ...childKeys.flat()];
};

function App() {
  const [scrollbarPosition, setScrollbarPosition] = useState<number>(0);
  const [currentKey, setCurrentKey] = useState<string>("default");

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const maxPosition =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollbarPosition(currentPosition / maxPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const treeKeys = ["default", ...contentToKeyArray(content)];

  useEffect(() => {
    const position = scrollbarPosition * (treeKeys.length - 1);
    const index = Math.ceil(position);
    const key = treeKeys[index];
    setCurrentKey(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollbarPosition]);

  const goToKey = (key: string, mode: "open" | "close") => {
    if (mode === "close") {
      key = key.split("-").slice(0, -1).join("-");
    }
    const index = treeKeys.indexOf(key);
    const position = (index - 0.5) / (treeKeys.length - 1);
    window.scrollTo({
      top:
        position *
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight),
      behavior: "auto",
    });
  };

  const contentToTree = (content: TreeNode, key = [0]) => {
    const { title, children, text } = content;
    const keyString = key.join("-");
    return (
      <Tree
        title={title}
        key={keyString}
        ownKey={keyString}
        openKey={currentKey}
        goToKey={goToKey}
      >
        {children
          ? children.map((child) =>
              contentToTree(child, [...key, children.indexOf(child)])
            )
          : text}
      </Tree>
    );
  };

  return <div className="app">{contentToTree(content)}</div>;
}

export default App;
