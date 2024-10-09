import { useStreamLayer, StreamLayerThemeProvider } from '@streamlayer/react'
import { StreamLayerSDKAdvertisementUI, StreamLayerSDKAdvertisementProps } from '@streamlayer/react/advertisement'

import { EVENT_ID } from "./App"

export const StreamLayerSDKAdvertisement: React.FC<StreamLayerSDKAdvertisementProps> = ({ sidebar, banner, notification }) => {
    const sdk = useStreamLayer()

    if (!sdk) {
        return null
    }

    return (
        <div className="StreamLayerSDK">
            <StreamLayerThemeProvider customTheme="custom-theme">
                <StreamLayerSDKAdvertisementUI
                    sdk={sdk}
                    sidebar={sidebar}
                    banner={banner}
                    event={EVENT_ID}
                    notification={notification}
                    persistent
                    skipTypeCheck
                />
            </StreamLayerThemeProvider>
        </div>
)
}