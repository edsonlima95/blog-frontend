import styles from './styles.module.scss'
import { PostCard } from '../components/PostCard'
import { Layout } from '../layout'

type Category = {
    title: string,
    description: string
}

type User = {
    first_name: string,
    last_name: string
}

type Post = {
    id: number,
    title: string,
    slug: string,
    description: string,
    cover: string,
    created_at: string,
    categories: Category[]
    user: User
}


type PostCategory = {
    posts: Post[],
    title: string,
    description: string
}

function Home() {

    const router = useRouter()
    const [postsByCategory, setPostsByCategory] = useState<PostCategory>({} as PostCategory)

    const { slug } = router.query

    useEffect(() => {

        if(slug){

            apiWeb.get(`/post-category/${slug}`).then((response) => {
                setPostsByCategory(response.data)
            })
        }else {
            router.push("/")
        }

    }, [slug])


    return (
        <Layout>
            <header className={styles.headerCategory}>

                <div className="col-lg-8">
                    <div>
                        <h1>{postsByCategory.title}</h1>
                        <p>{postsByCategory.description && postsByCategory.description}</p>
                    </div>
                </div>
            </header>

            <div className={`${styles.content} container`}>
                {postsByCategory.posts?.map((post) => (
                    <div key={post.id}>
                        <PostCard post={post} />
                    </div>
                ))}

            </div>
        </Layout>
    )

}
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiWeb } from '../../services/axios'
import { route } from 'next/dist/server/router'

export default Home

