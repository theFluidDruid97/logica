import { Router, Route, Set, Private } from '@redwoodjs/router'

import GeneralLayout from 'src/layouts/GeneralLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={GeneralLayout}>
        <Private unauthenticated="landing">
          <Private roles="Admin" unauthenticated="landing">
            <Set wrap={ScaffoldLayout} title="Roles" titleTo="roles" buttonLabel="New Role" buttonTo="newRole">
              <Route path="/roles/new" page={RoleNewRolePage} name="newRole" />
              <Route path="/roles/{id:Int}/edit" page={RoleEditRolePage} name="editRole" />
              <Route path="/roles/{id:Int}" page={RoleRolePage} name="role" />
              <Route path="/roles" page={RoleRolesPage} name="roles" />
            </Set>
          </Private>
          <Set wrap={ScaffoldLayout} title="Collections" titleTo="collections" buttonLabel="New Collection" buttonTo="newCollection">
            <Route path="/collections/new" page={CollectionNewCollectionPage} name="newCollection" />
            <Route path="/collections/{id:Int}/edit" page={CollectionEditCollectionPage} name="editCollection" />
            <Route path="/collections/{id:Int}" page={CollectionCollectionPage} name="collection" />
            <Route path="/collections" page={CollectionCollectionsPage} name="collections" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Trainings" titleTo="trainings" buttonLabel="New Training" buttonTo="newTraining">
            <Route path="/trainings/new" page={TrainingNewTrainingPage} name="newTraining" />
            <Route path="/trainings/{id:Int}/edit" page={TrainingEditTrainingPage} name="editTraining" />
            <Route path="/trainings/{id:Int}" page={TrainingTrainingPage} name="training" />
            <Route path="/trainings" page={TrainingTrainingsPage} name="trainings" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Airmen" titleTo="airmen" buttonLabel="New Airman" buttonTo="newAirman">
            <Route path="/airmen/new" page={AirmanNewAirmanPage} name="newAirman" />
            <Route path="/airmen/{id:Int}/edit" page={AirmanEditAirmanPage} name="editAirman" />
            <Route path="/airmen/{id:Int}" page={AirmanAirmanPage} name="airman" />
            <Route path="/airmen" page={AirmanAirmenPage} name="airmen" />
          </Set>
          <Route path="/dashboard" page={DashboardPage} name="home" title="Dashboard" />
          <Route path="/settings" page={SettingsPage} name="settings" />
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
