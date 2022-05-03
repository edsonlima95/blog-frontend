import styles from './styles.module.scss'
import Layout from '../layout'
import Link from 'next/link'
import api from '../../../services/api'

import { FaPlusCircle, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Pagination } from '../../../components/Pagination'

type Category = {
    id: number,
    title: string,
    description: string,
    created_at: string
}

type Paginate = {
    next_page_url: string,
    first_page: number,
    last_page: number,
    previous_page_url: string,
    total: number,
    per_page: number,
    current_page: number,
}

function CategoryList() {

    const [categories, setCategories] = useState<Category[]>([])
    const [paginate, setPaginate] = useState<Paginate>({} as Paginate)

    useEffect(() => {

        api.get("/categories?page=1").then((response) => {

            const { data, meta } = response.data

            setCategories(data)
            setPaginate(meta)

        }).catch((error) => {
            console.error(error)
        })

    }, [])

    async function link(link: number) {

        try {
            const response = await api.get(`/categories?page=${link}`)
            const { data, meta } = response.data

            setCategories(data)
            setPaginate(meta)
        } catch (error) {
            console.log(error)
        }
    }

    async function destroy(id: number) {

        try {
            const response = await api.delete(`/categories/${id}?page=${paginate?.current_page}`)

            const { data, meta } = response.data

            setCategories(data)
            setPaginate(meta)

            toast.success("Categoria deletada com sucesso")
        } catch (err: any) {
            toast.error(err.response.data.error);
        }

    }

    return (

        <Layout title="Categórias">
            <div className={`box ${styles.categoryList}`}>
                <Link href="/admin/category/create" passHref>
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
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map(category => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.title}</td>
                                    <td>{category.description}</td>
                                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(category.created_at))}</td>
                                    <td>
                                        <Link href={`/admin/category/${category.id}`} passHref>
                                            <button className="btn btnEdit mx-3"><FaPencilAlt size={20} color="#fff" /></button>
                                        </Link>
                                        <Link href="/admin/category" passHref>
                                            <button className="btn btnDelete" onClick={() => destroy(category.id)}><FaTrash size={20} color="#fff" /></button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <Pagination
                        total={paginate?.total}
                        current_page={paginate.current_page}
                        per_page={paginate.per_page}
                        first_page={paginate?.first_page}
                        last_page={paginate?.last_page}
                        onPageLink={link}
                    />

                </div>
            </div>
        </Layout>

    )

}

export default CategoryList