import React from 'react'
import { voteJoke } from '../reducers/anecdoteReducer'
import { notify, clearNore } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  voteFunction(anecdote) {
    this.props.voteJoke(anecdote.id)

    this.props.notify('you voted \'' + anecdote.content + '\'')
    setTimeout(() => {
      this.props.clearNore()
    }, 5000)
  }

  render() {
    
    const anecdotes = () => {
      const { jokes, filter } = this.props    
      return jokes.filter(joke => joke.content.includes(filter))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    jokes: state.jokes,
    filter: state.filter
  }
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteJoke, notify, clearNore }

)(AnecdoteList)

export default ConnectedAnecdoteList
