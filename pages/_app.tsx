import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import moment from 'moment';

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
import { AuthProvider } from '../contexts/AuthContext';

moment.updateLocale('pt', {
  months: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default storeWrapper.withRedux(MyApp);