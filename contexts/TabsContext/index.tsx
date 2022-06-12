import { Dispatch, SetStateAction } from "react";
import { createContext, ReactNode, useState } from "react";
import type { Item } from "types/Item";

interface ContextProps {
    setActiveItem: Dispatch<SetStateAction<Item['title'] | undefined>>
    activeItem: Item['title'] | undefined;
}

export const TabsContext = createContext<ContextProps>({
    setActiveItem: () => {},
    activeItem: undefined
});

const TabsContextProvider = ({ children }: { children: ReactNode }) => {
    const [activeItem, setActiveItem] = useState<Item['title'] | undefined>(undefined);

    return (
        <TabsContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </TabsContext.Provider>
    )
}

export default TabsContextProvider