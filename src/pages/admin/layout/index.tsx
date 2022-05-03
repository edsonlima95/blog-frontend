import styles from './styles.module.scss';
import { AiFillEdit, AiOutlineHome, AiOutlineProfile, AiOutlineMenu, AiFillSetting, AiOutlineClose } from 'react-icons/ai'
import { FaUser, FaBell, FaSearch, FaYoutube } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { logout } from '../../../contexts/AuthContext';
import Router from 'next/router';
import api from '../../../services/api';
import { getCookie } from 'cookies-next';
import { MenuContext } from '../../../contexts/MenuContext';
import { MdLogout } from 'react-icons/md';

type DashboardProps = {
    children: React.ReactNode,
    title: string,
}

function Layout({ children, title }: DashboardProps) {


    const { isOpen, menuToggle } = useContext(MenuContext)

    const cookie = getCookie('blog.token')

    useEffect(() => {

        if (!cookie) {
            Router.push("/admin/login")
        }

        api.get("/check-token", { headers: { Authorization: `Bearer ${cookie}` } })
            .then((response) => {
            }).catch((error) => {
                logout()
            })
    }, [])

    return (

        <div className={styles.wrapper}>
            <div style={{ marginRight: 0 }}>

                <aside className={`${isOpen ? styles.asideOpen : ''} ${styles.aside}  col-lg-2`}>
                    <nav className={`${styles.menuLeft} col-lg-2`}>

                        <div className="d-lg-none d-flex justify-content-end">
                            <AiOutlineClose color="white" size="30" onClick={menuToggle} />
                        </div>
                        
                        <div className={`${styles.avatar} d-flex align-items-center`}>

                            <img src="/images/perfil.jpg" className="img-fluid" alt="perfil" />
                            <label>EDSON LIMA</label>

                        </div>
                        <div style={{ color: '#707070', fontWeight: '700' }}>
                            MENU
                        </div>

                        <ul className="navbar-nav mb-2 mb-lg-0">

                            <li className="nav-item d-flex align-items-center">
                                <AiOutlineHome />
                                <Link href="/admin" passHref >
                                    <a className="nav-link active" aria-current="page"> Home</a>
                                </Link>
                            </li>

                            <li className="nav-item d-flex align-items-center">
                                <AiFillEdit />
                                <Link href="/admin/post" passHref >
                                    <a className="nav-link" onClick={menuToggle} aria-current="page"> Posts</a>
                                </Link>
                            </li>

                            <li className="nav-item d-flex align-items-center">
                                <AiOutlineProfile />
                                <Link href="/admin/category" passHref >
                                    <a className="nav-link" onClick={menuToggle} aria-current="page"> Categórias</a>
                                </Link>
                            </li>

                            <li className="nav-item d-flex d-lg-none align-items-center">
                                <MdLogout />
                                <a title="Sair" onClick={logout} style={{ cursor: 'pointer' }} className="nav-link">Sair</a>
                            </li>
                        </ul>
                    </nav>

                </aside>

                <main className={`${styles.main} col-lg-10`}>

                    <header className={`${styles.header} col-lg-12 d-flex align-items-center`}>

                        <div className="col-lg-2">
                            <AiOutlineMenu size="30" className={styles.menuIcon} onClick={menuToggle} />
                        </div>

                        <div className={`col-lg-8 d-flex ${styles.inputSearch}`}>
                            <form className={`${styles.formSearch} col-lg-12 d-flex justify-content-center`}>
                                <label htmlFor="" className="col-lg-5">
                                    <input type="text" className={styles.search} name="search" placeholder="Buscar" />
                                    <FaSearch />
                                </label>
                            </form>
                        </div>

                        <div className={`${styles.logOut} col-lg-2 d-flex flex-grow-1 justify-content-end`}>
                            <a title="Sair" onClick={logout} style={{ cursor: 'pointer' }}>
                                <MdLogout />
                            </a>
                        </div>

                    </header>

                    <div className={`${styles.layoutTitle}`}>
                        <h1>{title}</h1>
                        <span></span>
                    </div>

                    <div>
                        {children}
                    </div>

                </main>
            </div>
        </div>
    )

}

export default Layout