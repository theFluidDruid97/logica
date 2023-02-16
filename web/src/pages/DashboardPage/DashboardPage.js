import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Notify } from '../../components/Notification/Notification.js'

const DashboardPage = () => {
  const { currentUser } = useAuth()
  Notify(currentUser)
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <h1>Dashboard</h1>
      <p>
        Find me in <code>./web/src/pages/DashboardPage/DashboardPage.js</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Dashboard</Link>`
      </p>
    </>
  )
}

export default DashboardPage
