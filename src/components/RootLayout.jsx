import React from 'react'
import Header from './common/Header'
import { Outlet } from 'react-router'
import Footer from './common/Footer'
import Contex from './contex Api/Contex'

export default function RootLayout() {
  return (
    <>
      <Contex>

        <Header />

        < Outlet />

        <Footer />
        
      </Contex>


    </>
  )
}
