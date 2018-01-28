import React from 'react';
import noteService from './services/persons'
import './App.css'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: ''

        }
    }
    componentWillMount() {
        noteService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            }).catch(error => {
                console.log(error)
            })
    }

    add = (event) => {
        event.preventDefault()
        let ukkeliObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        const personsNames = () => this.state.persons.map(ukkeli => ukkeli.name)

        if (personsNames().includes(ukkeliObject.name) === true) {

            if (window.confirm('Olet vaihtamassa ukkelin numeroa: ' + ukkeliObject.name)) {
                let array = []
                this.state.persons.forEach(element => {

                    if (element.name === ukkeliObject.name) {
                        ukkeliObject.id = element.id
                        array.push(ukkeliObject)
                        noteService.update(ukkeliObject.id, ukkeliObject)
                            .then(ukkeli => {
                                this.setState({ message: 'ukkelin nimi viahdettu' })
                                setTimeout(() => {
                                    this.setState({ message: null })
                                }, 5000) })
                            .catch(error => {
                                console.log(error)
                                this.setState({ message: null })
                                window.confirm('ukkelisi on jo poistetty..lisätään: ' + ukkeliObject.name)
                                noteService.create(ukkeliObject)
                            })

                    } else {
                        array.push(element)
                    }
                });
                this.setState({
                    persons: array
                });
            }
        }

        else if (ukkeliObject.name !== '') {
            noteService
                .create(ukkeliObject)
                .then(newUkkeli => {
                    this.setState({
                        persons: this.state.persons.concat(newUkkeli),
                        message: 'ukkelisi on luotu'
                    })
                    setTimeout(() => {
                        this.setState({ message: null })
                    }, 5000)

                }).catch(error => {
                    console.log(error)
                    this.setState({ message: null })
                })
        }
        this.setState({
            newName: '',
            newNumber: '',
            filter: this.state.filter,
        })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    handleDelete = (toDel) => {
        return () => {
            if (window.confirm('Olet poistamassa ukkelia: ' + toDel.name)) {
                let array = this.state.persons;
                const remains = array.filter(person => person.id !== toDel.id)

                noteService
                    .deleteOne(toDel.id)
                    .then(yay => {
                        this.setState({
                            persons: remains,
                            message: 'ukkelisi poistettu'
                        });
                        setTimeout(() => {
                            this.setState({ message: null })
                        }, 5000)
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({ 
                            persons: remains,
                            message: null })
                    })

            }
        }
    }


    render() {
        const filter = this.state.filter.toString().toLowerCase()
        const notesToShow = this.state.persons.filter(note => note.name.toString().toLowerCase().includes(filter))
        const rivit = () => notesToShow.map(person => <Note key={person.name} app={this} note={person} />)

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message} />
                <Filter app={this} />
                <h2>Lisää uusi</h2>
                <Formi app={this} />
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {rivit()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const Filter = ({ app }) => {
    return (
        <div>
            <span>rajaa nimellä</span>
            <input
                value={app.state.filter}
                onChange={app.handleFilterChange}
            />
        </div>
    )
}
const Formi = ({ app }) => {
    return (
        <div>
            <form onSubmit={app.add}>
                <div>
                    <span>nimi:</span>
                    <input
                        value={app.state.newName}
                        onChange={app.handleNameChange}
                    />
                </div>
                <div>
                    <span>numero:</span>
                    <input
                        value={app.state.newNumber}
                        onChange={app.handleNumberChange}
                    />
                </div>
                <button type="submit">tallenna</button>
            </form>
        </div>
    )
}

const Note = ({ note, app }) => {
    return (
        <tr>
            <td>{note.name}</td>
            <td>{note.number}</td>
            <td><button type="submit" onClick={app.handleDelete(note)}>poista</button></td>
        </tr>
    )
}

const Notification = ({ message }) => {
    if (message === null || message === '') {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default App