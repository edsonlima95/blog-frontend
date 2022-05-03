import './styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import { MenuProvider } from '../contexts/MenuContext';
import { CounterProvider } from '../contexts/Counter';
import { useEffect } from 'react';




function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      once: true
    }) //Animação scroll
  },[])

  return (
    <AuthProvider>
      <MenuProvider>
        <CounterProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CounterProvider>
      </MenuProvider>
    </AuthProvider>

)


}

export default MyApp
