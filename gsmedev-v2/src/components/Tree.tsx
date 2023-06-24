import React, { ReactNode } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";

const Tree = ({ children, title }: { children?: ReactNode; title: string }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="tree">
      <AiOutlinePlusSquare />
      <span className="title">{title}</span>
    </div>
  );
};

export default Tree;
