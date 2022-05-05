import styles from './home.module.scss';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

type Layout = {

  children: React.ReactNode

}

export default function Layout({ children }: Layout) {
  return (
    <>
      
      <header className={styles.headerWeb}>
        <Menu/>
      </header>

      <main>
        
        {children}

        <Footer/>
      </main>
    </>
  )
}

