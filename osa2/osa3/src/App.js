import React from 'react';
import './App.css';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: 'fi',
      detailedCountry:''
    }
  }
  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
    this.setState({ detailedCountry:'' })
  }
  handleCountryClick = (country) => {
    return () => {
    this.setState({ detailedCountry: country })
    }
  }

  render() {
    const country = this.state.detailedCountry
    return (
      <div>
        <Filter app={this} />
        <CountryList app={this} />
        <DetailedMessage country={country} />
      </div>
    )
  }
}

const CountryList = ({ app }) => {
  const allCountries = app.state.countries
  const filter = app.state.filter.toString().toLowerCase()
  const filtered = allCountries.filter(json => json.name.toString().toLowerCase().includes(filter))

  const count = filtered.length
  let returnMessage = <EmptyMessage />

  if (count === 0) {
    returnMessage = <EmptyMessage />
  } else if (count === 1) {
    returnMessage = <DetailedMessage country={filtered[0]} />
  } else if (count < 10) {
    returnMessage = <UnderTenMessage countries={filtered} app={app} />
  } else {
    returnMessage = <AbundanceMessage />
  }
  return (
    <div>
      {returnMessage}
    </div>
  )
}

const EmptyMessage = () => <p>No countries matched by the filter</p>
const AbundanceMessage = () => <p>Too many matches, specifu more in filter please</p>
const UnderTenMessage = ({app, countries }) => {
 
  const list = () => countries.map(country => <CountryBasic key={country.name} country={country} app={app} />)
  return (
    <div>
      {list()}
    </div>)
}
const CountryBasic = ({ app, country }) => {
  return (
    <div onClick={app.handleCountryClick(country)}>  {country.name} </div>
  )
}
const DetailedMessage = ({ country }) => {
  if (country ==='') {
    return (<div></div>)
  }
  return (
    <div>
      <h2>{country.name}</h2>
      <p>{country.name}</p>
      <p>{country.population}</p>
      <img src={country.flag} height="200" width="300" alt="flag not found" />
    </div>
  )
}

const Filter = ({ app }) => {
  return (
    <div>
      <span>find countries</span>
      <input
        value={app.state.filter}
        onChange={app.handleFilterChange}
      />
    </div>
  )
}

export default App;
