import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import '../styles/globals.css'
import '../styles/login.css'

import { storeWrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default storeWrapper.withRedux(MyApp);