import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/useApi";


createRoot(document.getElementById("root")!).render(
<QueryClientProvider client={queryClient}>

<App 
/>
</QueryClientProvider>
);
