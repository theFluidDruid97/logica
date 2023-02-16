import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Box from '@mui/material/Box'
import {
  red,
  orange,
  yellow,
  green,
  blue,
  indigo,
  purple,
  grey,
  deepPurple,
} from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useAuth } from '@redwoodjs/auth'
import { Toaster } from '@redwoodjs/web/toast'

import { ThemeModeContext } from '../../App.js'
import { GeneralContext } from '../../App.js'
import DrawerListItems from '../../components/DrawerListItems/DrawerListItems.js'
import DrawerListItemsAdmin from '../../components/DrawerListItemsAdmin/DrawerListItemsAdmin.js'
import Navigation from '../../components/Navigation/Navigation.js'
import {
  Drawer,
  DrawerHeader,
} from '../../components/NavigationFunctions/NavigationFunctions.js'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' && {
        main: deepPurple[900],
      }),
      ...(mode === 'dark' && {
        main: 'rgb(255,255,255)',
      }),
    },
    ...(mode === 'light' && {
      divider: deepPurple[900],
    }),
    ...(mode === 'dark' && {
      divider: 'rgb(255,255,255)',
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: grey[100],
            secondary: grey[200],
          }),
    },
    red: {
      light: red[500],
      main: red[700],
      dark: red[900],
      contrastText: grey[50],
    },
    orange: {
      light: orange[400],
      main: orange[500],
      dark: orange[600],
      contrastText: grey[50],
    },
    yellow: {
      light: yellow[500],
      main: yellow[600],
      dark: yellow[700],
      contrastText: grey[900],
    },
    green: {
      light: green[500],
      main: green[700],
      dark: green[900],
      contrastText: grey[50],
    },
    blue: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
      contrastText: grey[50],
    },
    indigo: {
      light: indigo[400],
      main: indigo[500],
      dark: indigo[600],
      contrastText: grey[50],
    },
    purple: {
      light: purple[500],
      main: purple[700],
      dark: purple[900],
      contrastText: grey[50],
    },
    grey: {
      light: grey[400],
      main: grey[500],
      dark: grey[600],
      contrastText: grey[50],
    },
  },
})

const GeneralLayout = ({ children }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { open, setOpen } = React.useContext(GeneralContext)
  const { isAuthenticated } = useAuth()
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [setMode],
    localStorage.setItem('mode', [mode])
  )

  mode === 'light'
    ? (document.querySelector('body').style.background = 'white')
    : (document.querySelector('body').style.background =
        'linear-gradient(310deg, rgba(49,27,146,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)')

  return (
    <Box sx={{ display: 'flex' }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
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
          <Box width="100%" paddingX="1%" paddingY="1%">
            <DrawerHeader />
            <Toaster />
            {children}
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  )
}

export default GeneralLayout
