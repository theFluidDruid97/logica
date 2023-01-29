import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => {
  const [mode, setMode] = React.useState('light')
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ThemeModeContext.Provider value={{ mode, setMode }}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <AuthProvider type="dbAuth">
            <RedwoodApolloProvider>
              <Routes />
            </RedwoodApolloProvider>
          </AuthProvider>
        </RedwoodProvider>
      </ThemeModeContext.Provider>
    </FatalErrorBoundary>
  )
}

export const ThemeModeContext = React.createContext(null)
export default App
