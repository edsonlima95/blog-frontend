import styles from './home.module.scss'
import Head from 'next/head'
import Layout from './layout/index'
import { FaNewspaper, FaRegNewspaper, FaRegListAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import Loading from './components/Loading'
import { getCookie } from 'cookies-next'
import Router from 'next/router'

function Dashboard() {

    const [postCount, setPostCount] = useState({})
    const [posts, setPosts] = useState()
    const [loading, setLoading] = useState(true)
    const [categoryCount, setCategoryCount] = useState(0)

    const cookie = getCookie('blog.token')
    
    
    useEffect(() => {
        
        if (!cookie) {
            Router.push("/admin/login")
        } else {

            postsRecent()
            postsCount()
            categoriesCount()

        }

    }, [])

    async function postsCount() {
        try {
            const response = await api.get("/posts/count")
            setLoading(false)
            setPostCount(response?.data)
        } catch (error) {

        }


    }

    async function postsRecent() {
        try {
            const response = await api.get("/posts/recents")
            setLoading(false)
            setPosts(response?.data)
        } catch (error) {

        }


    }

    async function categoriesCount() {
        try {
            const response = await api.get("/categories/count")
            setLoading(false)
            setCategoryCount(response?.data)
        } catch (error) {

        }


    }

    return (
        <>
            <Loading load={loading} />

            <Head>
                <title>Dashboard</title>
            </Head>

            <Layout title="Dashboard">
                <div className={`${styles.cardHome}`}>
                    <div className={`${styles.card}`}>
                        <div className="d-flex p-3">
                            <div className="col-lg-8">
                                <p style={{ color: '#16db65' }}>Posts ativos</p>
                                <span>{postCount?.active}</span>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                <FaNewspaper />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className="d-flex p-3">
                            <div className="col-lg-8">
                                <p>Categórias</p>
                                <span>{categoryCount}</span>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                <FaRegListAlt />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className="d-flex p-3">
                            <div className="col-lg-8">
                                <p style={{ color: '#CF0022' }}>Posts inátivos</p>
                                <span>{postCount?.inative}</span>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                <FaRegNewspaper />
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.tableHome}>
                    <p style={{ color: '#C6C6C6' }}>POSTS RECENTES</p>
                    <div className="table-responsive">


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Titulo</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts?.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(post.created_at))}</td>
                                        {post.status ? <td style={{ color: '#16db65' }}>Ativo</td> : <td style={{ color: '#CF0022' }}>Inativo</td>}

                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )

}

export default Dashboard