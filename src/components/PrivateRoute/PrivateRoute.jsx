import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../redux/slices/authFormSlice'

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return isAuthenticated ? element : <Navigate to="/sign-in" />
}

export default PrivateRoute
