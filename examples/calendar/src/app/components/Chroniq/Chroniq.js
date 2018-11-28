import styled from 'styled-components'
import ReactChroniq from '@chroniq/chroniq'
import '@chroniq/chroniq/lib/index.css'

export const Chroniq = styled(ReactChroniq)`
  body & .chrnq-event {
    overflow: visible;
  }
`
