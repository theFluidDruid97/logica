import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { amber, grey, red, teal } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { ThemeModeContext } from '../../App.js'
import { DarkModeSwitch } from '../../components/DarkModeSwitch/DarkModeSwitch.js'
import DrawerListItems from '../../components/DrawerListItems/DrawerListItems.js'
import DrawerListItemsAdmin from '../../components/DrawerListItemsAdmin/DrawerListItemsAdmin.js'
import {
  AppBar,
  Drawer,
  DrawerHeader,
} from '../../components/Navigation/Navigation.js'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: teal['A400'],
      }),
    },
    secondary: {
      ...grey,
    },
    warning: {
      ...red,
    },
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
})

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const GeneralLayout = ({ children }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)
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
    []
  )
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  mode === 'light'
    ? (document.querySelector('body').style.background = 'none')
    : (document.querySelector('body').style.background =
        'linear-gradient(to top right, black, teal)')

  return (
    <Box sx={{ display: 'flex' }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" noWrap component="div">
                  <Link to={routes.home()}>TrainTrack</Link>
                </Typography>
                {isAuthenticated ? (
                  <Box>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      variant="grey"
                    >
                      {currentUser.email}
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
                      <MenuItem>
                        <DarkModeSwitch
                          checked={mode === 'light'}
                          onClick={colorMode.toggleColorMode}
                        />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={logOut}>Log Out</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          {isAuthenticated ? (
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <DrawerListItems />
              </List>
              <Divider />
              <List>
                <DrawerListItemsAdmin />
              </List>
            </Drawer>
          ) : (
            <></>
          )}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  )
}

export default GeneralLayout
