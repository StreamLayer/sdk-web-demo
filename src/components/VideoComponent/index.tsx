import Hls from "hls.js";
import { Video} from './styles'
import { useEffect, useRef, useState } from 'react'
import { useStreamLayer } from "@streamlayer/react"

type VideoComponentProps = {
    src?: string
    style?: { [key: string]: string }
  }

export const VideoComponent: React.FC<VideoComponentProps> = ({ src = 'https://cdn.streamlayer.io/assets/sdk-web/Own%20The%20Game%201080p%20RF18.mp4', style = {} }) => {
  const videoRef = useRef() as React.RefObject<HTMLVideoElement>;
  const sdk = useStreamLayer()
  const [streamSrc, setStreamSrc] = useState('')

  useEffect(() => {
    if (sdk) {
      return sdk.streamSummary().subscribe((value) => {
        if (value.loading === false && value.error === undefined && value.data) {
          setStreamSrc(value.data.summary?.stream ? `${value.data.summary.stream}` : src)
        }
      })
    }
  }, [sdk, src])

  useEffect(()=>{
    if (streamSrc && streamSrc.includes('m3u8')) {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls({
          "debug": false
        });

        hls.loadSource(streamSrc);
        hls.attachMedia(videoRef.current)

        hls.on(Hls.Events.ERROR, () => {
          setStreamSrc(src)
        });
      } else {
        setStreamSrc(src)
      }
    }
  }, [streamSrc, src])

  if (!streamSrc) {
    return null
  }

  return (
    <Video
      src={streamSrc}
      ref={videoRef}
      style={style}
      muted
      autoPlay
      loop
      playsInline
    />
  )
}