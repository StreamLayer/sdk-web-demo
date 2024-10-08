import { StreamLayerProvider } from '@streamlayer/react'
import '@streamlayer/react/style.css'
import { AppContainer, Banner, Container, ControlButton, Controls, Logo, LinkToStudio, NavBar, Overlay, SideBar, Video, VideoContainer } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'

const searchParams = new URLSearchParams(window.location.search)

const SDK_KEY = searchParams.get('sdk_key') || process.env.VITE_SDK_KEY || ''
const PRODUCTION = searchParams.get('production') === undefined
  ? process.env.VITE_PRODUCTION === 'true'
  : searchParams.get('production') === 'true'
export const EVENT_ID = searchParams.get('event_id') || process.env.VITE_EVENT_ID || ''

const STUDIO_LINK = PRODUCTION ? `https://studio.streamlayer.io/events/all/id/${EVENT_ID}/moderation` : `https://studio.next.streamlayer.io/events/all/id/${EVENT_ID}/moderation`

export type IMode = 'side-panel' | 'l-bar' | 'overlay'

function App() {
  const [hasPromo, setHasPromo] = useState(false)
  const [mode, setMode] = useState('side-panel')

  const toggleMode = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      setMode(e.target.name)
    }
  }, [])

  const toggleHasPromo = (params: { stage: 'activate' | 'deactivate' }) => {
    setHasPromo(params.stage === 'activate')
  }

  return (
    <Container>
      <NavBar>
        <Logo src="https://cdn.streamlayer.io/sdk-web-demo/sl-logo.png"/>
        <Controls onClick={toggleMode}>
          <ControlButton active={mode==='side-panel'} name='side-panel'>Side Panel</ControlButton>
          <ControlButton active={mode==='l-bar'} name='l-bar'>L-Bar</ControlButton>
          <ControlButton active={mode==='overlay'} name='overlay'>Overlay</ControlButton>
        </Controls>
        <LinkToStudio href={STUDIO_LINK} target='_blank'>
          Open Studio
        </LinkToStudio>
      </NavBar>
      <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} onContentActivate={toggleHasPromo}>
        <div style={{ display: 'none' }}><StreamLayerSDKAdvertisement event={EVENT_ID} persistent /></div>
        <AppContainer>
          <VideoContainer>
            <Video
              src="https://storage.googleapis.com/cdn.streamlayer.io/assets/sdk-web/Own%20The%20Game%201080p%20RF18.mp4"
              muted
              autoPlay={true}
              loop
              playsInline
            />
            {hasPromo && mode === 'l-bar' && (
              <Banner className="Demo-Banner">
                <StreamLayerSDKAdvertisement event={EVENT_ID} banner='bottom' persistent />
              </Banner>
            )}
            {hasPromo && mode === 'overlay' && (
              <Overlay className="Demo-Overlay">
                <StreamLayerSDKAdvertisement event={EVENT_ID} persistent />
              </Overlay>
            )}
          </VideoContainer>
          {hasPromo && (mode === 'side-panel' || mode === 'l-bar') && (
            <SideBar className="Demo-SideBar">
              <StreamLayerSDKAdvertisement event={EVENT_ID} sidebar='right' persistent />
            </SideBar>
          )}
        </AppContainer>
      </StreamLayerProvider>
    </Container>
  )
}

export default App
