import styled from '@emotion/styled'

const breakpoints = (value: string) => `
    @media only screen and (max-width: 1024px) {
        ${value}
    }

    @media only screen and (max-width: 1366px) and (orientation: landscape) {
        ${value}
    }
`

const breakpointsPortrait = (value: string) => `
    @media only screen and (max-width: 1024px) and (orientation: portrait) {
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
        max-height: none;
    `)}
`

export const AppContainer = styled.div`
    height: calc(100% - var(--nav-bar-height));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${breakpointsPortrait(`
        flex-direction: column;
        justify-content: flex-start;
    `)}
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
    width: 100%;

    .PromoOverlayContainer {
        animation: grow-in-overlay .3s ease forwards;
        transform-origin: bottom;

        @keyframes grow-in-overlay {
            from {
                transform: scaleY(0);
            }
            to {
                transform: scaleY(1);
            }
        }

        > div {
            opacity: 0;
            animation: show-in-overlay .3s ease forwards .3s;

            @keyframes show-in-overlay {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        }
    }

    > div {
        max-width: 100%;
        width: 100%;
    }

    .PromoOverlay {
        max-height: 640px;

        ${breakpoints(`
            max-height: min(377px, calc(100dvh - 16px));
        `)}
    }

    ${breakpoints(`
        max-width: 300px;
        max-height: min(377px, calc(100dvh - 16px));
        left: 16px;
        bottom: 8px;
    `)}

    ${breakpointsPortrait(`
        display: none;
    `)}
`

export const Banner = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0px;
    padding-bottom: 0px;

    animation: grow-in-padding .3s ease forwards .6s;

    @keyframes grow-in-padding {
        from {
            padding-top: 0px;
            padding-bottom: 0px;
        }
        to {
            padding-top: 17px;
            padding-bottom: 17px;
        }
    }

    > div {
        height: 0px;
        overflow: hidden;
        width: 100%;
        animation: grow-in .3s ease forwards .6s;

        @keyframes grow-in {
            from {
                height: 0px;
            }
            to {
                height: 120px;
            }
        }

        a {
            display: block;
            height: 100% !important;
            margin: auto;
            opacity: 0;

            animation: show-in .3s ease forwards .9s;

            @keyframes show-in {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        }
    }

    ${breakpoints(`
        padding: 0;
        min-height: 95px;
        height: 100%;

        > div {
            height: 75px;
        }
    `)}

    ${breakpointsPortrait(`
        display: none;
    `)}
`

export const SideBar = styled.div`
    max-width: 0px;
    overflow: hidden;
    height: 100%;
    background: rgba(0, 22, 43, 0.90);
    border-left: 1px solid rgba(255, 255, 255, 0.20);
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);

    animation: grow-in-sidebar .6s ease forwards;

    @keyframes grow-in-sidebar {
        from {
            max-width: 0px;
        }
        to {
            max-width: 450px;
        }
    }

    > div {
        opacity: 0;
        animation: show-in-sidebar .3s ease forwards .9s;

        @keyframes show-in-sidebar {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }

    ${breakpoints(`
        max-width: 300px;

        @keyframes grow-in-sidebar {
            from {
                max-width: 0px;
            }
            to {
                max-width: 300px;
            }
        }
    `)}

    ${breakpointsPortrait(`
        display: none;
    `)}
`

export const SideBarOverlay = styled(SideBar)`
    display: none;
    border: none;
    box-shadow: none;

    ${breakpointsPortrait(`
        width: 100%;
        max-width: 450px;
        display: block;

        @keyframes grow-in-sidebar {
            from {
                max-width: 0px;
            }
            to {
                max-width: 450px;
            }
        }
    `)}
`

export const NavBarContainer = styled.nav<{ mobile?: boolean }>`
    position: sticky;
    top: -40px;
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

    ${breakpointsPortrait(`
        position: static;
        top: 0;
    `)}

    &:hover {
        top: 0;

        .ShowMenuBtn {
            display: none;
        }
    }

`

export const ShowMenuBtn = styled.button`
    border-radius: 48px;
    background: rgba(0, 0, 0, 0.40);
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    font-family: 'SF Pro Text', Arial, Helvetica, sans-serif;

    position: absolute;
    top: 46px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -50px;
        right: -50px;
    }

    display: none;

    ${breakpoints(`
        display: block;
    `)}

    ${breakpointsPortrait(`
        display: none;
    `)}
`

export const Logo = styled.img`
    height: 20px;

    ${breakpointsPortrait(`
        width: 20px;
        object-fit: cover;
        object-position: left;
    `)}
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

    span {
        ${breakpointsPortrait(`
            display: none;
        `)}
    }
`;

export const Controls = styled.div`
    display: flex;
    align-items: center;
    border-radius: 50px;
    background: rgba(29, 123, 255, 0.10);

    ${breakpointsPortrait(`
        display: none;
    `)}
`

export const ControlsSelectorContainer = styled.div`
    position: relative;

    label {
        display: block;
        position: absolute;
        top: calc(50% - 3px);
        right: 16px;
        width: 10px;
        height: 6px;
        background-image: url(https://cdn.streamlayer.io/sdk-web-demo/select-arr.png);
        background-size: contain;
        background-repeat: no-repeat;
    }
`

export const ControlsSelector = styled.select`
    display: none;
    border: none;
    font-weight: 500;
    font-size: 14px;
    padding: 0px;
    padding-left: 16px;
    padding-right: 34px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 28px;
    letter-spacing: -0.32px;
    border-radius: 50px;
    color: #fff;
    appearance: none;
    outline: none !important;
    position: relative;
    text-align: center;

    &::-ms-expand {
        display: none;
    }

    ${breakpointsPortrait(`
        display: flex;
    `)}

    background-blend-mode: soft-light, normal;
    background: linear-gradient(99deg, rgba(255, 255, 255, 0.00) 3.5%, rgba(255, 255, 255, 0.75) 35.2%, rgba(255, 255, 255, 0.90) 48.49%, rgba(255, 255, 255, 0.75) 66.48%, rgba(255, 255, 255, 0.00) 93.48%), #1D7BFF;
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

export const Notification = styled.div`
    position: absolute;
    bottom: 20px;
    left: 56px;

    transform: scale(1.5);
    transform-origin: left bottom;
    opacity: 0;
    animation: show-notification-in .3s ease forwards 1s;

    @keyframes show-notification-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    ${breakpoints(`
        transform: scale(1);
        left: 32px;
        bottom: -4px;
    `)}

    ${breakpointsPortrait(`
        position: static;
        margin-top: -35px;
        margin-left: 8px;
        margin-right: 8px;
    `)}
`