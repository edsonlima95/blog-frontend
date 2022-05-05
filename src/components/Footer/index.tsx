import styles from './styles.module.scss'

import { FaFacebook, FaGithub, FaHeart, FaInstagram, FaReact, FaWhatsapp } from 'react-icons/fa';


function Footer() {
    
    return (
        <footer className={`${styles.footer}`}>
          <p>By Edson Lima com <FaHeart color="#cf0022" /></p>
          <ul>
            <li><a href=""><FaFacebook /></a></li>
            <li><a href=""><FaInstagram /></a></li>
            <li><a href=""><FaGithub /></a></li>
            <li><a href=""><FaWhatsapp /></a></li>
          </ul>
        </footer>
    )

}

export default Footer