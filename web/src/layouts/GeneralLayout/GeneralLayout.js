import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Box from '@mui/material/Box'
import { amber, grey, teal } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useAuth } from '@redwoodjs/auth'

import { ThemeModeContext } from '../../App.js'
import { GeneralContext } from '../../App.js'
import DrawerListItems from '../../components/DrawerListItems/DrawerListItems.js'
import DrawerListItemsAdmin from '../../components/DrawerListItemsAdmin/DrawerListItemsAdmin.js'
import Footer from '../../components/Footer/Footer.js'
import Navigation from '../../components/Navigation/Navigation.js'
import {
  Drawer,
  DrawerHeader,
} from '../../components/NavigationFunctions/NavigationFunctions.js'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' && {
        main: amber[500],
      }),
      ...(mode === 'dark' && {
        main: teal['A400'],
      }),
    },
    secondary: {
      ...grey,
    },
    ...(mode === 'light' && {
      divider: amber[500],
    }),
    ...(mode === 'dark' && {
      divider: teal[500],
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
  },
})

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const GeneralLayout = ({ children }) => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const { open, setOpen } = React.useContext(GeneralContext)
  const { isAuthenticated } = useAuth()
  const handleDrawerClose = () => {
    setOpen(false)
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
    ? (document.querySelector('body').style.background =
        'linear-gradient(to top left, goldenrod, white)')
    : (document.querySelector('body').style.background =
        'linear-gradient(to top right, black, teal)')
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
          <Box width="100%" paddingX="1%">
            <DrawerHeader />
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  )
}

export default GeneralLayout
