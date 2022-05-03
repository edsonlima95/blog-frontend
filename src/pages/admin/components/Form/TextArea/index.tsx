import styles from '../Input/styles.module.scss';

import {  forwardRef, ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>   {
    title: string;
}


const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({title,...rest}, ref) => {

    return (

        <div className="form-group">
            <label htmlFor={title} className={styles.label}>{title}</label>
            <textarea  {...rest} ref={ref} className={styles.input} ></textarea>
        </div>
    )

})

export default TextArea