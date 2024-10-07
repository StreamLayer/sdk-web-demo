import { StreamLayerProvider, useStreamLayer } from '@streamlayer/react'
import '@streamlayer/react/style.css'
import { AppContainer, Banner, Container, ControlButton, Controls, Logo, LinkToStudio, LinkToStudioLogo, NavBar, Overlay, SideBar, Video, VideoContainer } from './styles'
import { useCallback, useState } from 'react'
import { StreamLayerSDKAdvertisement } from './SDK'

const SDK_KEY = process.env.VITE_SDK_KEY || ''
const PRODUCTION = process.env.VITE_PRODUCTION === 'true'
export const EVENT_ID = process.env.VITE_EVENT_ID || ''

const Button = () => {
  const sdk = useStreamLayer()

  const togglePromo = () => {
    console.log('toggle')
    // @ts-ignore
    sdk.getFeature(12).background.advertisement.show('95272')
  }

  return <button style={{ position: 'absolute', zIndex: 1 }} onClick={togglePromo}>toggle</button>
}

export type IMode = 'side-panel' | 'l-bar' | 'overlay'

function App() {
  const [mode, setMode] = useState('side-panel')

  const toggleMode = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      setMode(e.target.name)
    }
  }, [])

  return (
    <Container>
      <NavBar>
        <Logo src="https://cdn.streamlayer.io/sdk-web-demo/sl-logo.png"/>
        <Controls onClick={toggleMode}>
          <ControlButton active={mode==='side-panel'} name='side-panel'>Side Panel</ControlButton>
          <ControlButton active={mode==='l-bar'} name='l-bar'>L-Bar</ControlButton>
          <ControlButton active={mode==='overlay'} name='overlay'>Overlay</ControlButton>
        </Controls>
        <LinkToStudio href='' target='_blank'>
          {/* ToDo: uncomment, add src for logo */}
          {/* <LinkToStudioLogo src="" /> */}
            Open Studio
          </LinkToStudio>
      </NavBar>
      <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION}>
        <AppContainer>
          <Button />
          <VideoContainer>
            <Video
              src="https://storage.googleapis.com/cdn.streamlayer.io/assets/sdk-web/Own%20The%20Game%201080p%20RF18.mp4"
              muted
              autoPlay={true}
              loop
              playsInline
            />
            {mode === 'l-bar' && (
              <Banner>
                <StreamLayerSDKAdvertisement event={EVENT_ID} banner='bottom' persistent />
              </Banner>
            )}
            {mode === 'overlay' && (
              <Overlay>
                <StreamLayerSDKAdvertisement event={EVENT_ID} persistent />
              </Overlay>
            )}
          </VideoContainer>
          {(mode === 'side-panel' || mode === 'l-bar') && (
            <SideBar>
              <StreamLayerSDKAdvertisement event={EVENT_ID} sidebar='right' persistent />
            </SideBar>
          )}
        </AppContainer>
      </StreamLayerProvider>
    </Container>
  )
}

export default App
