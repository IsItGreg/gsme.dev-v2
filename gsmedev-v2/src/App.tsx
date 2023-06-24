import React from "react";
import "./App.css";
import Tree from "./components/Tree";

function App() {
  return (
    <div className="app">
      <Tree title="test">
        <Tree title="test2">
          text
          <Tree title="test3" />
        </Tree>
        children
      </Tree>
    </div>
  );
}

export default App;
