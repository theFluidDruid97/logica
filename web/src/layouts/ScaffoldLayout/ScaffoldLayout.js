import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { Link, routes, navigate } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}) => {
  return (
    <Box>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()}>{title}</Link>
        </h1>
        <Button onClick={() => navigate(routes[buttonTo]())} color="success">
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Button>
      </header>
      <Box>{children}</Box>
    </Box>
  )
}

export default ScaffoldLayout
