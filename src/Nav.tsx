import React from "react";
import { wallet } from "./near";

function Nav() {
  return (
    <button
      onClick={() => wallet.requestSignIn(process.env.REACT_APP_CONTRACT_NAME)}
    >
      Sign In
    </button>
  );
}

export default Nav;
