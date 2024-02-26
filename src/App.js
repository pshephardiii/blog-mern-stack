import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    const signUp = async (credentials) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            // need to stringify data.user because it's an object and you can't store objects in localStorage
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            const tokenData = data.token
            localStorage.setItem('token', tokenData)
            setToken(tokenData)
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
    }

    const createBlog = async (blogData, token) => {
        if(!token) {
            return
        }
        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }
    
    const getAllBlogs = async () => {
        try {
            const response = await fetch('/api/blog')
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const getIndividualBlog = async (id) => {
        try {
            const response = await fetch(`/api/blog${id}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const updateBlog = async (newBlogData, id, token) => {
        if(!token) {
            return
        }
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorizaton': `Bearer ${token}`
                },
                body: JSON.stringify(newBlogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBlog = async (id, token) => {
        if(!token) {
            return
        }
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorizaton': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className={styles.App}>
            <div className={styles.banner}>
                <h1>Paul's Awesome Blog!</h1>
            </div>
            <Routes>
                <Route path="/" element={
                <HomePage 
                    user={user} 
                    token={token} 
                    setToken={setToken} 
                    setUser={setUser}
                    getAllBlogs={getAllBlogs}
                    createBlog={createBlog}
                />}></Route>
                <Route path="/register" element={
                <AuthPage 
                    setUser={setUser} 
                    setToken={setToken} 
                    signUp={signUp} 
                    login={login}
                />}></Route>
                <Route path="/blog" element={
                <ShowPage 
                    user={user} 
                    token={token} 
                    setToken={setToken} 
                    getIndividualBlog={getIndividualBlog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                />}></Route>
            </Routes>
        </div>
    )
}