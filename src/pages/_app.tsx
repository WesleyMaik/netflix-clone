//Modules
import '../../styles/global.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { store } from '../store/index'

//Chakra config
const themeConfig:ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme(themeConfig);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default App;
