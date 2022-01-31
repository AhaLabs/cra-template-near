import * as naj from "near-api-js";
import { Gas, NEAR } from "near-units";

// TODO: remove pending https://github.com/near/near-api-js/issues/757
import { Buffer } from "buffer";
window.Buffer = Buffer;

/**
 * NEAR Config object
 */
export const near = new naj.Near({
  keyStore: new naj.keyStores.BrowserLocalStorageKeyStore(),
  networkId: process.env.REACT_APP_NEAR_NETWORK!,
  nodeUrl: process.env.REACT_APP_RPC_URL!,
  walletUrl: process.env.REACT_APP_WALLET_URL,
  helperUrl: process.env.REACT_APP_HELPER_URL,

  // TODO: remove `headers` argument pending https://github.com/near/near-api-js/pull/772
  headers: {},
});

/**
 * Interface to NEAR Wallet
 */
export const wallet = new naj.WalletConnection(
  near,

  // TODO: remove this second argument to WalletConnection pending https://github.com/near/near-api-js/pull/772
  process.env.REACT_APP_LOCALSTORAGE_PREFIX!
);

/**
 * Make a view call to a NEAR smart contract.
 * @see {@link https://docs.near.org/docs/develop/front-end/rpc#call-a-contract-function}
 *
 * near-api-js requires instantiating an "account" object, but this is NOT
 * used to sign view functions. This `view` function will instantiate an
 * account object for the provided `contract`, essentially causing it to view
 * itself.
 *
 * @param contract NEAR account where the contract is deployed
 * @param method The view-only method (no state mutations) name on the contract as it is written in the contract code
 * @param args Any arguments to the view contract method, as an object
 * @param options.parse Parse the result of the call. Receives a Buffer (bytes array) and converts it to any object. By default result will be treated as json.
 * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io)
 * @returns {Promise<any>}
 */
export async function view(
  contract: string,
  method: string,
  args: Record<string, any> = {},
  options: {
    parse?: (response: Uint8Array) => any;
    stringify?: (input: any) => Buffer;
  } = {}
): Promise<any> {
  const account = await near.account(contract);
  return account.viewFunction(contract, method, args, options);
}

/**
 * Make a change call to a NEAR smart contract.
 * @see {@link https://docs.near.org/docs/develop/front-end/rpc#call-a-contract-function}
 *
 * The account object accessible at `wallet.account()` will be used to sign this transaction.
 *
 * @param contract NEAR account where the contract is deployed
 * @param method The method name on the contract as it is written in the contract code
 * @param args Any arguments to the method, as an object
 * @param options.gas The default gas amount used by near-api-js is 30Tgas. You can send up to 300Tgas by including `gas: Gas.parse('300 Tgas')`
 * @param options.attachedDeposit
 * @param options.walletMeta
 * @param options.walletCallbackUrl
 * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io)
 * @returns {Promise<any>}
 */
export async function call(
  /** The NEAR account id where the contract is deployed */
  contract: string,
  /** The name of the method to invoke as it is written in the contract code */
  method: string,
  /** Any arguments to the method, as an object */
  args: Record<string, any> = {},
  options?: {
    /** Max amount of gas that method call can use; default is 30 Tgas (roughly 30ms of processing time), max allowed is 300 Tgas; can include with `Gas.parse('150 Tgas')` */
    gas?: Gas;
    /** Amount of NEAR (in yoctoNEAR) to send together with the call, can include with `NEAR.parse('0.1')` */
    attachedDeposit?: NEAR;
    /** Metadata to send the NEAR Wallet if using it to sign transactions.  */
    walletMeta?: string;
    /** Callback url to send the NEAR Wallet if using it to sign transactions. */
    walletCallbackUrl?: string;
    /** Convert input arguments into a bytes array. By default the input is treated as a JSON. This is useful if the contract accepts Borsh (see https://borsh.io) */
    stringify?: (input: any) => Buffer;
  }
): Promise<void> {
  const currentUser = wallet.account();
  if (!currentUser) {
    throw new Error("Must sign in before calling a change method");
  }
  await currentUser.functionCall({
    contractId: contract,
    methodName: method,
    args,
    ...(options ?? {}),
  });
}
