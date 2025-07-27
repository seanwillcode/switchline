import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import App from "./App.tsx";

import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
