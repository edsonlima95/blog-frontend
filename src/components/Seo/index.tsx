

type Seo = {
    title: string,
    description: string
}


function Seo({ title, description }: Seo) {

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
        </>
    )

}

export default Seo