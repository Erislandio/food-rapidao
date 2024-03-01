'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"

interface IStoreActionsContextProvider {
  openSideBar: boolean
  openMinicart: boolean
  toggleSideBar: () => void
  toggleMiniCart: () => void

}

const StoreActionsContextProvider = createContext<IStoreActionsContextProvider>({
  openMinicart: false,
  openSideBar: false,
  toggleMiniCart: () => null,
  toggleSideBar: () => null
})

export const StoreActionsContext = ({ children }: { children: React.ReactNode }) => {

  const [isOpenSideBar, setOpenSideBar] = useState(false)
  const [isOpenMinicart, setOpenMinicart] = useState(false)

  const toggleMiniCart = useCallback(() => setOpenMinicart(!isOpenMinicart), [isOpenMinicart])
  const toggleSideBar = useCallback(() => setOpenSideBar(!isOpenSideBar), [isOpenSideBar])

  useEffect(() => {
    if (isOpenSideBar || isOpenMinicart) {
      document.body.classList.add('overflow-hidden')
      return
    }

    document.body.classList.remove('overflow-hidden')

  }, [isOpenMinicart, isOpenSideBar, toggleMiniCart, toggleSideBar])


  return <StoreActionsContextProvider.Provider value={{
    toggleMiniCart,
    toggleSideBar,
    openMinicart: isOpenMinicart,
    openSideBar: isOpenSideBar
  }}>{children}</StoreActionsContextProvider.Provider>
}

export const useStoreActions = () => {
  const context = useContext(StoreActionsContextProvider)

  if (!context) {
    throw new Error('StoreActionsContextProvider')
  }

  return context
}