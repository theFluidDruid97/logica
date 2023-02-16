import { toast } from '@redwoodjs/web/dist/toast'

import { GeneralContext } from 'src/App'

export const Notify = (currentUser) => {
  const { notified, setNotified } = React.useContext(GeneralContext)
  if (currentUser.status === 'Due' && notified === false) {
    toast('You have Training that is due! Please check your training list.')
    setNotified(true)
  } else if (currentUser.status === 'Overdue' && notified === false) {
    toast(
      'You have Training that is overdue! Complete your training immediately.'
    )
    setNotified(true)
  } else if (currentUser.status === 'Current' && notified === false) {
    toast('You have no training due or overdue.')
    setNotified(true)
  }
}
