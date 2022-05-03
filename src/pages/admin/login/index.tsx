import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import ShowErrorMessage from '../components/Form/Message';
import { useContext, useEffect } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { getCookie } from 'cookies-next';
import  Router  from 'next/router';
import { toast } from 'react-toastify';

type FormValue = {
    email: string,
    password: string
}

function Login() {

    const cookie = getCookie('blog.token')

    useEffect(() => {
        if (cookie) {
            Router.push("/admin")
        }
    }, [])

    const { login } = useContext(AuthContext)

    const schema = yup.object({
        email: yup.string()
            .email("email não tem um formato válido")
            .required("E-mail é obrigatório"),

        password: yup.string().min(4, "Password no minimo 4 caracteres").required("Senha é obrigatório"),
    })

    const { handleSubmit, register, formState: { errors } } = useForm<FormValue>({
        resolver: yupResolver(schema),
    })

    async function onSubmit(data: FormValue) {

        const { email, password } = data

        try {

            await login({ email, password })

        } catch (e: any) {
            toast.error(e.response?.data.error)
        }
    }

    return (

        <div className={`${styles.login} d-flex justify-content-center align-items-center`}>

            <form onSubmit={handleSubmit(onSubmit)} className={`col-lg-3 ${styles.loginForm}`}>
                <div className="text-center mb-3">
                    <FaLock />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" {...register("email")} placeholder="Digite o email" />
                    <ShowErrorMessage error={errors.email?.message} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control mt-4" {...register("password")} placeholder="Digite a senha" />
                    <ShowErrorMessage error={errors.password?.message} />

                </div>

                <button type="submit" className={`${styles.btnSignIn} btn`}>Entrar</button>

            </form>

        </div>

    )

}

export default Login