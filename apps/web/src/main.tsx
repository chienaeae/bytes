import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage/index.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import Navbar from './components/Navbar.tsx';

// import i18n (needs to be bundled
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Navbar />}>
                            <Route index element={<HomePage />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </I18nextProvider>
    </StrictMode>
);
