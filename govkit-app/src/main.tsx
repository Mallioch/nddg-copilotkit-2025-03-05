import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CopilotKit } from "@copilotkit/react-core"; 
import { ExpendituresProvider } from './lib/hooks/use-texas-expenditures.tsx';
import { BrowserRouter, Routes, Route } from "react-router";

import TopNav from './TopNav.tsx';
import App from './App.tsx'
import BasicReact from './BasicReact.tsx';
import ChatUI from './ChatUI.tsx';
import SidebarUI from './SidebarUI.tsx';
import PopupUI from './PopupUI.tsx';
import Ollama from './Ollama.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
      <ExpendituresProvider>
        <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/basic-react" element={<BasicReact />} />
          <Route path="/popup-ui" element={<PopupUI />} />
          <Route path="/sidebar-ui" element={<SidebarUI />} />
          <Route path="/chat-ui" element={<ChatUI />} />
          <Route path="/ollama" element={<Ollama />} />
        </Routes>
        </BrowserRouter>
      </ExpendituresProvider>
    </CopilotKit>
  </StrictMode>
)
