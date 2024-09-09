import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default';

import { GlobalStyle } from './styles/global';
import { Router } from './components/Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}  >

      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      
      <GlobalStyle />

    </ThemeProvider>
  )
}