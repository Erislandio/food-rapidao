'use client'

import { useStoreActions } from "@/app/context/StoreActionsContext"

export const SideBar = () => {

  const { openSideBar, toggleSideBar } = useStoreActions()

  console.log(openSideBar)

  return <section onClick={toggleSideBar} className={`fixed left-0 top-0 w-full h-full bg-black z-40 bg-opacity-65 ${openSideBar ? 'left-0' : '-left-full'}`}>
    <aside className={`transition-all fixed top-0 left-0 w-80 max-w-80 bg-white shadow-xl h-full z-50 ${openSideBar ? 'left-0' : '-left-80'}`}>
      <h1>teste</h1>
    </aside>
  </section>
}