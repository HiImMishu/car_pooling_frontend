import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readNotification } from "../../application/actions/userAction";
import { tokenSelector } from "../../application/selectors/userSelector";


const NotificationComponent = ({notification, closeDrawer, element}) => {
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)

    const handleClick = () => {
        dispatch(readNotification(token, element.id))
        closeDrawer()
    }

    return <>
        <ListItem button onClick={handleClick} component={Link} to={notification.link} alignItems="flex-start">
            <ListItemIcon>
                {notification.icon}
            </ListItemIcon>
            <ListItemText
                className="hide-sm"
                primary={notification.header}
                secondary={notification.message.length > 100 ? notification.message.substr(0, 56) + "..." : notification.message}
            />
        </ListItem>
        <Divider component="li"/>
    </>
}

export default NotificationComponent