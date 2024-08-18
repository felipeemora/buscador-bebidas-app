import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"

// Ruta principal que va a envolver el resto de páginas,
// para renderizar componentes comnúnes
export const Layout = () => {

  const loadFromStorage = useAppStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])
  
  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  )
}
