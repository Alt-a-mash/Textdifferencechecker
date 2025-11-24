// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
