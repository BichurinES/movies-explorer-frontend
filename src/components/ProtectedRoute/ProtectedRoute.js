import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
  const { path, isLogged, children } = props;
  return (
    <Route to={ path }>
      { isLogged ? children : <Redirect to="signin" /> }
    </Route>
  )
}
