import * as naj from "near-api-js";

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
 * @param args Any arguments to the view contract method, wrapped in JSON
 * @param options.parse Parse the result of the call. Receives a Buffer (bytes array) and converts it to any object. By default result will be treated as json.
 * @param options.stringify Convert input arguments into a bytes array. By default the input is treated as a JSON.
 * @returns {Promise<any>}
 */
export const view = async (
  contract: string,
  method: string,
  args: Record<string, any> = {},
  options: {
    parse?: (response: Uint8Array) => any;
    stringify?: (input: any) => Buffer;
  } = {}
): Promise<any> => {
  const account = await near.account(contract);
  return account.viewFunction(contract, method, args, options);
};
