import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom'
import { tokenSelector } from './application/selectors/userSelector';

function PrivateRoute({component: Component, ...rest}) {
    const token = useSelector(tokenSelector)

    return (
        <Route {...rest} render={(props) => (
            token ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )
        )}
        />
    );
}

export default PrivateRoute