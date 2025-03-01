import { BrowserRouter, Route, Routes } from 'react-router';

import { Home } from '@/pages/home';
import NotFound from '@/pages/NotFound';

import { AiChat } from './pages/ai-chat/AIChat';
import { AIChatLayout } from './pages/ai-chat/AIChat.layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-chat" element={<AIChatLayout />}>
          <Route index element={<AiChat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
