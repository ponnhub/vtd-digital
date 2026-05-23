import { Card, CardMedia, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card sx={{ maxWidth: 120}}>
          <CardMedia
        component="img"
        image="assets/images/cropped-logo2.png"
        alt="VTD Logo"
      />
    </Card>
      <h2>VTD Digital Platform, Willkommen!</h2>

      <div>
        <Link to="/home">Startseite</Link>
      </div>
    </div>
  )
}
export default LandingPage
