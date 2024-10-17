import styled from '@emotion/styled'
import { useCallback, useEffect, useRef } from 'react'
import { breakpoints, breakpointsPortrait } from './styles'

const IS_DEBUG = process.env.SL_DEBUG === 'true'

const Container = styled.div`
  ${IS_DEBUG && 'background: green;'}
  width: 100%;
  height: 100%;

  display: flex;

  --banner-height: 155px;
  --banner-padding: 17px;
  --sidebar-width: 450px;
  --video-player-position: absolute;
  --transition-duration: .5s;

  --adv-show-in-animation: show-in .3s ease forwards var(--transition-duration);

  @keyframes show-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  ${breakpoints(`
    --banner-height: 95px;
    --banner-padding: 10px;
    --sidebar-width: 300px;
  `)}

  ${breakpointsPortrait(`
    flex-direction: column;
    height: auto;

    --video-player-position: static;
    --banner-height: 0px;
    --banner-padding: 0px;
    --sidebar-width: 0px;
  `)}
`

const ContentContainer = styled.div`
  ${IS_DEBUG && 'background: blue;'}
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  transition: width .5s ease;
`

const Sidebar = styled.div`
  ${IS_DEBUG && 'background: orange;'}

  transition: width .5s ease;

  ${breakpointsPortrait(`
    display: none;
  `)}
`

const SideBarOverlay = styled.div`
  ${IS_DEBUG && 'background: purple;'}
  display: none;

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

const Banner = styled.div`
  ${IS_DEBUG && 'background: yellow;'}
  width: 100%;

  transition: height .5s ease;
`

const VideoContainer = styled.div`
  ${IS_DEBUG && 'background: red;'}
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: height .5s ease;
`

const VideoBox = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
`

const VideoPlayer = styled.div`
  ${IS_DEBUG && 'background: black;'}
  position: var(--video-player-position);
  inset: 0;
`

const Overlay = styled.div`
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

const Notification = styled.div`
  position: absolute;
  bottom: 20px;
  left: 56px;

  ${IS_DEBUG && 'background: brown;'}

  transform: scale(1.5);
  transform-origin: left bottom;

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

type SDKLayoutProps = {
  mode: 'side-panel' | 'l-bar' | 'overlay' | 'off'
  sidebar?: React.ReactNode
  banner?: React.ReactNode
  video?: React.ReactNode
  overlay?: React.ReactNode
  notification?: React.ReactNode
}

export const SDKLayout: React.FC<SDKLayoutProps> = ({ mode, sidebar, overlay, notification, banner, video }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoBoxRef = useRef<HTMLDivElement>(null)

  const updateAspectRatio = useCallback(() => {
    const videoBoxElement = videoBoxRef.current
    const videoContainerElement = videoContainerRef.current

    if (!videoBoxElement || !videoContainerElement) {
      return
    }

    const { width, height } = videoBoxElement.getBoundingClientRect()
    const { width: pwidth, height: pheight } = videoContainerElement.getBoundingClientRect()

    if (width > pwidth || height > pheight) {
      if (videoBoxElement.style.width === '100%') {
        videoBoxElement.style.height = '100%'
        videoBoxElement.style.width = 'auto'
      } else {
        videoBoxElement.style.width = '100%'
        videoBoxElement.style.height = 'auto'
      }
    }
  }, [])

  useEffect(() => {
    if (videoContainerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            updateAspectRatio()
          }
        }
      });

      resizeObserver.observe(videoContainerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  useEffect(updateAspectRatio)

  return (
    <Container className="Container">
      <ContentContainer className="ContentContainer" style={{
        width: mode !== 'off' ? 'calc(100% - var(--sidebar-width))' : '100%',
      }}>
        <VideoContainer className="VideoContainer" ref={videoContainerRef} style={{
          height: mode === 'l-bar' ? 'calc(100% - var(--banner-height))' : '100%',
        }}>
          <VideoBox ref={videoBoxRef} className="VideoBox">
            <VideoPlayer className="VideoPlayer">{video}</VideoPlayer>
          </VideoBox>
        </VideoContainer>
        <Banner className="Banner" style={{
          height: mode === 'l-bar' ? 'var(--banner-height)' : '0px',
          padding: mode === 'l-bar' ? 'var(--banner-padding)' : '0px',
        }}>
          {mode === 'l-bar' && banner}
        </Banner>
        {notification && <Notification>{notification}</Notification>}
        {mode === 'overlay' && <Overlay>{overlay}</Overlay>}
      </ContentContainer>
      <Sidebar style={{ width: mode === 'l-bar' || mode === 'side-panel' ? 'var(--sidebar-width)' : '0px' }} className="Sidebar">
        {(mode === 'l-bar' || mode === 'side-panel') && sidebar}
      </Sidebar>
      {mode !== 'off' && <SideBarOverlay className="Demo-SideBarOverlay">
        {overlay}
      </SideBarOverlay>}
    </Container>
  )
}
