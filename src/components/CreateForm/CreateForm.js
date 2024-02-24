import { useState } from 'react'


export default function CreateForm(props) {
    const [ formData, setFormData ] = useState({
        title: '',
        body: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await props.createBlog(formData, props.token)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    } 

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create A New Blog Post, {props.user.name}</h2>
            <input placeholder="Title" type="text" name="title" value={formData.title} onChange={handleChange} />
            <input placeholder="Body" type="text" name="body" value={formData.body} onChange={handleChange} />
            <input type="submit" value="Create Blog" />
        </form>
    )
}