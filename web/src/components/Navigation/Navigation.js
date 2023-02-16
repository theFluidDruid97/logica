import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'

import { ThemeModeContext } from '../../App.js'
import { GeneralContext } from '../../App.js'
import { DarkModeSwitch } from '../../components/DarkModeSwitch/DarkModeSwitch.js'
import { AppBar } from '../../components/NavigationFunctions/NavigationFunctions.js'
import { LogicaLogo } from '../../LogicaLogo.js'
import { Notify } from '../Notification/Notification.js'

const Navigation = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { open, setOpen } = React.useContext(GeneralContext)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [setMode]
  )

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {isAuthenticated ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            paddingTop: '10px',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            <Link to={routes.login()}>
              <Box className="logo-dark">
                <LogicaLogo height={40} />
              </Box>
            </Link>
          </Typography>
          {isAuthenticated ? (
            <Box>
              {Notify(currentUser)}
              <Button color="inherit">
                <Badge color="secondary" badgeContent={1}>
                  <NotificationsIcon />
                </Badge>
              </Button>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircleIcon />
                {currentUser.email}
                <ExpandMoreIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={colorMode.toggleColorMode}>
                  <DarkModeSwitch checked={mode === 'light'} />
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate(routes.airman({ id: currentUser.id }))
                  }
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Profile
                  <PersonIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(routes.settings())}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Settings
                  <SettingsIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => (logOut(), setAnchorEl(null), setOpen(false))}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  Log Out
                  <LogoutIcon />
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <DarkModeSwitch
              checked={mode === 'light'}
              onClick={colorMode.toggleColorMode}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
