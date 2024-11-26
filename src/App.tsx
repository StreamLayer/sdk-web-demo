import { useCallback, useState } from 'react'
import { StreamLayerProvider, ContentActivateParams, OnContentActivateCallback } from '@streamlayer/react'

import { StreamLayerSDKAdvertisement } from './components/StreamLayerSDKAdvertisement'
import { NavBar } from './components/NavBar'
import { VideoComponent } from './components/VideoComponent'
import { SDKLayout } from './components/SDKLayout'

import { AppContainer, Container } from './styles'
import '@streamlayer/react/style.css'
import { EVENT_ID, SDK_KEY, PRODUCTION } from './config'

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
