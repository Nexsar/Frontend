import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";

/* check these imports: ref: https://wagmi.sh/react/guides/connect-wallet */
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";

import { store } from "./store/store.js";
import { Provider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </WagmiProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
