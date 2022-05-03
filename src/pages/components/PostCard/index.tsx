import Link from 'next/link';
import { truncate } from '../../../helpers'
import styles from './styles.module.scss';

type Category = {
    id?: number,
    title: string,
    description: string
}

type User = {
    first_name: string
    last_name?: string

}

type Post = {
    id?: number,
    title: string,
    slug: string,
    description?: string,
    cover: string;
    created_at: string,
    categories?: Category[],
    user?: User
}

type PostProps = {
    post: Post,
}

export function PostCard({ post }: PostProps) {

    return (
        <div data-aos="fade-up" data-aos-duration="2000" className={styles.postContainer}>
            <div className={`${styles.imgContainer}`}>
                <Link href={`/post/${post.slug}`} passHref>
                    {post.cover ? (<img alt="" srcSet={`http://localhost:3333/post-image/${post.cover}`} />) : (<img alt="" srcSet="/images/default01.png" />)}
                </Link>
            </div>

            <div className={styles.postContent}>
                <div className="d-flex">
                    {post.categories?.map(c => (<small key={c.id}>{c.title+' '}</small>))}
                </div>
                <Link href={`/post/${post.slug}`} passHref>
                    <a>{truncate(post.title, 0, 40)}</a>
                </Link>
               
                <p>{post.user?.first_name} {post.user?.last_name} . {new Intl.DateTimeFormat('pt-BR').format(new Date(post.created_at))}</p>
            </div>
        </div>
    )

}



