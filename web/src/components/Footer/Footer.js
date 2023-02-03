import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import { GeneralContext } from '../../App.js'
import { AppBar } from '../../components/NavigationFunctions/NavigationFunctions.js'

const Footer = () => {
  const { open, setOpen } = React.useContext(GeneralContext)
  return (
    <AppBar position="fixed" open={open} sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <b>Follow us on</b>
        <Box width="15%" display="flex" justifyContent="space-around">
          <a href="https://github.com/theFluidDruid97/TrainTrackv2">
            <GitHubIcon />
          </a>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <LinkedInIcon />
          <YouTubeIcon />
          <GoogleIcon />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
