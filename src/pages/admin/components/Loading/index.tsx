import styles from './styles.module.scss'


function Loading({ load }) {

    if (load) {
        return (
            <div className={styles.loading}><img src="/images/loading.gif" alt="loading..." /></div>
        )
    }

    return (<></>)
}

export default Loading