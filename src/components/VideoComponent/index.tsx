import Hls from "hls.js";
import { Video} from './styles'
import { useEffect, useRef } from 'react'

type VideoComponentProps = {
    src: string
    hlsDebug?: boolean
    muted?: boolean
    loop?: boolean
    playsInline?: boolean
    autoPlay?: boolean
    style?: { [key: string]: string }
  }

export const VideoComponent: React.FC<VideoComponentProps> = ({src, hlsDebug, muted = true, loop = true, playsInline = true, autoPlay = true, style = {}}) => {
    const videoRef = useRef() as React.RefObject<HTMLVideoElement>;

    useEffect(()=>{
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls({
          "debug": !!hlsDebug
        });

        hls.loadSource(src);
        hls.attachMedia(videoRef.current)

        hls.on(Hls.Events.ERROR, (err) => {
          console.log(err)
        });
      } else {
        console.log('load')
      }
    }, [src])

    return (
      <Video
        src={src}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        ref={videoRef}
        style={style}
      />
    )
  }