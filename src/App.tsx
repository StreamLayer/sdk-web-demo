import { StreamLayerProvider } from '@streamlayer/react'
import '@streamlayer/react/style.css'
import { AppContainer, Banner, Container, Overlay, SideBar, SideBarOverlay, Video, VideoContainer } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'
import { NavBar } from './NavBar'

const searchParams = new URLSearchParams(window.location.search)

const SDK_KEY = searchParams.get('sdk_key') || process.env.VITE_SDK_KEY || ''
const PRODUCTION = searchParams.get('production') === undefined
  ? process.env.VITE_PRODUCTION === 'true'
  : searchParams.get('production') === 'true'
export const EVENT_ID = searchParams.get('event_id') || process.env.VITE_EVENT_ID || ''
const mode = searchParams.get('mode') as IMode || 'side-panel'

export const STUDIO_LINK = PRODUCTION ? `https://studio.streamlayer.io/events/all/id/${EVENT_ID}/moderation` : `https://studio.next.streamlayer.io/events/all/id/${EVENT_ID}/moderation`

export type IMode = 'side-panel' | 'l-bar' | 'overlay'

function App() {
  const [hasPromo, setHasPromo] = useState(false)

  const toggleMode = useCallback((e: React.MouseEvent<HTMLDivElement> | React.ChangeEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      searchParams.set('mode', e.target.name)
      window.location.search = searchParams.toString()
    }

    if (e.target instanceof HTMLSelectElement) {
      searchParams.set('mode', e.target.value)
      window.location.search = searchParams.toString()
    }
  }, [])

  const toggleHasPromo = (params: { stage: 'activate' | 'deactivate' }) => {
    setHasPromo(params.stage === 'activate')
  }

  return (
    <Container>
      <NavBar mode={mode} toggleMode={toggleMode} />
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
          {hasPromo && (
            <SideBarOverlay className="Demo-SideBar">
              <StreamLayerSDKAdvertisement event={EVENT_ID} persistent />
            </SideBarOverlay>
          )}
        </AppContainer>
      </StreamLayerProvider>
    </Container>
  )
}

export default App
