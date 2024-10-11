import Hls from "hls.js";
import { Video} from './styles'
import { useEffect, useRef } from 'react'

type VideoComponentProps = {
    src: string
    muted?: boolean
    loop?: boolean
    playsInline?: boolean
    autoPlay?: boolean
    style?: { [key: string]: string }
  }

export const VideoComponent: React.FC<VideoComponentProps> = ({src, muted = true, loop = true, playsInline = true, autoPlay = true, style = {}}) => {
    const videoRef = useRef() as React.RefObject<HTMLVideoElement>;

    useEffect(()=>{
      const hls = new Hls({
        "debug": true
      });

      if (Hls.isSupported() && videoRef.current) {
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