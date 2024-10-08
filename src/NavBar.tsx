import { ControlButton, Controls, LinkToStudio, Logo, NavBarContainer, ShowMenuBtn } from "./styles"
import { IMode, STUDIO_LINK } from './App'
import { useEffect, useRef, useState } from "react"

export const NavBar: React.FC<{ mobile?: boolean; mode: IMode, toggleMode: (e: React.MouseEvent<HTMLDivElement>) => void }> = ({ mobile, mode, toggleMode }) => {
    const [hidden, setHidden] = useState(false)
    const navbarRef = useRef<HTMLElement | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        const start = () => {
            timeoutRef.current = setTimeout(() => setHidden(true), 5000)
        }
        const stop = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }

        start()

        if (mobile) {
            navbarRef.current?.addEventListener('touchstart', stop)
            navbarRef.current?.addEventListener('touchend', start)
            navbarRef.current?.addEventListener('mouseenter', stop)
            navbarRef.current?.addEventListener('mouseout', start)
        }

        return () => {
            navbarRef.current?.removeEventListener('touchstart', stop)
            navbarRef.current?.removeEventListener('touchend', start)
            navbarRef.current?.removeEventListener('mouseenter', stop)
            navbarRef.current?.removeEventListener('mouseout', start)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [mobile])

    if (hidden && mobile) {
        return <ShowMenuBtn onClick={() => setHidden(false)}>Show menu</ShowMenuBtn>
    }

    return (
        <NavBarContainer ref={navbarRef} mobile={mobile}>
            <Logo src="https://cdn.streamlayer.io/sdk-web-demo/sl-logo.png"/>
            <Controls onClick={toggleMode}>
                <ControlButton active={mode==='side-panel'} name='side-panel'>Side Panel</ControlButton>
                <ControlButton active={mode==='l-bar'} name='l-bar'>L-Bar</ControlButton>
                <ControlButton active={mode==='overlay'} name='overlay'>Overlay</ControlButton>
            </Controls>
            <LinkToStudio href={STUDIO_LINK} target='_blank'>
            Open Studio
            </LinkToStudio>
        </NavBarContainer>
    )
}