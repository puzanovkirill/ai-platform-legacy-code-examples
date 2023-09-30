import { ChakraProvider } from '@chakra-ui/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { store } from './stores/store';
import customTheme from './custom-theme';
import App from './App';
import './i18n';

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </ChakraProvider>
);
