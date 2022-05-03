import styles from './styles.module.scss'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    type: "submit" | 'button' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, title, ...rest }, ref) => {

    return (
        <button type={type} {...rest} ref={ref} className={styles.btnSubmit}>{title}</button>
    )
})

export default Button


