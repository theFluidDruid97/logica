import { Router, Route, Set, Private } from '@redwoodjs/router'

import GeneralLayout from 'src/layouts/GeneralLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={GeneralLayout}>
        <Private unauthenticated="home">
          <Private roles="admin" unauthenticated="home">
            <Set wrap={ScaffoldLayout} title="Roles" titleTo="roles" buttonLabel="New Role" buttonTo="newRole">
              <Route path="/roles/new" page={RoleNewRolePage} name="newRole" />
              <Route path="/roles/{id:Int}/edit" page={RoleEditRolePage} name="editRole" />
              <Route path="/roles/{id:Int}" page={RoleRolePage} name="role" />
              <Route path="/roles" page={RoleRolesPage} name="roles" />
            </Set>
          </Private>
          <Set wrap={ScaffoldLayout} title="Airmen" titleTo="airmen" buttonLabel="New Airman" buttonTo="newAirman">
            <Route path="/airmen/new" page={AirmanNewAirmanPage} name="newAirman" />
            <Route path="/airmen/{id:Int}/edit" page={AirmanEditAirmanPage} name="editAirman" />
            <Route path="/airmen/{id:Int}" page={AirmanAirmanPage} name="airman" />
            <Route path="/airmen" page={AirmanAirmenPage} name="airmen" />
          </Set>
          <Route path="/dashboard" page={DashboardPage} name="dashboard" title="Dashboard" />
        </Private>
        <Route path="/" page={LandingPage} name="home" title="Landing" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
