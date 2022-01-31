import React from "react";
import reactLogo from "./react-logo.svg";
import nearLogo from "./near-logo.svg";
import { wallet } from "../../near";
import pkg from "../../../package.json";
import styles from "./Nav.module.css";

function signIn() {
  wallet.requestSignIn({
    contractId: process.env.REACT_APP_CONTRACT_NAME,
    // pass methodNames to request access to only these
    // (empty array means requesting access to all)
    methodNames: [],
  });
}

function signOut() {
  wallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
}

export function Nav() {
  const currentUser = wallet.getAccountId();
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>
        <img src={reactLogo} alt="React" /> <img src={nearLogo} alt="NEAR" />{" "}
        {pkg.name}
      </h1>
      <span>
        {currentUser ? (
          <>
            {currentUser} <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </span>
    </nav>
  );
}
