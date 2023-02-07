import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => {
  const currentMode = localStorage.getItem('mode')
  const [mode, setMode] = React.useState(currentMode || 'light')
  const [open, setOpen] = React.useState(false)
  const [supervisorModalOpen, setSupervisorModalOpen] = React.useState(false)
  const rolesList = ['Admin', 'Airman', 'Monitor', 'Supervisor']
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ThemeModeContext.Provider value={{ mode, setMode }}>
        <GeneralContext.Provider
          value={{
            open,
            setOpen,
            supervisorModalOpen,
            setSupervisorModalOpen,
            rolesList,
          }}
        >
          <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <AuthProvider type="dbAuth">
              <RedwoodApolloProvider>
                <Routes />
              </RedwoodApolloProvider>
            </AuthProvider>
          </RedwoodProvider>
        </GeneralContext.Provider>
      </ThemeModeContext.Provider>
    </FatalErrorBoundary>
  )
}

export const ThemeModeContext = React.createContext(null)
export const GeneralContext = React.createContext(null)
export default App
