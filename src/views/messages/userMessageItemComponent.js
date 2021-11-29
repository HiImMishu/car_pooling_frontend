import { Divider, ListItem, ListItemAvatar, ListItemText, Avatar } from "@material-ui/core";
import defaultAvatar from '../../assets/images/default-avatar.jpg';

const UserMessageItemComponent = ({selectedItem, setSelectedItem, index}) => {
    const message = "Cześć, czy mogę zabrać walizkę podczas wyjazdu do Warszawy? Bo wczoraj nie miałem takiej mozliwości przez telefon no i nie zapytałem"

    return <>
        <ListItem 
            button 
            selected={selectedItem === index}
            onClick={() => setSelectedItem(index)}
            alignItems="flex-start"
        >
            <ListItemAvatar>
                <Avatar alt="Message user avatar" src={defaultAvatar}/>
            </ListItemAvatar>
            <ListItemText
                className="hide-sm"
                primary="Marek Stępolski"
                secondary={message.length > 100 ? message.substr(0, 56) + "..." : message}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
    </>
}

export default UserMessageItemComponent