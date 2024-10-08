import { ControlButton, Controls, LinkToStudio, Logo, NavBarContainer, ShowMenuBtn } from "./styles"
import { IMode, STUDIO_LINK } from './App'

export const NavBar: React.FC<{ mode: IMode, toggleMode: (e: React.MouseEvent<HTMLDivElement>) => void }> = ({ mode, toggleMode }) => {
    return (
        <NavBarContainer className="NavBarContainer">
            <Logo src="https://cdn.streamlayer.io/sdk-web-demo/sl-logo.png"/>
            <Controls onClick={toggleMode}>
                <ControlButton active={mode==='side-panel'} name='side-panel'>Side Panel</ControlButton>
                <ControlButton active={mode==='l-bar'} name='l-bar'>L-Bar</ControlButton>
                <ControlButton active={mode==='overlay'} name='overlay'>Overlay</ControlButton>
            </Controls>
            <LinkToStudio href={STUDIO_LINK} target='_blank'>
                Open Studio
            </LinkToStudio>
            <ShowMenuBtn className="ShowMenuBtn">Show menu</ShowMenuBtn>
        </NavBarContainer>
    )
}