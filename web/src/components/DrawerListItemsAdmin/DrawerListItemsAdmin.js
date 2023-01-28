import { useState } from 'react'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { navigate, routes } from '@redwoodjs/router'

const DrawerListItemsAdmin = () => {
  const [routesState, setRoutesState] = useState(routes)
  const drawerListItems = [
    {
      text: 'Roles',
      link: routesState.roles(),
      icon: <AdminPanelSettingsIcon />,
    },
  ]
  return drawerListItems.map((drawerListItem) => (
    <ListItem
      key={drawerListItem.text}
      disablePadding
      sx={{ display: 'block' }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={() => navigate(drawerListItem.link)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {drawerListItem.icon}
        </ListItemIcon>
        <ListItemText
          primary={drawerListItem.text}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  ))
}

export default DrawerListItemsAdmin
