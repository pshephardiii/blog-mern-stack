import { Link } from 'react-router-dom'
import styles from './Blogs.module.scss'

export default function Blogs(props) {
    return(<div className={styles.blogList}>
        {props.blogs.map((blog) => {
            return(
            <article key={blog._id} className={styles.article}>
                <h3><Link to={`/blog/${blog._id}`} className={styles.link}>{blog.title}</Link></h3>
            </article>)
        })}
    </div>)
}