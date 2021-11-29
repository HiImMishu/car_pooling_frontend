import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";


const NotificationComponent = ({notification, closeDrawer}) => {

    return <>
        <ListItem button onClick={closeDrawer} component={Link} to={notification.link} alignItems="flex-start">
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