import React from 'react'
// import PropTypes from 'prop-types'

function AuthImage(props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#282C34',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <img src="/auth_bg.png" width="100%" alt="bg" />
      <div style={{ color: 'white', fontSize: '32px' }}>
        React App
      </div>
    </div>
  )
}

AuthImage.propTypes = {}

export default AuthImage
