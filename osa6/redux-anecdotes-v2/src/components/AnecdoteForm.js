import React from 'react'
import { createJoke } from '../reducers/anecdoteReducer'
import { notify, clearNore } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createJoke(content)
    e.target.anecdote.value = ''
    this.props.notify('new anecdote was created: \'' + content + '\'!')
    setTimeout(() => {
      this.props.clearNore()
    }, 5000)
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
  {  notify, clearNore, createJoke }

)(AnecdoteForm)

export default ConnectedAnecdoteForm
