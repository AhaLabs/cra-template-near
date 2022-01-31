import * as naj from "near-api-js";
import { Gas, NEAR } from "near-units";
import { Buffer } from "buffer";
import { call, view, wallet } from "../utils/near";

/**
 * The contract wrapped by this file.
 * (This is the contract used in https://github.com/near-examples/guest-book)
 *
 * We *could* use `process.env.REACT_APP_CONTRACT_NAME` in this file, since the
 * template started with that environment variable set to `guest-book.testnet`.
 *
 * BUT, the idea of files in `src/contracts` is that they each wrap a specific
 * contract. If the env var `REACT_APP_CONTRACT_NAME` changes, this file is
 * still a wrapper around the guest book contract.
 */
export const CONTRACT_NAME = "guest-book.testnet";

/**
 * This is a Contract object instantiated using near-api-js.
 *
 * But this does not provide any TypeScript types! Using this approach makes it
 * hard for you and your collaborators to tell what arguments you can pass to
 * `getMessages` and `addMessage`.
 *
 * See other exports for a fully-typed approach instead.
 */
export const Untyped = new naj.Contract(wallet.account(), CONTRACT_NAME, {
  viewMethods: ["getMessages"],
  changeMethods: ["addMessage"],
});

/**
 * The data structure returned by `getMessages`
 */
export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

/**
 * Get most recent 10 messages
 */
export async function getMessages(): Promise<Message[]> {
  return view(CONTRACT_NAME, "getMessages");
}

/**
 * Add a new message to the guest book.
 *
 * Whoever is signed in (`wallet.account()`) will be set as the `sender`
 *
 * If an `attachedDeposit` of at least 0.01 NEAR is included, the message will
 * be set as `premium`.
 */
export async function addMessage(
  args: {
    /** The text of the message */
    text: string;
  },
  options?: {
    /** Max amount of gas that method call can use; default is 30 Tgas (roughly 30ms of processing time), max allowed is 300 Tgas; can include with `Gas.parse('150 Tgas')` */
    gas?: Gas;
    /** Send at least 0.01 NEAR (`NEAR.parse('0.1')`) for the message to be considered "premium" */
    attachedDeposit?: NEAR;
    /** Metadata to send the NEAR Wallet if using it to sign transactions.  */
    walletMeta?: string;
    /** Callback url to send the NEAR Wallet if using it to sign transactions. */
    walletCallbackUrl?: string;
    /** Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io) */
    stringify?: (input: any) => Buffer;
  }
): Promise<void> {
  return call(CONTRACT_NAME, "addMessage", args, options);
}
