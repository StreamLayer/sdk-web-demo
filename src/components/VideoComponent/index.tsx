import Hls from "hls.js";
import { Video} from './styles'
import { useEffect, useRef, useState } from 'react'
import { useStreamLayer } from "@streamlayer/react"

type VideoComponentProps = {
    src: string
    style?: { [key: string]: string }
  }

export const VideoComponent: React.FC<VideoComponentProps> = ({ src, style = {} }) => {
  const videoRef = useRef() as React.RefObject<HTMLVideoElement>;
  const sdk = useStreamLayer()
  const [streamSrc, setStreamSrc] = useState('')

  useEffect(() => {
    if (sdk) {
      sdk.streamSummary().fetch().then((summary) => {
        setStreamSrc(summary?.summary?.stream || src)
      }).catch(() => {
        setStreamSrc(src)
      })
    }
  }, [sdk])

  useEffect(()=>{
    if (streamSrc && streamSrc.includes('m3u8')) {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls({
          "debug": false
        });

        hls.loadSource(src);
        hls.attachMedia(videoRef.current)

        hls.on(Hls.Events.ERROR, (err) => {
          console.log(err)
        });
      } else {
        console.log('load')
      }
    }
  }, [streamSrc])

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