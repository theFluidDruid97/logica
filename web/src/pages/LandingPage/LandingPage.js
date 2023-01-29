import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LandingPage = () => {
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
          }}
        >
          <CardContent>
            <Typography
              variant="h1"
              color="text.secondary"
              gutterBottom
              component="div"
            >
              Welcome to TrainTrack
            </Typography>
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
