import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer';
import Statistiikka from './Statistiikka'
import { createStore } from 'redux'

const store = createStore(reducer)

class App extends React.Component {
    klik = (nappi) => () => {
        console.log(nappi)
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>

                <Statistiikka votes={store.getState()}
                    reset={this.klik('ZERO')}
                     />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)