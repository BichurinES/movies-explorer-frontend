import { Route, Redirect } from 'react-router-dom';

export default function ProtectedEntryRoute(props) {
  const { path, isLogged, children } = props;
  return (
    <Route to={ path }>
      { isLogged ? <Redirect to="/" /> : children }
    </Route>
  )
}
