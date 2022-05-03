import { getCookie } from "cookies-next";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { apiCtx } from "../services/axios";


function AuthSSR<P>(fn: GetServerSideProps<P>) {

    return async (ctx: GetServerSidePropsContext) => {


        const cookie = getCookie('blog.token', ctx)

        if (!cookie) {
            return {
                redirect: {
                    destination: '/admin/login',
                    permanent: false //So redireciona uma vez caso entrar
                }
            }
        }

        return await fn(ctx)

    }

}

export default AuthSSR