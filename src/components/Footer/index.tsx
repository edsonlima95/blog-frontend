/* eslint-disable react/jsx-no-target-blank */
import styles from './styles.module.scss'

import { FaFacebook, FaGithub, FaHeart, FaInstagram, FaReact, FaWhatsapp } from 'react-icons/fa';


function Footer() {
    
    return (
        <footer className={`${styles.footer}`}>
          <p>By Edson Lima com <FaHeart color="#cf0022" /></p>
          <ul>
            <li><a href="https://www.facebook.com/edsonlima95" target="_blank"><FaFacebook /></a></li>
            <li><a href="https://www.instagram.com/edsonlima95/" target="_blank"><FaInstagram /></a></li>
            <li><a href="https://github.com/edsonlima95" target="_blank"><FaGithub /></a></li>
            <li><a href=""><FaWhatsapp /></a></li>
          </ul>
        </footer>
    )

}

export default Footer