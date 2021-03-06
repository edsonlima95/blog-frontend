import axios from 'axios';
import { getCookie, removeCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

export function apiCtx(ctx: GetServerSidePropsContext | undefined = undefined) {

    const cookie = getCookie('blog.token', ctx)

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_APP_URL_API,
        headers: {
            Authorization: `Bearer ${cookie}`
        }
    })

    api.interceptors.response.use(response => {

        return response

    }, (error) => {
        if (error.response.status === 401) {
            removeCookies('blog.token', ctx)

            Router.push("/admin/login")
        }

        return Promise.reject(error)

    })

    return api

}



export const apiWeb = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_WEB_URL,
})

