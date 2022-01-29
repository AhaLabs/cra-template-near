import { Gas, NEAR } from "near-units";
import { Buffer } from "buffer";
import { view, wallet } from "../utils/near";

// We *could* use `process.env.REACT_APP_CONTRACT_NAME` in this file, since the
// template started with that environment variable as `guest-book.testnet`.
//
// BUT, the idea of files in `src/contracts` is that they each wrap a specific
// contract. If the env var `REACT_APP_CONTRACT_NAME` changes, this file is
// still a wrapper around the guest book contract.
const CONTRACT = "guest-book.testnet";

/**
 * Fully-typed interface to the guest-book.testnet contract
 * (see https://github.com/near-examples/guest-book)
 *
 * If you're familiar with ABIs in Ethereum: sorry, NEAR doesn't have them! (yet)
 *
 * `naj.Contract` gives you the ability to do this:
 *
 *     export const GuestBook = new naj.Contract(
 *       wallet.account(),
 *       process.env.REACT_APP_CONTRACT_NAME!,
 *       {
 *         viewMethods: ["getMessages"],
 *         changeMethods: ["addMessage"],
 *       }
 *     );
 *
 * But this comes with the drawback that `GuestBook.addMessage` and
 * `GuestBook.getMessages` have no typing. Having good TypeScript types will
 * make it easier to use and collaborate on your code, so below is an
 * alternative way.
 */
interface Message {
  premium: boolean;
  sender: string;
  text: string;
}

export async function getMessages(): Promise<Message[]> {
  return view(CONTRACT, "getMessages");
}

export async function addMessage(
  args: {
    text: string;
  },
  options?: {
    gas?: Gas;
    attachedDeposit?: NEAR;
    walletMeta?: string;
    walletCallbackUrl?: string;
    stringify?: (input: any) => Buffer;
  }
): Promise<void> {
  const currentUser = wallet.account();
  if (!currentUser) {
    throw new Error("You must sign in before you can add a message");
  }
  await currentUser.functionCall({
    contractId: CONTRACT,
    methodName: "addMessage",
    args,
    ...(options ?? {}),
  });
}
