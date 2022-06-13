import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

export const useOutsideRef = (ref: RefObject<HTMLDivElement>, setActive: Dispatch<SetStateAction<boolean>>) => { 
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [ref, setActive])
}