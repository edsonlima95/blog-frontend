/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { FaSearch } from 'react-icons/fa';
import  PostCard  from '../components/PostCard'
import  Layout  from './layout'
import styles from './home.module.scss'
import { GetServerSideProps } from 'next';
import { apiWeb } from '../services/axios';
import { Pagination } from '../components/Pagination';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import  Head  from 'next/head';
import Seo from '../components/Seo';
import { getCookie } from 'cookies-next';


type Category = {
    id: number,
    title: string,
    description: string
}

type User = {
    first_name: string
    last_name?: string

}

type Post = {
    id: number,
    title: string,
    slug: string,
    sub_title?: string,
    description: string,
    cover: string;
    created_at: string
    categories: Category[]
    user: User
}

type Meta = {
    total: number,
    per_page: number,
    current_page: number,
    next_page_url: string,
    previous_page_url: string,
    first_page: number,
    last_page: number,
}

type HomeProps = {
    posts: Post[],
    postsRecents: Post[],
    meta: Meta
}


export default function Home({ posts, meta, postsRecents }: HomeProps) {

   
    const [searchInput, setSearchInput] = useState('');
    const [post, setPost] = useState<Post[]>([])
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [paginate, setPaginate] = useState<Meta>({} as Meta)

    useEffect(() => {

        setPost(posts)
        setPaginate(meta)
    }, [])

    //FUNCÃO DO INPUT SEARCHING
    const searchItems = (e: FormEvent) => {
        setSearchInput(e.target.value)

        if (searchInput !== '') {

            const filteredPosts = post.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })

            setFilteredPosts(filteredPosts)
        } else {
            // setFilteredPosts(post)
        }

    }


    //FUNCÕES DA PAGINAÇÃO
   
    async function link(link: number) {
        const response = await apiWeb.get(`/posts?page=${link}`)
        const { data, meta } = response.data.posts

        setPost(data)
        setPaginate(meta)
    }

    return (
        <Layout>
            <div className={`${styles.slide} d-flex`}>
                <div className="col-lg-12">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner" style={{height: "600px"}}>
                            {postsRecents.map((post, index) => (<div key={post.id} className={`${index == 0 ? 'active' : ''} carousel-item position-relative`} style={{height: '100%'}}>
                                <Link href={`post/${post.slug}`}>
                                    <div className={`${styles.bgBlur}`}></div>
                                </Link>
                                <img src={`${process.env.NEXT_PUBLIC_APP_WEB_URL}/post-image/${post.cover}`} className="d-block" alt="..." />
                                <div className={`carousel-caption d-none text-center d-md-block ${styles.captionTitle}`}>
                                    <h4 style={{ fontSize: '40px' }}>{post.title}</h4>
                                    <h6 style={{ fontSize: '20px' }}>{post?.sub_title}</h6>
                                </div>
                            </div>))
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.mainWeb}`}>
                <div className={`${styles.titleContent} d-flex flex-column text-center`}>
                    <h2>Confira abaixo conteúdos<br /> completos <span>sobre programação</span></h2>
                    <form className='d-flex justify-content-center'>
                        <div className="form-group col-sm-8 col-md-8 col-lg-8">
                            <label htmlFor="search" className='col-sm-12 col-md-12 col-lg-12 d-flex align-items-center justify-content-center mt-5'>
                                <input type="text" name="search" className="col-sm-10 col-md-8 col-lg-7" placeholder="Buscar" onChange={(e) => searchItems(e)} />
                                
                                <FaSearch size="50"/>
                            </label>
                        </div>
                    </form>
                </div>
                <div className={styles.posts}>
                    {searchInput.length > 1 ? filteredPosts?.map(post => (
                        <div key={post.id}>
                            <PostCard post={post} />
                        </div>
                    )) : (post?.map(post => (
                        <div key={post.id}>
                            <PostCard post={post} />
                        </div>
                    )))}


                </div>

                <div className="paginationWeb">

                    <Pagination
                        total={paginate?.total}
                        current_page={paginate?.current_page}
                        per_page={paginate?.per_page}
                        first_page={paginate?.first_page}
                        last_page={paginate.last_page}
                        onPageLink={link}
                    />

                </div>
            </div>

        </Layout>
    )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const response = await apiWeb.get("/posts?page=1")

    const { data, meta } = response.data.posts

    return {
        props: {
            posts: data,
            meta,
            postsRecents: response.data.postsRecents,
        }
    }
}


