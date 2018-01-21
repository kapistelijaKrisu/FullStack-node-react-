import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  
    return (
      <div>
          <Otsikko nimi={kurssi.nimi} />
          <Sisalto osat={kurssi.osat} />
          <Yhteensa osat={kurssi.osat} tehtävää />
      </div>
    )
  }
  const Otsikko = (props) => {
    
    return (
        <h1>{props.nimi}</h1>
    )
  }

  const summa = (p1, p2) => p1 + p2
  
  const Yhteensa = (props) => {
    let sum = 0
    props.osat.forEach((olio) => {
      sum = summa(sum,olio.tehtavia)
    })
    
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
  }
  const Sisalto = (props) => { 
    console.log(props) 
    return (
      <div>
        <Osa ukkeli={props.osat[0]} />  
        <Osa ukkeli={props.osat[1]} />  
        <Osa ukkeli={props.osat[2]} />     

      </div>
    )
  }

  const Osa = (props) => {
    return (
      <p>{props.ukkeli.nimi} {props.ukkeli.tehtavia} </p>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)