"use client";
// use client permanece
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Toaster } from "sonner";


const client = new QueryClient();
const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#000000FF" } },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right"/>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
  );
}