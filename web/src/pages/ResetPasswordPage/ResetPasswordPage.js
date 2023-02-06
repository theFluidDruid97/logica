import { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, PasswordField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const ResetPasswordPage = ({ resetToken }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  let cardGradient
  let cardShadow
  mode === 'light'
    ? (cardGradient =
        'to bottom right, rgba(205, 133, 63, 0.4), rgba(255, 255, 255, 0.4)')
    : (cardGradient =
        'to top right, rgba(0, 128, 128, 0.4), rgba(0, 0, 0, 0.8)')
  mode === 'light'
    ? (cardShadow = '7px 7px 5px #212121')
    : (cardShadow = '-7px 7px 5px black')

  return (
    <>
      <MetaTags title="Reset Password" />

      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
        padding="5%"
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            border: 'solid 2px black',
            width: '25%',
            height: '100%',
            background: `linear-gradient(${cardGradient})`,
            boxShadow: `${cardShadow}`,
          }}
        >
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <Box width="80%" className="rw-segment">
            <Box marginBottom="5%" className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Reset Password
              </h2>
            </Box>

            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <Box
                backgroundColor={
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.2)'
                }
                paddingX="10%"
                paddingBottom="10%"
                paddingTop="5%"
              >
                <Label
                  name="password"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  New Password
                </Label>
                <PasswordField
                  name="password"
                  autoComplete="new-password"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  disabled={!enabled}
                  ref={passwordRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'New Password is required',
                    },
                  }}
                />

                <FieldError name="password" className="rw-field-error" />

                <div className="rw-button-group">
                  <Button
                    type="submit"
                    variant={mode === 'light' ? 'contained' : 'outlined'}
                    disabled={!enabled}
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </Form>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ResetPasswordPage
