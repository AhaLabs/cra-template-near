import React from "react";
import { Nav } from "../Nav";

export function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <h1>Welcome</h1>
        <p>Edit files and save to reload. Some interesting files:</p>
        <ul>
          <li>
            <code>.env</code>
          </li>
          <li>
            <code>src/utils/near.ts</code>
          </li>
          <li>
            <code>src/components/Nav/Nav.tsx</code>
          </li>
          <li>
            <code>src/components/App/App.tsx</code>
          </li>
        </ul>
        <p>
          Note that this site does not currently do anything with the contract
          other than sign someone in. For an example of using the{" "}
          <code>guest-book.testnet</code> contract, see{" "}
          <a
            href="https://github.com/near-examples/guest-book"
            target="_blank"
            rel="noopener noreferrer"
          >
            near-examples/guest-book
          </a>
          . You may also want to learn more about{" "}
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://create-react-app.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            create-react-app
          </a>
          , and{" "}
          <a
            href="https://www.near.university"
            target="_blank"
            rel="noopener noreferrer"
          >
            NEAR
          </a>
          .
        </p>
      </main>
    </>
  );
}
