import { List, TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialMessages } from "../../application/actions/userAction";
import { initialMessagesSelector, tokenSelector } from "../../application/selectors/userSelector";
import LeftMessageComponent from "./leftMessageComponent";
import RightMessageComponent from "./rightMessageComponent";
import "./styles.css";
import UserMessageItemComponent from "./userMessageItemComponent";

const MessagesComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const initialMessages = useSelector(initialMessagesSelector)

    useEffect(() => {
        if (token) {
            dispatch(fetchInitialMessages(token))
        }
    }, [token, dispatch])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            //send message here
            console.log(message.trim())
            setMessage("")
        }
    }

    const dialog = <TextField  
        className="message-input"
        id="outlined-basic" 
        label="Treść wiadomości" 
        variant="outlined"
        onKeyDown={handleKeyDown}
        value={message}
        onChange={e => setMessage(e.target.value)}
        multiline
        minRows={2}
        maxRows={2}
    />

    const userList = useMemo(() => {
        return initialMessages?.map(message => <UserMessageItemComponent key={message.sender.id} selectedItem={selectedIndex} setSelectedItem={setSelectedIndex} message={message}/>)
    }, [selectedIndex, initialMessages])
    
    const messagesList = useMemo(() => {
        return Array.from(Array(50).keys()).map(index => {
            return index % 2 === 0 ? <RightMessageComponent/> : <LeftMessageComponent/>
            })
    }, [])

    return <main className="messages-container">
        <List className="users-list">
            {userList}
        </List>
        <List className="messages-list">
            {messagesList}
        </List>
        {dialog}
    </main>
}

export default MessagesComponent