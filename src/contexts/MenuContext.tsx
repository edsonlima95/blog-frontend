import { createContext, useState } from "react";

type MenuProvider = {
    children: React.ReactNode
}

type MenuContext = {
    isOpen: boolean,
    menuToggle: () => void,
}

export const MenuContext = createContext<MenuContext>({} as MenuContext)

export function MenuProvider({ children }: MenuProvider) {
    
    const [isOpen, setOpen] = useState(false)

    function menuToggle() {
        setOpen(!isOpen)
    }

    return (
        <MenuContext.Provider value={{ isOpen, menuToggle }}>
            {children}
        </MenuContext.Provider>
    )

}