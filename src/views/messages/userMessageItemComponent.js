import { Divider, ListItem, ListItemAvatar, ListItemText, Avatar, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { activeUserSelector } from "../../application/selectors/userSelector";
import defaultAvatar from '../../assets/images/default-avatar.jpg';

const useStyles = makeStyles(() => ({
    secondary: {
        color: "#000000",
        fontWeight: "600"
    }
  }))

const UserMessageItemComponent = ({selectedItem, setSelectedItem, message}) => {
    const styles = useStyles()
    const activeUser = useSelector(activeUserSelector)
    const isFirst = activeUser?.id === message.sender.id

    return <>
        <ListItem 
            button 
            selected={selectedItem === parseInt(isFirst ? message.recipient.id : message.sender.id)}
            onClick={() => setSelectedItem(isFirst ? message.recipient.id : message.sender.id)}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <Avatar alt="Message user avatar" src={defaultAvatar}/>
            </ListItemAvatar>
            <ListItemText
                className="hide-sm"
                classes={{
                    secondary: (!isFirst && !message.isRead) ? styles.secondary : ""
                }}
                primary={`${isFirst ? message.recipient.firstName : message.sender.firstName}  ${isFirst ? message.recipient.lastName : message.sender.lastName}`}
                secondary={message.content > 100 ? message.content.substr(0, 56) + "..." : message.content}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
    </>
}

export default UserMessageItemComponent