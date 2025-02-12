import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import Layout from './Layout.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/home/Home.tsx'
import Login from './routes/Login.tsx'
import About from './routes/About.tsx'
import Packages from './routes/packages/Packages.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='j_travel-react/'>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='packages' element={<Packages />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
