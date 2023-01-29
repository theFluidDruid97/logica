import { Router, Route, Set, Private } from '@redwoodjs/router'

import GeneralLayout from 'src/layouts/GeneralLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={GeneralLayout}>
        <Private unauthenticated="landing">
          <Private roles="admin" unauthenticated="landing">
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
          <Route path="/dashboard" page={DashboardPage} name="home" title="Dashboard" />
        </Private>
        <Route path="/" page={LandingPage} name="landing" title="Landing" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
