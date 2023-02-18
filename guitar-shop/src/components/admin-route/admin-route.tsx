import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {UserRole} from '../../types/user-role.enum';

type AdminRouteProps = {
  userRole: UserRole | null;
  children: JSX.Element;
}

function AdminRoute({userRole, children}: AdminRouteProps): JSX.Element {

  return (
    userRole === UserRole.Admin
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default AdminRoute;
