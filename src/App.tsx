import { StreamLayerProvider, ContentActivateParams, OnContentActivateCallback } from '@streamlayer/react'
// import { StreamLayerSDKInsight } from '@streamlayer/react/insight'
import '@streamlayer/react/style.css'
import { AppContainer, Container } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'
import { NavBar } from './NavBar'
import { VideoComponent } from './components/VideoComponent'
import { SDKLayout } from './SDKLayout'

const searchParams = new URLSearchParams(window.location.search)

const SDK_KEY = searchParams.get('sdk_key') || process.env.VITE_SDK_KEY || ''
const PRODUCTION = searchParams.get('production') === null
  ? process.env.VITE_PRODUCTION === 'true'
  : searchParams.get('production') === 'true'
export const EVENT_ID = searchParams.get('event_id') || process.env.VITE_EVENT_ID || ''

export const STUDIO_LINK = PRODUCTION ? `https://studio.streamlayer.io/events/all/id/${EVENT_ID}/moderation` : `https://studio.next.streamlayer.io/events/all/id/${EVENT_ID}/moderation`

export type IMode = 'side-panel' | 'l-bar' | 'overlay' | 'off'

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

  let videoContainerStyle: any = {}

  if (showPromo && mode === 'l-bar') {
    videoContainerStyle.aspectRatio = 'initial'
  }

  if (!showPromo || mode === 'overlay') {
    videoContainerStyle.height = '100%'
  }

  return (
    <Container>
      <NavBar mode={mode} toggleMode={toggleMode} />
      <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} event={EVENT_ID} onContentActivate={toggleHasPromo}>
        <AppContainer>
          <SDKLayout
            mode={showPromo ? mode : 'off'}
            sidebar={<StreamLayerSDKAdvertisement sidebar='right' persistent />}
            banner={<StreamLayerSDKAdvertisement banner='bottom' persistent />}
            video={<VideoComponent />}
            overlay={<StreamLayerSDKAdvertisement persistent />}
            notification={notification && <div onClick={showAdByNotification}><StreamLayerSDKAdvertisement notification persistent /></div>}
          />
        </AppContainer>
      </StreamLayerProvider>
    </Container>
  )
}

export default App
