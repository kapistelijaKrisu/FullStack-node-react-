import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
        }
    }

    clickGood = () => {
        this.setState({
            good: this.state.good + 1
        })
    }

    clickBad = () => {
        this.setState({
            bad: this.state.bad + 1
        })
    }
    clickNeutral = () => {
        this.setState({
            neutral: this.state.neutral + 1
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Otsikko title={'anna palautetta'} />
                    <Button handleClick={this.clickGood} text={'hyvä'} />
                    <Button handleClick={this.clickNeutral} text={'neutraali'} />
                    <Button handleClick={this.clickBad} text={'huono'} />
                    <Otsikko title={'statistiikka'} />
                    <Statistics dataArr={this.state} />

                </div>
            </div>
        )
    }
}

const Otsikko = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ dataArr }) => {
    const total = dataArr.good + dataArr.neutral + dataArr.bad;
    if (total === 0) {
        return (
            <div>
                <div> {'ei yhtään palautetta annettu'} </div>
            </div>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    <Statistic value={dataArr.good} msg={'hyvä'} />
                    <Statistic value={dataArr.neutral} msg={'neutraali'} />
                    <Statistic value={dataArr.bad} msg={'huono'} />
                    <DisplayAvg grades={dataArr} />
                    <DisplayPositivePercentage grades={dataArr} />
                </tbody>
            </table>
        </div>
    )
}
const DisplayAvg = ({ grades }) => {
    const total = grades.good + grades.neutral + grades.bad;
    const value = grades.good - grades.bad
    return (
        <Statistic msg={'keskiarvo'} value={value / total} />
    )
}
const DisplayPositivePercentage = ({ grades }) => {
    const total = grades.good + grades.neutral + grades.bad;

    return (
        <Statistic msg={'positiivisia'} value={grades.good / total * 100} optionalMsg={'%'} />
    )
}
const Statistic = ({ msg, value, optionalMsg }) => {
    // seems like if param is missing it will be ignored, removed optionalMsg check
    return (
        <tr>
            <td>{msg}</td>
            <td>{value} {optionalMsg}</td>
        </tr>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)