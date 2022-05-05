import styles from './styles.module.scss';
import Link from 'next/link'
import { FaReact } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai';

function Menu() {


  return (

    <nav className="navbar navbar-expand-lg container-lg">
      <div className="container-fluid justify-content-end">
        <Link href="/" passHref>
          <a className={`${styles.brand} navbar-brand`} style={{ color: '#fff', fontWeight: 'bold' }}><FaReact color="#Cf0022" size="35" /> DEV NEWS</a>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <AiOutlineMenu color='#c6c6c6' size="30" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Início</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/backend" passHref>
                <a className="nav-link" >Backend</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/frontend" passHref>
                <a className="nav-link">Frontend</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/react-js" passHref>
                <a className="nav-link">React js</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/category/node-js" passHref>
                <a className="nav-link">Node Js</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

}

export default Menu