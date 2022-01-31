import * as naj from "near-api-js";
import { wallet } from "..";
import * as GB from "./guest-book";

/**
 * This is a Contract object instantiated using near-api-js.
 *
 * But this does not provide any TypeScript types! Using this approach makes it
 * hard for you and your collaborators to tell what arguments you can pass to
 * `getMessages` and `addMessage`.
 *
 * See `GuestBook` export for a fully-typed approach instead.
 */
export const GuestBookUntyped = naj.Contract(
  wallet.account(),
  process.env.REACT_APP_CONTRACT_NAME,
  {
    viewMethods: ["getMessages"],
    changeMethods: ["addMessage"],
  }
);

/**
 * Fully-typed interface wrapping the GuestBook contract.
 */
export const GuestBook = GB.init(
  wallet.account(),
  process.env.REACT_APP_CONTRACT_NAME!
);
