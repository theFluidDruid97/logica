import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Box from '@mui/material/Box'
import { grey, teal, yellow } from '@mui/material/colors'
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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'light' && {
        main: 'rgb(205, 133, 63)',
      }),
      ...(mode === 'dark' && {
        main: teal[200],
      }),
    },
    secondary: {
      ...grey,
    },
    warning: {
      ...yellow,
    },
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
    ...(mode === 'light' && {
      divider: 'rgb(205, 133, 63)',
    }),
    ...(mode === 'dark' && {
      divider: teal[200],
    }),
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
    [setMode]
  )

  mode === 'light'
    ? (document.querySelector('body').style.background =
        'linear-gradient(to top left, peru, white)')
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
          <Box width="100%" paddingX="1%" paddingBottom="4%">
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
