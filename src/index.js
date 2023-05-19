import { Web3Provider } from "@ethersproject/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import App from "App";
import "index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "reportWebVitals";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137],
});

// import { InjectedConnector } from '@web3-react/injected-connector'

// const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });
// const connectors = { MetaMask };
const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 12000;
  return library;
}

// replace console.* for disable log on production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

window.Buffer = require("buffer/").Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Web3ReactProvider
    // connectors={{ some: () => {} }}
    // connectors={{ walletConnect: walletconnect }}
    getLibrary={getLibrary}
  >
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Web3ReactProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
