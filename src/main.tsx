import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '/src/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuestionPage from './pages/QuestionPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ShopPage from './pages/ShopPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/question/:category' element={<QuestionPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/shop' element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
