import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Image } from 'react-bootstrap'


const About = () => (

  <div>
    <Header2 content={'About Anecdote app'} />

    <Grid>
      <Row>
        <Col xs={6} md={4}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={12} md={2}>
          <Image src="https://i.imgur.com/pK97H7i.jpg"  />
        </Col>
      </Row>
    </Grid>
  </div>
)

const Header1 = ({content}) => {
  const headStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 2,
    backgroundColor: 'red',
  }
  return (
    <h1 style={headStyle}> {content} </h1>
  )
}
const Header2 = ({content}) => {
  const headStyle = {
    textAlign: 'center', 
    marginTop: 2,
    backgroundColor: 'orange',
  }
  return (
    <h2 style={headStyle}> {content} </h2>
  )
}
const Footer = () => {
  const footerStyle = {
    paddingTop: 3,
    paddingLeft: 22,
    marginBottom: 5,
    background: 'pink'
  }
  return (
    <div style={footerStyle}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
  )
}

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Header2 content={'create a new anecdote'} />
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}

const Anecdote = ({ anecdote, vote }) => {
  const onPoke = () => {
    vote(anecdote.id)
  }
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p> has {anecdote.votes} votes <button onClick={onPoke}>vote</button></p>

      <p>for more info see <a href={anecdote.info.toString()}>{anecdote.info}</a>
      </p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header2 content={'Anecdotes'} />
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)

const Home = ({ anecdotes }) => (
  <div>
    <AnecdoteList anecdotes={anecdotes} />
  </div>
)

const Menu = () => {

  const menuStyle = {
    textAlign: 'center',
    fontSize: 28,
    paddingTop: 3,
    paddingLeft: 22,
    fontStyle: 'italic',
    marginBottom: 1,
    background: 'lightblue'
  }
  const active = {
    fontWeight: 'bold',
    color: 'yellow',
    background: 'purple'
  }


  return (
    <div style={menuStyle}>
      <NavLink exact to="/" activeStyle={active}>home</NavLink> &nbsp;
    <NavLink to="/create" activeStyle={active}>create new</NavLink> &nbsp;
    <NavLink to="/about" activeStyle={active}>about</NavLink>
    </div>
  )
}

const Notification = ({ notification }) => {
  const notificationStyle = {
    paddingTop: 10,
    paddingLeft: 22,
    border: 'solid',
    borderWidth: 31,
    marginBottom: 5,
    color: 'blue'
  }
  const hideWhenEmpty = { display: notification === '' ? 'none' : '' }
  return (

    <div style={hideWhenEmpty}>
      <div style={notificationStyle}>
        <p>{notification}</p>
      </div>
    </div>
  )

}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'a new anecdote ' + anecdote.content + ' created'
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000);
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({
      anecdotes,
      notification: anecdote.content + ' has been voted!'
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 5000);
  }



  render() {
    const jokeById = (id) => {
      return (
        this.state.anecdotes.find(joke => Number(joke.id) === Number(id))
      )
    }
    return (
      <div>
        <Header1 content={'Software anecdotes'} />
        <Router>
          <div>
            <Menu />
            <Notification notification={this.state.notification} />
            <div>
            </div>
            <Route exact path="/" render={() =>
              <Home anecdotes={this.state.anecdotes} />}
            />
            <Route exact path="/anecdote/:id" render={({ match, history }) =>
              <Anecdote
                anecdote={jokeById(match.params.id)}
                vote={this.vote}
              />}
            />
            <Route path="/create" render={({ history }) =>
              <CreateNew history={history} addNew={this.addNew} />} />
            <Route path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }

}

export default App;
