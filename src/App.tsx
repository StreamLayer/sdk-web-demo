import { StreamLayerProvider, ContentActivateParams, OnContentActivateCallback } from '@streamlayer/react'
import '@streamlayer/react/style.css'
import { AppContainer, Banner, Container, Overlay, SideBar, SideBarOverlay, Video, VideoContainer, Notification } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'
import { NavBar } from './NavBar'

const searchParams = new URLSearchParams(window.location.search)

const SDK_KEY = searchParams.get('sdk_key') || process.env.VITE_SDK_KEY || ''
const PRODUCTION = searchParams.get('production') === null
  ? process.env.VITE_PRODUCTION === 'true'
  : searchParams.get('production') === 'true'
export const EVENT_ID = searchParams.get('event_id') || process.env.VITE_EVENT_ID || ''

export const STUDIO_LINK = PRODUCTION ? `https://studio.streamlayer.io/events/all/id/${EVENT_ID}/moderation` : `https://studio.next.streamlayer.io/events/all/id/${EVENT_ID}/moderation`

export type IMode = 'side-panel' | 'l-bar' | 'overlay'

function App() {
  const [mode, setMode] = useState<IMode>('side-panel')
  const [promo, setPromo] = useState<ContentActivateParams>()
  const [notification, setNotification] = useState(false)
  const showPromo = promo && !notification

  const toggleMode = useCallback((e: React.MouseEvent<HTMLDivElement> | React.ChangeEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      setMode(e.target.name as IMode)
    }

    if (e.target instanceof HTMLSelectElement) {
      setMode(e.target.value as IMode)
    }
  }, [])

  const toggleHasPromo: OnContentActivateCallback = (params) => {
    if (params.stage === 'activate') {
      setNotification(!!params.hasNotification)
      setPromo(params)
    } else {
      setPromo(undefined)
      setNotification(false)
    }
  }

  const showAdByNotification = () => {
    setNotification(false)
  }

  return (
    <Container>
      <NavBar mode={mode} toggleMode={toggleMode} />
      <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} onContentActivate={toggleHasPromo}>
        <div style={{ display: 'none' }}><StreamLayerSDKAdvertisement event={EVENT_ID} persistent /></div>
        <AppContainer>
          <VideoContainer style={showPromo && mode === 'l-bar' ? { aspectRatio: 'initial' } : {}}>
            <Video
              src="https://storage.googleapis.com/cdn.streamlayer.io/assets/sdk-web/Own%20The%20Game%201080p%20RF18.mp4"
              muted
              autoPlay={true}
              loop
              playsInline
              style={showPromo && mode === 'l-bar' ? { maxHeight: 'calc(100dvh - 95px)' } : {}}
            />
            {showPromo && mode === 'l-bar' && (
              <Banner className="Demo-Banner">
                <StreamLayerSDKAdvertisement event={EVENT_ID} banner='bottom' persistent />
              </Banner>
            )}
            {showPromo && mode === 'overlay' && (
              <Overlay className="Demo-Overlay">
                <StreamLayerSDKAdvertisement event={EVENT_ID} persistent />
              </Overlay>
            )}
            {notification && <Notification className="Demo-Notification" onClick={showAdByNotification}>
              <StreamLayerSDKAdvertisement event={EVENT_ID} notification persistent />
            </Notification>}
          </VideoContainer>
          {showPromo && (mode === 'side-panel' || mode === 'l-bar') && (
            <SideBar className="Demo-SideBar">
              <StreamLayerSDKAdvertisement event={EVENT_ID} sidebar='right' persistent />
            </SideBar>
          )}
          {showPromo && (
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
