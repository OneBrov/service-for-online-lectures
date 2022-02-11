import React from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { MainLayout } from '../components/MainLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RoomPage } from '../pages/RoomPage'
import { RoomsListPage } from '../pages/RoomsListPage'


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={'home'} />} />
          <Route path="home" element={<HomePage />} />
          <Route path="rooms" element={ <RoomsListPage /> } />
        </Route>
        <Route path="rooms/:roomId" element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
