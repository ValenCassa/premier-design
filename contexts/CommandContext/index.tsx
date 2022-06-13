import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

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

    return (
        <CommandContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </CommandContext.Provider>
    )
}

export default CommandContextProvider