import React from "react";
import "./App.css";
import Tree from "./components/Tree";

function App() {
  return (
    <div className="app">
      <Tree title="hello">
        <Tree title="about me">
          I am a software engineer working at Markforged. I recently got my
          Masters in CS from UMass Amherst.
        </Tree>
        <Tree title="work">
          <Tree title="Markforged">
            I work on the software that powers our 3D printers. I work on
            everything from the embedded software on the printers to the
            software that runs on the cloud.
          </Tree>
          <Tree title="Rivet Health">
            I worked on a web application that helps patients find doctors that
            accept their insurance.
          </Tree>
        </Tree>
      </Tree>
    </div>
  );
}

export default App;
