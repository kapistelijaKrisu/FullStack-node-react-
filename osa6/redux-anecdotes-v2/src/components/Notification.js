import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    console.log(this.props)
    const { note } = this.props
    
    return (
      <div style={style}>
        {note}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.note
  }
}
const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification

