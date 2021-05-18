import '../styles/animation.css';
import '../styles/globals.css';
import '../styles/login.css';
import '../styles/main.css';

import { storeWrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default storeWrapper.withRedux(MyApp);