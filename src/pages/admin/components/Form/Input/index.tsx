import styles from './styles.module.scss';
import { InputHTMLAttributes, ComponentType, forwardRef, ForwardRefRenderFunction } from "react";
import { IconBaseProps } from "react-icons/lib";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    type: string,
    label: string,
    icon?: ComponentType<IconBaseProps>
}


const Input = forwardRef<HTMLInputElement, InputProps>(({ name, type, label, icon: Icon, ...rest }, ref) => {

    return (

        <div className="form-group">
            {Icon && <Icon />}
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input type={type} name={name} {...rest} ref={ref} className={styles.input} />
        </div>
    )

})

export default Input