import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      winner: 0
    }
    this.voteSelected = this.voteSelected.bind(this)
  }
  setRandomSelected = () => {
    const value = getRandomIntDifferent(this.props.anecdotes.length - 1, this.state.selected)
    return () => {
      this.setState({ selected: value })
    }
  }

  voteSelected = (anecdotes) => {
    return () => {
      anecdotes[this.state.selected].votes += 1
      this.winnerUpdate(anecdotes)
      renderoi()
    }

  }

  winnerUpdate = (table) => {
      const votedOnPoints = table[this.state.selected].votes
      const currentWinnerPoints = table[this.state.winner].votes

      if (votedOnPoints > currentWinnerPoints) {
        this.setState({ winner: this.state.selected })
      }
  }

  render() {
    const selectedText = this.props.anecdotes[this.state.selected].txt
    const winnerText = this.props.anecdotes[this.state.winner].txt
    const voteText = 'has ' + this.props.anecdotes[this.state.selected].votes + ' votes'
    return (
      <div>
        <Paragraph text={selectedText} />
        <Paragraph text={voteText} />

        <Button handleClick={this.setRandomSelected()} text={'next'} />
        <Button handleClick={this.voteSelected(this.props.anecdotes)} text={'vote'} />

        <Title text={'Anecdote with most votes'} />
        <Paragraph text={winnerText} />
      </div>
    )
  }
}

const Paragraph = ({text}) => (
  <p>{text}</p>
)

const Title = ({text}) => (
  <h2>{text}</h2>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const anecdotes = [
  { txt: 'If it hurts, do it more often', votes: 0 },
  { txt: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { txt: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { txt: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
  { txt: 'Premature optimization is the root of all evil.', votes: 0 },
  { txt: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

function getRandomIntDifferent(max, current) {
  if (max <= 0) { //should throw error instead fixing
    return 0
  }
  const rolled = getRandomInt(max)
  if (rolled === current) {
    return getRandomInt(max, current)
  }
  return rolled;
}

const renderoi = () => {
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
}

renderoi()
