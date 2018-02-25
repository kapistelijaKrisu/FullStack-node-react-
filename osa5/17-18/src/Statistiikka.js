import React from 'react';

const Statistiikka = ({votes, reset}) => {
    const total = votes.good+votes.ok+votes.bad
  
    if (total === 0) {
      return (
        <div>
          <h2>stataistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
          {votes.good}
        </div>
      )
    }

    
    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{votes.good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{votes.ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{votes.bad}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{(votes.good - votes.bad) / total}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{votes.good / (total) * 100 +'%'}</td>
            </tr>
          </tbody>
        </table>
  
        <button onClick={reset}>>nollaa tilasto</button>
    
      </div >
    )
  }

  export default Statistiikka