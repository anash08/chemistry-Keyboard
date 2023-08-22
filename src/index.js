import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./components/styles/main.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use createRoot from react-dom/client
root.render(<App />);

serviceWorker.unregister();
