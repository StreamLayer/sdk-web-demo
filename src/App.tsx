import { useState } from 'react'
import './App.css'
import { StreamLayerProvider, StreamLayerSDKReact, useStreamLayer } from '@streamlayer/react'

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

function App() {
  return (
    <StreamLayerProvider plugins={new Set()} sdkKey={import.meta.env.VITE_SDK_KEY}>
      <EventInput />
      <StreamLayerSDKReact />
    </StreamLayerProvider>
  )
}

export default App
