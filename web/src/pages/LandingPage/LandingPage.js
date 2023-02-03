import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { useAuth } from '@redwoodjs/auth'
import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LandingPage = () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) {
    navigate(routes.home())
  }
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <Box
        display="flex"
        width="100%"
        height="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '80%',
            justifyContent: 'space-around',
            background:
              'linear-gradient(to top right, rgba(218, 165, 32, 0.4), rgba(255, 255, 255, 0.4))',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h1" color="text.secondary" component="div">
              Welcome
            </Typography>
            <Typography variant="h1" color="text.secondary" component="div">
              to
            </Typography>
            <img src="/TrainTrackLogo.png" height="200" alt="TrainTrack" />
            <Divider />
          </CardContent>
          <CardActions>
            <Button size="large" onClick={() => navigate(routes.login())}>
              Log In
            </Button>
            <Button size="large" onClick={() => navigate(routes.signup())}>
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default LandingPage
