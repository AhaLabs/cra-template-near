import React from "react";
import reactLogo from "./react-logo.svg";
import nearLogo from "./near-logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="columns">
          <div>
            <img src={reactLogo} className="App-logo" alt="React" />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
          <div>
            <img src={nearLogo} className="App-logo" alt="logo" />
            <a
              className="App-link"
              href="https://www.near.university"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn NEAR
            </a>
          </div>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
