// this will be different than bookmarks

import{ useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm'
import Blogs from '../../components/Blogs/Blogs'

export default function HomePage (props) {
    const [blogs, setBlogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    // blogs
    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs()
                setBlogs(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, [])

    // checking token and user in localStorage
    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if (localStorage.token && localStorage.user && !props.user) {
            // JSON.parse turns a string into an object... need to do this to transform user back into object when taking it out of localStorage
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    return(
        <div>
            <h1>Welcome to the Liberty Blog!</h1>
            { showCreate ? <CreateForm user={props.user} createBlog={props.createBlog} token={props.token} /> : <></> }
            { blogs.length ? <Blogs blogs={blogs}/> : 'Sorry our writers are lazy!' }
        </div>
    )
}