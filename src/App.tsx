import { StreamLayerProvider, ContentActivateParams, OnContentActivateCallback } from '@streamlayer/react'
// import { StreamLayerSDKInsight } from '@streamlayer/react/insight'
import '@streamlayer/react/style.css'
import { AppContainer, Banner, Container, Overlay, SideBar, SideBarOverlay, VideoContainer, Notification } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'
import { NavBar } from './NavBar'
import { VideoComponent } from './components/VideoComponent'


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
    if (params.type !== 'advertisement') {
      return
    }

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
      <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} event={EVENT_ID} onContentActivate={toggleHasPromo}>
        <AppContainer>
          <VideoContainer style={showPromo && mode === 'l-bar' ? { aspectRatio: 'initial' } : {}}>
            <VideoComponent
              src='https://205101.global.ssl.fastly.net/64e4ef822551090422066aca/live_d6f5425041ce11ee85198d2de786993e/index.m3u8'
              style={showPromo && mode === 'l-bar' ? { maxHeight: 'calc(100dvh - 95px)' } : {}}
            />
            {showPromo && mode === 'l-bar' && (
              <Banner className="Demo-Banner">
                <StreamLayerSDKAdvertisement banner='bottom' persistent />
              </Banner>
            )}
            {showPromo && mode === 'overlay' && (
              <Overlay className="Demo-Overlay">
                <StreamLayerSDKAdvertisement persistent />
              </Overlay>
            )}
            {notification && <Notification className="Demo-Notification" onClick={showAdByNotification}>
              <StreamLayerSDKAdvertisement notification persistent />
            </Notification>}
          </VideoContainer>
          {showPromo && (mode === 'side-panel' || mode === 'l-bar') && (
            <SideBar className="Demo-SideBar">
              <StreamLayerSDKAdvertisement sidebar='right' persistent />
            </SideBar>
          )}
          {showPromo && (
            <SideBarOverlay className="Demo-SideBarOverlay">
              <StreamLayerSDKAdvertisement persistent />
            </SideBarOverlay>
          )}
          {/* <SideBar className="Demo-SideBar">
            <StreamLayerSDKInsight persistent />
          </SideBar> */}
        </AppContainer>
      </StreamLayerProvider>
    </Container>
  )
}

export default App
