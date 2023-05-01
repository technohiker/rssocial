import { ReactElement, useState } from "react"

export function HamburgerButton({buttons}: IHamburgerButtonProps){
    const [isVisible, setIsVisible] = useState(false)
    const toggleButtons = () => {
        setIsVisible(!isVisible)
    }

    return(<button onClick={toggleButtons} className="hamburger-button">
        { isVisible ?  buttons.map((button) => (
             button
        )
        ): null}
    </button>)
}
interface IHamburgerButtonProps{
    buttons: ReactElement<React.JSXElementConstructor<HTMLButtonElement>>[] //React.ButtonHTMLAttributes<HTMLButtonElement>[]
}