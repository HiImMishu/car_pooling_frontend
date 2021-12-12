import { List, TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialMessages, fetchPageOfMessages, markThreadAsRead } from "../../application/actions/userAction";
import { initialMessagesSelector, messagesSelector, tokenSelector } from "../../application/selectors/userSelector";
import LeftMessageComponent from "./leftMessageComponent";
import RightMessageComponent from "./rightMessageComponent";
import "./styles.css";
import UserMessageItemComponent from "./userMessageItemComponent";

const MessagesComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const initialMessages = useSelector(initialMessagesSelector)
    const messages = useSelector(messagesSelector)

    useEffect(() => {
        if (token) {
            dispatch(fetchInitialMessages(token))
        }
    }, [token, dispatch])

    useEffect(() => {
        if (initialMessages?.length > 0 && selectedIndex === -1) {
            setSelectedIndex(initialMessages[0].sender.id)
        }
    }, [initialMessages, setSelectedIndex])

    useEffect(() => {
        if (token && selectedIndex !== -1) {
            dispatch(markThreadAsRead(token, selectedIndex))
            dispatch(fetchPageOfMessages(token, 50, 0, selectedIndex))
        }
    }, [token, selectedIndex, dispatch])

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
        return messages?.[selectedIndex]?.map(message => message.sender.id === selectedIndex ? <RightMessageComponent key={message.id} message={message}/> : <LeftMessageComponent key={message.id} message={message}/>)
    }, [selectedIndex, messages?.[selectedIndex]])

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