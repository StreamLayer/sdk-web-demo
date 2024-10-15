import styled from '@emotion/styled'
import { breakpoints } from '../../styles'


export const Video = styled.video`
    object-fit: contain;
    width: 100%;
    aspect-ratio: 16 / 9;

    ${breakpoints(`
        max-width: 100dvw;
        max-height: 100dvh;
    `)}
`