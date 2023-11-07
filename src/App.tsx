import { useState } from 'react'
import './App.css'
import { anonymous } from '@streamlayer/sdk-web-anonymous-auth'
import { StreamLayerProvider, StreamLayerSDKReact, useStreamLayer, StreamLayerSDKPoints } from '@streamlayer/react'
import '@streamlayer/react/style.css'

const EventInput = () => {
  const sdk = useStreamLayer()
  const [event, setEvent] = useState('')
  const startEventSession = () => {
    sdk?.createEventSession(event)
  }

  if (!sdk) {
    return null
  }

  return (
    <div>
      <input type="text" value={event} onChange={e => setEvent(e.target.value)} />
      <button onClick={startEventSession}>set</button>
    </div>
  )
}

const plugins = new Set([anonymous])

function App() {
  return (
    <StreamLayerProvider plugins={plugins} sdkKey={process.env.VITE_SDK_KEY || ''}>
      <EventInput />
      <StreamLayerSDKPoints />
      <StreamLayerSDKReact />
    </StreamLayerProvider>
  )
}

export default App
