import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPencilAlt, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { Pagination } from '../../../components/Pagination'
import api from '../../../services/api'
import { apiCtx } from '../../../services/axios'
import Layout from '../layout'
import { truncate } from '../../../helpers'

type Post = {
    id: number,
    title: string,
    sub_title: string,
    description: string,
    created_at: string,
    categoires: [],
    status: boolean,
    image?: []
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

type PostProps = {
    posts: Post[],
    meta: Meta
}


function PostsList({ posts, meta }: PostProps) {

    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [paginate, setPaginate] = useState<Meta>({} as Meta)

    useEffect(() => {

        setPost(posts)
        setPaginate(meta)
        setLoading(false)

    }, [])

    async function setStatus(id: number) {
        const response = await api.patch(`/posts/status/${id}?page=${paginate?.current_page}`)
        const { data, meta } = response.data

        setPost(data)
        setPaginate(meta)
    }

    async function destroy(id: number) {
        const response = await api.delete(`/posts/${id}?page=${paginate?.current_page}`)
        const { data, meta } = response.data

        setPost(data)
        setPaginate(meta)
        toast.success("Post deletado com sucesso")
    }

    async function link(link: number) {
        const response = await api.get(`/posts?page=${link}`)
        const { data, meta } = response.data

        setPost(data)
        setPaginate(meta)
    }

    return (
        <>
            <Loading load={loading} />
            <Layout title="Posts">
                <div className={`box`}>
                    <Link href="/admin/post/create" passHref>
                        <button className="btn btnAdd"><FaPlusCircle size={25} color="#fff" /></button>
                    </Link>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Titulo</th>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {post?.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td dangerouslySetInnerHTML={{ __html: truncate(post.description, 0, 50) }} ></td>
                                        <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(post.created_at))}</td>
                                        {post.status ? (<td style={{ color: '#16db65', cursor: 'pointer' }} onClick={() => setStatus(post.id)}>Ativo</td>) : (<td style={{ color: '#CF0022', cursor: 'pointer' }} onClick={() => setStatus(post.id)}>Inativo</td>)}
                                        <td>
                                            <Link href={`/admin/post/${post.id}`} passHref>
                                                <button className="btn btnEdit mx-3"><FaPencilAlt size={20} color="#fff" /></button>
                                            </Link>
                                            <button className="btn btnDelete" onClick={() => destroy(post.id)}><FaTrash size={20} color="#fff" /></button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <Pagination
                            total={paginate?.total}
                            current_page={paginate?.current_page}
                            per_page={paginate?.per_page}
                            first_page={paginate?.first_page}
                            last_page={paginate?.last_page}
                            onPageLink={link}
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const cookie = getCookie('blog.token', ctx)

    if (!cookie) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false //So redireciona uma vez caso entrar
            }
        }
    }

    try {
        const response = await apiCtx(ctx).get(`/posts?page=1`)

        const { meta, data } = response.data

        return {
            props: {
                posts: data,
                meta,
            }
        }
    } catch (error) { }

    return { props: {} }

}

export default PostsList