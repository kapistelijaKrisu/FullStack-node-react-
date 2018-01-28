import React from 'react'


const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => { <h1>{props.nimi}</h1> }

const Yhteensa = ({ osat }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const tehtavaMaara = () => osat.map(osa => osa.tehtavia)
    const sum = tehtavaMaara().reduce(reducer)
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}
const Sisalto = ({ osat }) => {
    const rivit = () => osat.map(osa => <Osa key={osa.id} ukkeli={osa} />)
    return (
        <div>
            {rivit()}
        </div>
    )
}

const Osa = ({ ukkeli }) => { <p>{ukkeli.nimi} {ukkeli.tehtavia} </p> }

export default Kurssi
