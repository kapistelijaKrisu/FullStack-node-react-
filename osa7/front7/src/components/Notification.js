import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const { note } = props

  if (note === null || note === '') {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {note}
    </div>
  )

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
