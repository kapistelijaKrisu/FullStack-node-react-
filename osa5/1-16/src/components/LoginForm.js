import React from 'react'
import PropTypes from 'prop-types'



const LoginForm = ({ username, password, login, handleLoginFieldChange }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>
            <form onSubmit={login}>
                <div>
                    käyttäjätunnus
            <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleLoginFieldChange}
                    />
                </div>
                <div>
                    salasana
            <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleLoginFieldChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    handleLoginFieldChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm