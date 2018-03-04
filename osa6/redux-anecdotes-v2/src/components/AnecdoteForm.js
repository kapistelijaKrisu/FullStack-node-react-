import React from 'react'
import { createJoke } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createJoke(content)

    this.props.notify('new anecdote was created: \'' + content + '\'!', 5)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jokes: state.jokes
  }
}
const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  { notify, createJoke }

)(AnecdoteForm)

export default ConnectedAnecdoteForm
