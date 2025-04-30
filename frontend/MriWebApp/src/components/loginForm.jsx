import { useState } from "react"

function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleSubmit = (e, q) => {
        e.preventDefault()
        alert(username)
        setPassword(q.target.value)
        setUsername(e.target.value)
        setLoading(false)
        
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit="handleSubmit" className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
            <button type="submit" className="login-button">Login</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default LoginForm