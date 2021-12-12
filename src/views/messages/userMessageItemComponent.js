import { Divider, ListItem, ListItemAvatar, ListItemText, Avatar, makeStyles } from "@material-ui/core";
import defaultAvatar from '../../assets/images/default-avatar.jpg';

const useStyles = makeStyles(() => ({
    secondary: {
        color: "#000000",
        fontWeight: "600"
    }
  }))

const UserMessageItemComponent = ({selectedItem, setSelectedItem, message}) => {
    const styles = useStyles()

    return <>
        <ListItem 
            button 
            selected={selectedItem === message.id}
            onClick={() => setSelectedItem(message.id)}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <Avatar alt="Message user avatar" src={defaultAvatar}/>
            </ListItemAvatar>
            <ListItemText
                className="hide-sm"
                classes={{
                    secondary: !message.isRead ? styles.secondary : ""
                }}
                primary={`${message.sender.firstName}  ${message.sender.lastName}`}
                secondary={message.content > 100 ? message.content.substr(0, 56) + "..." : message.content}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
    </>
}

export default UserMessageItemComponent