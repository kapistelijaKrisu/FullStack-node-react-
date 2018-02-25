import React from 'react'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joke: '',
      error: null
    }
  }

  handleJokeChange = (event) => {

    const jokec = event.target.value
    this.setState({ joke: jokec })
  }

  vote = (nappi, id, store) => () => {
    console.log(nappi)
    store.dispatch({ type: nappi, data: { 'id': id } })
  }

  create = (nappi, content, store) => (event) => {
    event.preventDefault()
    const duplicate = store.getState().find(n => n.content === content)
    if (duplicate === undefined) {
      console.log(event)
      store.dispatch({ type: nappi, data: { 'content': content } })
      this.setState({ joke: '' })
    } else {
      this.setState({ error: 'this joke already exists' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    }
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <p>{this.state.error}</p>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button
                onClick={this.vote(
                  'VOTE',
                  anecdote.id,
                  this.props.store
                )}
              >vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div>
            <input
              type="text"
              name="joke"
              value={this.state.joke}
              onChange={this.handleJokeChange}
            />
          </div>
          <button
            onClick={this.create(
              'ADD',
              this.state.joke,
              this.props.store
            )}
          >create</button>
        </form>
      </div>
    )
  }
}

export default App