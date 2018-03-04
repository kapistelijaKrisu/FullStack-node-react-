import React from 'react'
import { updateJoke } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  async voteFunction(anecdote) {
    anecdote.votes++
    this.props.updateJoke(anecdote)

    this.props.notify(`you voted '${anecdote.content}'`,3)
    
  }

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.voteFunction(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (jokes, filter) => {
  const filtered = jokes.filter(joke => joke.content.includes(filter))
  return filtered.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.jokes, state.filter),
    jokes: state.jokes,
    filter: state.filter
  }
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { updateJoke, notify }

)(AnecdoteList)

export default ConnectedAnecdoteList
