import React from "react";
import { Nav } from "../Nav";

export function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <h1>Welcome</h1>
        <ul>
          <li>
            Edit <code>src/components/App.tsx</code> and save to reload.
          </li>
          <li>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </li>
          <li>
            <a
              className="App-link"
              href="https://www.near.university"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn NEAR
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
