import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export const Header = () => {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const fecthCategories = useAppStore((state) => state.fecthCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  useEffect(() => {
    fecthCategories()
  })
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: [e.target.value]
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes('')) {
      console.log('Todos los campos son obligatorios')
      return;
    }

    // Consultar Resetas
    searchRecipes(searchFilters);
  }


  return (
    <header className={isHome ? 'bg-header bg-center bg-cover bg-no-repeat': 'bg-slate-800' }>
        <div className="mx-auto container px-5 py-16">
          <div className="flex justify-between items-center">
            <img src="logo.svg" alt="logotipo" className="w-32"/>

            <nav className="flex gap-4">
              <NavLink
                to={"/"}
                className={({isActive}) => isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold' }
                >
                  Inicio
                </NavLink>
              <NavLink
                to={"/favoritos"}
                className={({isActive}) => isActive
                  ? 'text-orange-500 uppercase font-bold'
                  : 'text-white uppercase font-bold' }
              >
                Favoritos
              </NavLink>
            </nav>
          </div>

          {
            isHome && (
              <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" action="" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label
                    className="block text-white uppercase font-extrabold text-lg"
                    htmlFor="ingredient">Nombre o ingredientes
                  </label>
                  <input
                    type="text"
                    id="ingredient"
                    name="ingredient"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    placeholder="Nombre o ingrediente. Ej: Vodka, Tequila, Café"
                    onChange={handleChange}
                    value={searchFilters.ingredient}
                  />
                </div>
                <div className="space-y-4">
                  <label
                    className="block text-white uppercase font-extrabold text-lg"
                    htmlFor="category">Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    onChange={handleChange}
                    value={searchFilters.category}
                  >
                    <option value="">-- Seleccione --</option>
                    {
                      categories.drinks.map(category => (
                        <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                      ))
                    }
                  </select>
                </div>

                <input 
                  type="submit"
                  value={'Buscar Recetas'}
                  className="
                    cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full rounded-lg p-2 uppercase"
                />
              </form>
            )
          }
        </div>
    </header>
  )
}
