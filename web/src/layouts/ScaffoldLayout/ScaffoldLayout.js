import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { Link, routes, navigate } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  return (
    <Box>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()}>{title}</Link>
        </h1>
        <Button
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={() => navigate(routes[buttonTo]())}
        >
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Button>
      </header>
      <Box>{children}</Box>
    </Box>
  )
}

export default ScaffoldLayout
