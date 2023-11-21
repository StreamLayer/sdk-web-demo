import './App.css'
import { useState } from 'react'
import { MastersStreamLayerProvider, MastersStreamLayerSDKReact } from '@streamlayer/react/masters'
import { StreamLayerSDKPoints } from '@streamlayer/react/points'
import { StreamLayerLogin } from '@streamlayer/react/auth'
import '@streamlayer/react/style.css'

function App() {
  const [user, setUser] = useState({ token: '', schema: '' })

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const token = data.get('token') as string
    const schema = data.get('schema') as string

    setUser({ token, schema })
  }

  return (
    <div className='app-div'>
      <form className='auth-form' onSubmit={submitUser}>
        <div>
          <label htmlFor="token">token</label>
          <input type="text" id="token" name="token" />
        </div>
        <div>
          <label htmlFor="schema">schema</label>
          <input type="text" id="schema" name="schema" />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
      <MastersStreamLayerProvider sdkKey={process.env.VITE_SDK_KEY || ''}>
        <div className='points'>
          <StreamLayerSDKPoints />
        </div>
        <StreamLayerLogin token={user.token} schema={user.schema} />
        <MastersStreamLayerSDKReact>
            {({ enableSdk, disableSdk }) => (
              <div>
                <button onClick={() => enableSdk('733')}>enable</button>
                <button onClick={disableSdk}>disable</button>
              </div>
            )}
          </MastersStreamLayerSDKReact>
      </MastersStreamLayerProvider>
    </div>
  )
}

export default App
