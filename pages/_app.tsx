import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import '../styles/animation.css';
import '../styles/listItem.css';
import '../styles/modal.css';
import '../styles/globals.css';
import '../styles/chart.css';
import '../styles/login.css';
import '../styles/main.css';
import '../styles/cashRegisterGroup.css';
import '../styles/cashRegister.css';
import '../styles/cashRegisterReport.css';
import '../styles/home.css';

import { storeWrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default storeWrapper.withRedux(MyApp);