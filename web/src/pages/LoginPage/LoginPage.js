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
        'to bottom right, rgba(218, 165, 32, 0.4), rgba(255, 255, 255, 0.8)')
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
            height="125"
            alt="TrainTrack"
          />
          <Box width="40%" marginBottom="5%" className="rw-segment">
            <Box marginBottom="5%" className="rw-segment-header">
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
                  color="secondary"
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

      {/* <Box
        display="flex"
        width="100%"
        height="80vh"
        marginTop="2%"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            border: 'solid 2px black',
            padding: '2%',
            background: `linear-gradient(to top right, ${cardGradient})`,
            boxShadow: `${cardShadow}`,
          }}
        >
          <Typography variant="h3" color="text.secondary">
            WELCOME TO
          </Typography>
          <img
            src={
              mode === 'light'
                ? '/TrainTrackLogo.png'
                : '/TrainTrackLogoDark.png'
            }
            height="125"
            alt="TrainTrack"
          />
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <Box width="50%" margin="10%" className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <Box className="rw-segment-main">
              <Form
                onSubmit={onSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '0.875rem',
                  alignItems: 'center',
                }}
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

                <Box className="rw-forgot-link">
                  <Link
                    to={routes.forgotPassword()}
                    className={
                      mode === 'light'
                        ? 'rw-forgot-link'
                        : 'rw-forgot-link-dark'
                    }
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <FieldError name="password" className="rw-field-error" />

                <Button
                  variant="outlined"
                  type="submit"
                  style={{ width: '200px', margin: '5%' }}
                >
                  Log In
                </Button>
              </Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography color="#a0aec0" fontSize="0.75rem">
                  Don&apos;t have an account?
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(routes.signup())}
                  style={{
                    width: '200px',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box> */}
    </>
  )
}

export default LoginPage
