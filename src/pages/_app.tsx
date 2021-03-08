import { DataProvider } from '../contexts/DataContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  )
}

export default MyApp;
