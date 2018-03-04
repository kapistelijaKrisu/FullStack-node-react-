import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
        const filterValue = event.target.value
        this.props.setFilter(filterValue)
    }
    render() {
      const style = {
        marginBottom: 10
      }
  
      return (
        <div style={style}>
          filter <input onChange={this.handleChange}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }
  const ConnectedFilter = connect(
    null,
    {  setFilter }
  
  )(Filter)
  
  export default ConnectedFilter