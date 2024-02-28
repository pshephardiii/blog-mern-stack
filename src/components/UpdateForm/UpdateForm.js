import styles from './UpdateForm.module.scss'

export default function UpdateForm(props) {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await props.updateBlog(props.blog, props.id, props.token)
            props.setBlog(data)
            props.setShowUpdate(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        props.setBlog({...props.blog, [e.target.name]: e.target.value })
    } 

    return (
        <form className={styles.updateForm} onSubmit={handleSubmit}>
            <h2>Update Blog Below</h2>
            <div className={styles.inputContainer}>
                <input className={styles.input} placeholder="Title" type="text" name="title" value={props.blog.title} onChange={handleChange} />
                <input className={styles.input} placeholder="Body" type="text" name="body" value={props.blog.body} onChange={handleChange} />
             <input className={styles.submit} type="submit" value="Submit Update Data"/>
            </div>
        </form>
    )
}