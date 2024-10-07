import styled from '@emotion/styled'

export const Container = styled.div`
    width: 100dvw;
    height: 100dvh;
    background: rgba(0, 22, 43, 0.90);
`

export const Video = styled.video`
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
`

export const VideoContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    justify-content: center;
    width: 100%;
`

export const AppContainer = styled.div`
    height: calc(100% - 40px);
    display: flex;
`

export const Overlay = styled.div`
    position: absolute;
    bottom: 52px;
    left: 40px;
    z-index: 11;
    background: transparent;
    flex-shrink: 0;
    max-width: 418px;
    max-height: min(470px, calc(100dvh - 90px));
    display: flex;
    border-radius: 24px;
    border: 0.5px solid rgba(255, 255, 255, 0.40);
    overflow: hidden;

    background: var(--Overlay-Material, linear-gradient(0deg, rgba(10, 14, 19, 0.20) 0%, rgba(10, 14, 19, 0.20) 100%), rgba(128, 128, 128, 0.30));
    background-blend-mode: normal, luminosity;
    /* Overlay Blur */
    backdrop-filter: blur(50px);

    > div {
        max-width: 100%;
    }
`

export const Banner = styled.div`
    height: 170px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SideBar = styled.div`
    max-width: 450px;
    border-left: 1px solid rgba(255, 255, 255, 0.20);
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
`

export const NavBar = styled.nav`
    position: sticky;
    top: 0;
    background: #fff;
    height: 40px;
    width: 100%;
    padding: 6px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled.img`
    height: 20px;
`

export const LinkToStudio = styled.a`
    text-decoration: none;
    color: #1D7BFF;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: -0.32px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    height: 100%;

    &:hover, &:visited, &:focus {
        text-decoration: none;
        color: #1D7BFF;
    }
`;

export const LinkToStudioLogo = styled.img`
    height: 100%;
    max-height: 100%;
`;

export const Controls = styled.div`
    display: flex;
    align-items: center;
    border-radius: 50px;
    background: rgba(29, 123, 255, 0.10);
`

export const ControlButton = styled.button<{ active: boolean }>`
    height: 100%;
    border: none;
    color: #1D7BFF;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
    font-weight: 500;
    font-size: 14px;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 28px;
    letter-spacing: -0.32px;
    border-radius: 50px;
    background-color: transparent;

    ${({ active }) => !active && `
        &:hover {
            opacity: 0.5;
        }
    `}

    &:focus {
        outline: none;
    }

    ${({ active }) => active && `
        background: linear-gradient(99deg, rgba(255, 255, 255, 0.00) 3.5%, rgba(255, 255, 255, 0.75) 35.2%, rgba(255, 255, 255, 0.90) 48.49%, rgba(255, 255, 255, 0.75) 66.48%, rgba(255, 255, 255, 0.00) 93.48%), #1D7BFF;
        background-blend-mode: soft-light, normal;
        color: #fff;
        cursor: default;
    `}
`

