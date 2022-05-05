/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import Select from 'react-select'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../components/Form/Input'
import ShowErrorMessage from '../components/Form/Message'
import Button from '../components/Form/Button';
import Layout from '../layout';
import TextArea from '../components/Form/TextArea';
import { useEffect, useRef, useState } from 'react';
import { apiCtx } from '../../../services/axios';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import  Router from 'next/router';
import { FaList, FaTrash } from 'react-icons/fa';
import api from '../../../services/api';
import Link from 'next/link';
import { Editor } from '@tinymce/tinymce-react';
import { getCookie } from 'cookies-next';


type Category = {
    id?: number,
    title: string,
    description: string,
}

type Image = {
    id: number,
    name: string,
    post_id: number,
}

type Post = {
    id?: number,
    user_id: number,
    title: string,
    sub_title?: string,
    cover: string,
    description: string,
    categories: Category[],
    images?: Image[]
}

interface FormValue extends Post {
    [x: string]: any;
    files: [],
    category_ids: { label: string, value: number }[]
}

type PostProps = {
    post: Post,
    error: any
}

type User = {
    id: number,
    first_name: string,
    email: string
}

function Post({ post }: PostProps) {

    const [categories, setCategories] = useState<Category[]>([])
    const [user, setUser] = useState<User>({} as User)

    useEffect(() => {
        
        //obtem o usuario logado
        const user = JSON.parse(sessionStorage.getItem('blog.user') as string)
        setUser(user)

        //Obtem as categorias
        api.get("/categories").then((response) => {
            const { data } = response.data
            setCategories(data)
        }).catch((error) => {
            console.error(error)
        })

    }, [])

    //obtem as categorias do post 
    const post_categories = post?.categories.map(category => (
                                { label: category.title, value: category.id }))


    //Validações dos campos
    const schema = yup.object({
        title: yup.string().required("Titulo é obrigatório"),
        category_ids: yup.array().required("Categória é obrigatório"),
        description: yup.string().required("Descrição é obrigatório")
    })

    const { handleSubmit, setValue, register, control, formState: { errors } } = useForm<FormValue>({
        defaultValues: { category_ids: post_categories },
        resolver: yupResolver(schema)
    })

    //Seta os campos para edição
    if (post?.id) {
        setValue("id", post?.id)
        setValue("user_id", user.id)
        setValue("title", post?.title)
        setValue("sub_title", post?.sub_title)
        setValue("description", post?.description)
    }

    const onSubmit: SubmitHandler<FormValue> = async (data) => {

        //Obtem só os id das categorias
        const categories = data.category_ids.map((category) => category.value)

        if (post?.id) {

            const dataForm = new FormData();

            for (const key of Object.keys(data.files)) {
                dataForm.append('files', data.files[parseInt(key)]);
            }

            dataForm.append('id', String(post.id));
            dataForm.append('cover', data.cover[0]);
            dataForm.append('user_id', String(user.id));
            dataForm.append('title', data.title);
            dataForm.append('sub_title', data?.sub_title ? data.sub_title : '');
            dataForm.append('description', data.description);

            categories.forEach(field => {
                dataForm.append('categories[]', field);
            })

            update(dataForm)

        } else {

            const dataForm = new FormData();

            for (const key of Object.keys(data.files)) {
                dataForm.append('files', data.files[parseInt(key)]);
            }

            dataForm.append('cover', data.cover[0]);
            dataForm.append('user_id', String(user.id));
            dataForm.append('title', data.title);
            dataForm.append('sub_title', data?.sub_title ? data.sub_title : '');
            dataForm.append('description', data.description);
            categories.forEach(field => {
                dataForm.append('categories[]', field);
            })


            create(dataForm)

        }
    }

    async function create(data: FormValue | FormData) {

        await api.post("/posts", data)
        toast.success("Cadastrada com sucesso")

    }

    async function update(data: FormValue | FormData) {

        await api.put(`/posts/${data.get('id')}`, data)
        toast.success("alterado com sucesso")
        Router.push("/admin/post")
    }

    async function removeImage(image: Image, post_id: number) {
        await api.get(`/posts/remove-image/${image.id}`)
        Router.push(`/admin/post/${post_id}`)
    }

    return (
        <Layout title="Cadastro de posts">
            <div className="box">
                <Link href="/admin/post" passHref>
                    <button className="btn btnAdd"><FaList size={25} color="#fff" /></button>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className="row ">
                  
                    <div className="col-sm-12 col-md-5 col-lg-4">
                        <Input type="text"
                            label="Titulo"
                            {...register('title')}
                        />
                        <ShowErrorMessage error={errors.title?.message} />
                    </div>
                  
                    <div className="col-sm-12 col-md-5 col-lg-4">
                        <Input type="text"
                            label="Sub titulo"
                            {...register('sub_title')}
                        />
                    </div>
                  
                    <div className="col-sm-12 col-md-2 col-lg-4">
                        <Input type="file"
                            label="Avatar"
                            id="input-cover"
                            {...register('cover')}
                        />
                        <ShowErrorMessage error={errors.cover?.message} />
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <label style={{ color: '#c6c6c6', marginBottom: "15px" }}>Categorias</label>
                        <Controller
                            name="category_ids"
                            control={control}
                            render={({ field }) => <Select

                                {...field}
                                options={categories.map(category => ({ label: category.title, value: category.id }))}
                                isMulti={true}
                            // defaultValue={}
                            />}
                        />
                        <ShowErrorMessage error={errors.category_ids?.message} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <Input type="file"
                            label="Imagens"
                            multiple
                            {...register('files')}
                        />

                    </div>
                   
                    <div className="col-sm-12 col-md-12 col-lg-12 mt-5">
                    <ShowErrorMessage error={errors.description?.message} />

                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) =>
                                <Editor
                                    value={value}
                                    onEditorChange={onChange}
                                    apiKey='0geo6rn0a8cfrepv39dvtl791ejumtqmsplpf6ailvgr8dwz'
                                    
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'image | undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help | insert image'
                                        // content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:16px;}'
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center">
                        <Button type="submit" title="ENVIAR" />
                    </div>
                </form>
            </div>

            <div className="col-lg-12 mt-3 box">
                <div className={`${styles.cardImg} p-3`}>
                    {post?.images?.map(image => {
                        return (
                            <div className={styles.imgContainer} key={image.id} >
                                <button style={{ paddingRight: '15px', paddingLeft: '15px' }} onClick={() => removeImage(image, post.id as number)} className='btn btn-danger'><FaTrash /></button>
                                <img alt="" key={image.id} className="rounded" srcSet={`${process.env.APP_URL_API}/post-image/${image.name}`} />
                            </div>
                        )
                    })}
                </div>
            </div>

        </Layout>)

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {


    if (ctx.params?.param !== 'create') {

        const id = ctx.params?.param

        try {
            const response = await apiCtx(ctx).get(`/posts/${id}/edit`)

            return {
                props: {
                    post: response.data
                }
            }
        } catch (e: any) {
            return {
                redirect: {
                    destination: "/admin/post",
                    permanent: false
                }
            }
        }
    }

    return { props: {} }
}
export default Post