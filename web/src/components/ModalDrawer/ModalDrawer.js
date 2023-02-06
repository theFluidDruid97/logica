import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'

import { ThemeModeContext } from '../../App.js'

const ModalDrawer = () => {
  const { mode, setMode } = React.useContext(ThemeModeContext)
  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return
    // }

    setState({ ...state, [anchor]: open })
  }

  return (
    <div>
      <div key={'right'}>
        <Button
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={toggleDrawer('right', true)}
        >
          ASSIGN
        </Button>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          <Box
            sx={{ width: 400, marginTop: 10 }}
            role="presentation"
            onClick={toggleDrawer('right', false)}
            onKeyDown={toggleDrawer('right', false)}
          >
            <TextField label="Supervisor" variant="outlined" />
          </Box>
        </Drawer>
      </div>
    </div>
  )
}

export default ModalDrawer
