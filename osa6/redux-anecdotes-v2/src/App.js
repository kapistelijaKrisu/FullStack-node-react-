import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {

  render() {
    console.log(this.props)
   // const notification = this.props.store.getState().note && <Notification store={this.props.store} />
  const notification = <Notification />
   console.log(notification)
    return (
      <div>
        <h1>Programming anecdotes</h1>
        {notification}
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App