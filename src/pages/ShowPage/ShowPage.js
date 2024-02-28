import { useState, useEffect } from 'react'
import Blog from '../../components/Blog/Blog'
import UpdateForm from '../../components/UpdateForm/UpdateForm'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styles from './ShowPage.module.scss'

export default function ShowPage (props) {
    const [showUpdate, setShowUpdate] = useState(false)
    const [allowChanges, setAllowChanges] = useState(false)
    const [blog, setBlog] = useState({
        title: '',
        body:'',
        user: ''
    })
    const navigateTo = useNavigate()
    const {id} = useParams() // FE version of req.params
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await props.getIndividualBlog(id)
                setBlog(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlog()
    }, [])

    // checking token and user in localStorage
    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'))
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    useEffect (() => {
        if (blog && props.user._id === blog.user) {
                setAllowChanges(true)
        }
    }, [props.user, blog])

    const handleDelete = async () => {
        try {
            await props.deleteBlog(id, props.token)
            navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className={styles.showPage}>
            <Link to={'/'} className={styles.link}>Go to Home Page</Link>
            <h1 className={styles.header}>{blog?.title || 'Loading...'}</h1>
            <p className={styles.blogBody}>{blog?.body || ''}</p>
            { allowChanges ?
            <button className={styles.button} onClick={() => setShowUpdate(!showUpdate)}>Reveal Update Form</button> : <></> }
            {allowChanges && showUpdate ? <UpdateForm id={id} updateBlog={props.updateBlog} setShowUpdate={setShowUpdate} setBlog={setBlog} blog={blog} token={props.token} setToken={props.token}/> : <></>}
            {allowChanges ? <button className={styles.button} onClick={handleDelete}>Delete Blog</button> : <></>}
        </div>
    )
}