import React from 'react'
import { login } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'



class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    login = async (event) => {
        event.preventDefault()
        try {
           this.props.login(this.state.username, this.state.password)           
            this.props.notify('Welcome!', 5)
        } catch (exception) {
            this.props.notify('Username or password incorrect', 5)
        }
        this.setState({ username: '', password: '' })
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Kirjaudu</h2>
                <form onSubmit={this.login}>
                    <span> käyttäjätunnus</span>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleLoginFieldChange}
                    />
                    <br/>
                    <span> salasana</span>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleLoginFieldChange}
                    />
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  const ConnectedLoginForm = connect(
    mapStateToProps,
    {login, notify}
  )(LoginForm)
  
  export default ConnectedLoginForm
  