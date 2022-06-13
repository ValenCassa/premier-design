import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface CommandContext {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandContext = createContext<CommandContext>({
    isOpen: false,
    setIsOpen: () => { }
})

const CommandContextProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const body = document.body

        if (body) {
            if (isOpen) {
                body.style.overflow = 'hidden'
            } else {
                body.style.overflow = 'auto'
            }
        }
    }, [isOpen])

    return (
        <CommandContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </CommandContext.Provider>
    )
}

export default CommandContextProvider