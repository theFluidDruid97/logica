import { useRef } from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const LoginPage = () => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { isAuthenticated, logIn } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])
  const eMailRef = useRef(null)
  useEffect(() => {
    eMailRef.current?.focus()
  }, [])
  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.eMail,
      password: data.password,
    })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }
  let cardGradient
  let cardShadow
  mode === 'light'
    ? (cardGradient =
        'to bottom right, rgba(205, 133, 63, 0.4), rgba(255, 255, 255, 0.8)')
    : (cardGradient =
        'to top right, rgba(0, 128, 128, 0.4), rgba(0, 0, 0, 0.8)')
  mode === 'light'
    ? (cardShadow = '7px 7px 5px #212121')
    : (cardShadow = '-7px 7px 5px black')

  return (
    <>
      <MetaTags title="Login" />

      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
        padding="2.5%"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: 'solid 2px black',
            width: '40%',
            height: '100%',
            background: `linear-gradient(${cardGradient})`,
            boxShadow: `${cardShadow}`,
          }}
        >
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <Typography variant="h3" color="text.secondary" marginTop="2.5%">
            WELCOME TO
          </Typography>
          <img
            src={
              mode === 'light'
                ? '/TrainTrackLogo.png'
                : '/TrainTrackLogoDark.png'
            }
            width="90%"
            alt="TrainTrack"
          />
          <Box width="40%" marginBottom="5%" className="rw-segment">
            <Box className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </Box>
            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <Box
                display="flex"
                flexDirection="column"
                backgroundColor={
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.2)'
                }
                marginTop="15px"
                paddingX="10%"
              >
                <Label
                  name="eMail"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  E-Mail
                </Label>
                <TextField
                  name="eMail"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  ref={eMailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'E-Mail is required',
                    },
                  }}
                />
                <FieldError name="eMail" className="rw-field-error" />

                <Label
                  name="password"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="rw-field-error" />
                <Link
                  to={routes.forgotPassword()}
                  className={
                    mode === 'light' ? 'rw-forgot-link' : 'rw-forgot-link-dark'
                  }
                >
                  Forgot Password?
                </Link>
                <Button
                  variant={mode === 'light' ? 'contained' : 'outlined'}
                  type="submit"
                  sx={{ marginY: '5%' }}
                >
                  Log In
                </Button>
                <Button
                  color="grey"
                  variant={mode === 'light' ? 'contained' : 'outlined'}
                  onClick={() => navigate(routes.signup())}
                  sx={{ marginBottom: '10%' }}
                >
                  Sign Up
                </Button>
              </Box>
            </Form>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default LoginPage
