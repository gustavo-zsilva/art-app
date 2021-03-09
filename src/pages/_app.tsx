import { DataProvider } from '../contexts/DataContext';
import '../styles/global.css';
import 'react-circular-progressbar/dist/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp;
