import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';

const CLIENT = new QueryClient();
CLIENT.setDefaultOptions({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={CLIENT}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
