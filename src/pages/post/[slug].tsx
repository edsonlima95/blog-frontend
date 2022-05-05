import styles from './styles.module.scss'
import { GetServerSideProps } from "next"
import  Layout  from "../layout"
import { apiWeb } from '../../services/axios'
import { truncate } from '../../helpers'
import  PostCard  from '../../components/PostCard'

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
    description: string,
    cover: string;
    created_at: string
    categories: Category[]
    user: User
}

type PostProps = {
    post: Post,
    category: Post[]
}


function Post({ post, category }: PostProps) {

    return (
        <Layout>
            <header className={styles.headerPost}>

                <div className="col-lg-8">
                    <div>
                        <h1 title={post.title}>{truncate(post.title, 0, 30)}</h1>
                        <h3>{ truncate(post?.sub_title, 0, 100)}</h3>
                    </div>
                </div>
            </header>
            <div className={`${styles.content} col-lg-12`}>
                <div className="container d-flex align-items-center flex-column pt-5 col-lg-8">
                    {post.cover ? (<img alt="" src={`${process.env.NEXT_PUBLIC_APP_WEB_URL}/post-image/${post.cover}`} />) : (<img alt="" srcSet="/images/default01.png" />)}

                    <h1>{post.title}</h1>

                    <div dangerouslySetInnerHTML={{__html: post.description}} className={`${styles.postContent}`}></div>
                </div>
            </div>
            <div className={`${styles.related} container`}>
                <span>Posts relacionados</span>

                {category[0]?.posts?.map(post => (<div key={post.id}><PostCard post={post} /></div>))}

            </div>
        </Layout>
    )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    try {
        const response = await apiWeb.get(`/post/${ctx.params?.slug}`)

        return {
            props: {
                post: response.data.post,
                category: response.data.category
            }
        }

    } catch (error) {

    }

    return {
        props: {}
    }

}

export default Post