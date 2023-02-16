import { useEffect, useRef } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const ForgotPasswordPage = () => {
  const { mode } = React.useContext(ThemeModeContext)
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const eMailRef = useRef(null)
  useEffect(() => {
    eMailRef?.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.eMail)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )

      navigate(routes.login())
    }
  }

  let cardGradient
  let cardShadow
  mode === 'light'
    ? (cardGradient = 'white')
    : (cardGradient = 'to top, rgba(49, 27, 146, 0.4), rgba(0, 0, 0, 0.8)')
  mode === 'light'
    ? (cardShadow = '7px 7px 5px #212121')
    : (cardShadow = '7px 7px 5px black')

  return (
    <>
      <MetaTags title="Forgot Password" />

      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
        padding="15%"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: 'solid 2px black',
            width: '30%',
            height: '100%',
            background: `linear-gradient(${cardGradient})`,
            boxShadow: `${cardShadow}`,
          }}
        >
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <Box width="72.5%" className="rw-segment">
            <Box className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </Box>

            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <Box
                display="flex"
                flexDirection="column"
                backgroundColor={
                  mode === 'light'
                    ? 'rgba(200, 200, 200, 0.5)'
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

                <Button
                  type="submit"
                  variant={mode === 'light' ? 'contained' : 'outlined'}
                  sx={{ marginTop: '5%', marginBottom: '10%' }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ForgotPasswordPage
