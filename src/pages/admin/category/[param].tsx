import Layout from '../layout'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next';
import { apiCtx } from '../../../services/axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import Input from '../components/Form/Input';
import ShowErrorMessage from '../components/Form/Message';
import Button from '../components/Form/Button';
import Link from 'next/link';
import { FaList } from 'react-icons/fa';

interface Category {
    id?: number,
    title: string,
    description: string,
}

type CategoryProps = {
    category: Category
}

function Category({ category }: CategoryProps) {

    const router = useRouter();
    const [categoryEdit, setCategoryEdit] = useState<Category>({} as Category)

    const { param } = router.query

    useEffect(() => {

        setCategoryEdit(category)
    }, [])


    const schema = yup.object({
        title: yup.string().required("Titulo é obrigatório")
    })

    const { handleSubmit, setValue, register, formState: { errors } } = useForm<Category>({
        resolver: yupResolver(schema)
    })

    setValue("id", categoryEdit?.id)
    setValue("title", categoryEdit?.title)
    setValue("description", categoryEdit?.description)

    const onSubmit: SubmitHandler<Category> = async (data) => {

        if (categoryEdit?.id) {
            update(data)
            router.push("/admin/category")
        } else {
            create(data)
        }
    }

    async function create(data: Category) {
        await api.post("/categories", data).then(response => {
            toast.success("Cadastrada com sucesso")
        }).catch(error => {
            console.log(error)
        })
    }

    async function update(data: Category) {

        await api.put(`/categories/${data.id}`, data).then(response => {
            toast.success("Atualizada com sucesso")
            router.push("/admin/category")
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout title="Cadastro de categória">
            <div className="box">
                <Link href="/admin/category" passHref>
                    <button className="btn btnAdd"><FaList size={25} color="#fff" /></button>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className="row ">
                    <div className="col col-md-6 col-lg-6">
                        <Input type="text"
                            label="Titulo"
                            {...register('title')}
                        />
                        <ShowErrorMessage error={errors.title?.message} />
                    </div>
                    <div className="col col-md-6 col-lg-6">
                        <Input type="text"
                            label="Descrição"
                            {...register('description')}
                        />
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center">
                        <Button type="submit" title="ENVIAR" />
                    </div>
                </form>
            </div>
        </Layout>
    )

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    if (ctx.params?.param !== 'create') {

        try {
            const id = ctx.params?.param

            const response = await apiCtx(ctx).get(`/categories/${id}/edit`)


            return {
                props: {
                    category: response.data
                }
            }
        } catch (error) {
            
         }

    }


    return { props: {} }
}


export default Category