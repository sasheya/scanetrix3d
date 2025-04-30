function Login() {
    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required/>
                </div>
            </form>
        </div>
    )
}