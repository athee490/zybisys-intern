import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create one Query Client for the entire application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,              // Retry failed requests only once
      staleTime: 1000 * 60,  // Cache stays fresh for 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);