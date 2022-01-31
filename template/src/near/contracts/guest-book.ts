import * as naj from "near-api-js";
import { Gas, NEAR } from "near-units";
import { Buffer } from "buffer";

/**
 * The data structure returned by `getMessages`
 */
export interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

interface GuestBook extends naj.Contract {
  /**
   * Get most recent 10 messages
   */
  getMessages(): Promise<Message[]>;

  /**
   * Add a new message to the guest book.
   *
   * Whoever is signed in (`wallet.account()`) will be set as the `sender`
   *
   * If an `attachedDeposit` of at least 0.01 NEAR is included, the message will
   * be set as `premium`.
   *
   * @param options.gas Max amount of gas that method call can use; default is 30 Tgas (roughly 30ms of processing time), max allowed is 300 Tgas; can include with `Gas.parse('150 Tgas')
   * @param options.attachedDeposit Amount of NEAR (in yoctoNEAR) to send together with the call, can include with `NEAR.parse('0.1')`
   * @param options.walletMeta Metadata to send the NEAR Wallet if using it to sign transactions.
   * @param options.walletCallbackUrl Callback url to send the NEAR Wallet if using it to sign transactions.
   * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io)
   */
  addMessage(options: {
    args: {
      text: string;
    };
    gas?: Gas;
    attachedDeposit?: NEAR;
    walletMeta?: string;
    walletCallbackUrl?: string;
    stringify?: (input: any) => Buffer;
  }): Promise<void>;
}

/**
 * Initialize a fully-typed Contract object wrapping the GuestBook contract.
 *
 * @param account An `Account` object from near-api-js. Usually `(new WalletConnection(...)).account()`
 * @param contractName The account ID of the contract, such as `guestbook.testnet` or, on mainnet, `guestbook.near`.
 */
export function init(account: naj.Account, contractName: string): GuestBook {
  return new naj.Contract(account, contractName, {
    viewMethods: ["getMessages"],
    changeMethods: ["addMessage"],
  }) as GuestBook;
}
