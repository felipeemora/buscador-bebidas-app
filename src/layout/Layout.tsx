import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

// Ruta principal que va a envolver el resto de páginas,
// para renderizar componentes comnúnes
export const Layout = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet />
      </main>
    </>
  )
}
