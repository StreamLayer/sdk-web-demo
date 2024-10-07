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
`

export const AppContainer = styled.div`
    height: calc(100% - 40px);
    display: flex;
`

export const Overlay = styled.div`
    position: absolute;
    bottom: 70px;
    left: 40px;
    z-index: 11;
    background: transparent;
    flex-shrink: 0;
    max-width: 294px;
    max-height: min(369px, calc(100dvh - 90px));
    display: flex;
    border-radius: 24px;
    border: 0.5px solid var(--Overlay-Stroke, rgba(255, 255, 255, 0.40));

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
    max-width: 300px;
`

export const NavBar = styled.nav`
    position: sticky;
    top: 0;
    background: #fff;
    height: 40px;
    width: 100%;
    padding: 8px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`

export const Logo = styled.img`
    height: 100%;
`

export const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const icons = {
    'side-panel': 'https://cdn.streamlayer.io/sdk-web-demo/side-panel.png',
    'l-bar': 'https://cdn.streamlayer.io/sdk-web-demo/l-bar.png',
    'overlay': 'https://cdn.streamlayer.io/sdk-web-demo/overlay.png'
}

const activeIcons = {
    'side-panel': 'https://cdn.streamlayer.io/sdk-web-demo/side-panel-active.png',
    'l-bar': 'https://cdn.streamlayer.io/sdk-web-demo/l-bar-active.png',
    'overlay': 'https://cdn.streamlayer.io/sdk-web-demo/overlay-active.png'
}

export const ControlButton = styled.button<{ active: boolean; name: 'side-panel' | 'l-bar' | 'overlay' }>`
    width: 115px;
    height: 100%;
    border: none;
    background: rgb(232, 242, 255);
    color: rgb(29, 123, 255);
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
    font-size: 8px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:before {
        content: '';
        width: 9.444px;
        height: 4.444px;
        display: block;
        background: url(${({ name }) => icons[name]});
        background-size: contain;
    }

    &:hover {
        background: rgb(29, 123, 255);
        color: rgb(232, 242, 255);

        &:before {
            background: url(${({ name }) => activeIcons[name]});
        }
    }

    ${({ active,name }) => active && `
        background: rgb(29, 123, 255);
        color: rgb(232, 242, 255);

        &:before {
            background: url(${activeIcons[name]});
        }
    `}
`

