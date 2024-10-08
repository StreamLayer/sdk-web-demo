import styled from '@emotion/styled'

const breakpoints = (value: string) => `
    @media only screen and (max-width: 1024px) {
        ${value}
    }

    @media only screen and (max-width: 1366px) and (orientation: landscape) {
        ${value}
    }
`

export const Container = styled.div`
    width: 100dvw;
    height: 100dvh;
    background: rgba(0, 22, 43, 0.90);
`

export const Video = styled.video`
    object-fit: contain;
    width: 100%;
    aspect-ratio: 16 / 9;

    ${breakpoints(`
        max-width: 100dvw;
        max-height: 100dvh;
    `)}
`

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 16 / 9;

    ${breakpoints(`
        position: static;
    `)}
`

export const AppContainer = styled.div`
    height: calc(100% - var(--nav-bar-height));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Overlay = styled.div`
    position: absolute;
    bottom: 41px;
    left: 56px;
    z-index: 11;
    background: transparent;
    flex-shrink: 0;
    max-width: 450px;
    max-height: min(640px, 100%);
    display: flex;
    border-radius: 24px;
    overflow: hidden;

    > div {
        max-width: 100%;
    }

    ${breakpoints(`
        max-width: 300px;
        max-height: min(377px, calc(100dvh - 16px));
        left: 16px;
        bottom: 8px;
    `)}
`

export const Banner = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 17px;
    padding-bottom: 17px;

    > div {
        width: 100%;
        height: 100%;

        img {
            display: block;
            height: 100% !important;
            margin: auto;
        }
    }
`

export const SideBar = styled.div`
    max-width: 450px;
    height: 100%;
    background: rgba(0, 22, 43, 0.90);
    border-left: 1px solid rgba(255, 255, 255, 0.20);
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);

    ${breakpoints(`
        max-width: 300px;
    `)}
`

export const NavBarContainer = styled.nav<{ mobile?: boolean }>`
    position: sticky;
    top: 0;
    background: #fff;
    height: var(--nav-bar-height);
    width: 100%;
    padding: 6px 20px;
    box-sizing: border-box;
    display: ${({ mobile }) => mobile ? 'none' : 'flex'};
    justify-content: space-between;
    align-items: center;
    z-index: 10;

    ${breakpoints(`
        position: absolute;
        height: 40px;
    `)}

    ${({ mobile }) => breakpoints(mobile ? `display: flex;` : `display: none;`)}
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


export const ShowMenuBtn = styled.button`
    border-radius: 48px;
    background: rgba(0, 0, 0, 0.40);
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-family: 'SF Pro Text', Arial, Helvetica, sans-serif;

    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
`