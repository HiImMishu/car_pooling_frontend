import { List, TextField } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialMessages, fetchPageOfMessages, fetchUserById, markThreadAsRead, sendMessage } from "../../application/actions/userAction";
import { activeUserSelector, fetchedUserSelector, initialMessagesSelector, messagesSelector, tokenSelector } from "../../application/selectors/userSelector";
import LeftMessageComponent from "./leftMessageComponent";
import RightMessageComponent from "./rightMessageComponent";
import "./styles.css";
import UserMessageItemComponent from "./userMessageItemComponent";
import { useParams } from "react-router";

const MessagesComponent = () => {
    const { id } = useParams()
    const [selectedIndex, setSelectedIndex] = useState(parseInt(id))
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const initialMessages = useSelector(initialMessagesSelector)
    const messages = useSelector(messagesSelector)
    const fetchedUser = useSelector(fetchedUserSelector)
    const activeUser = useSelector(activeUserSelector)
    const firstMessage = parseInt(id) !== -1 && fetchedUser && (initialMessages?.find(m => m.sender.id === fetchedUser?.id || m.recipient.id === fetchedUser?.id)) === undefined
    const preparedMessage = {
        sender: {
            id: id,
            firstName: fetchedUser?.firstName,
            lastName: fetchedUser?.lastName
        },
        content: ""
    }

    useEffect(() => {
        if (parseInt(id) !== -1) {
            dispatch(fetchUserById(id))
        }
    }, [dispatch, id])

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
            dispatch(sendMessage(token, {recipient: selectedIndex, content: message.trim()}))
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
        return initialMessages?.map((message, index) => <UserMessageItemComponent key={index} selectedItem={selectedIndex} setSelectedItem={setSelectedIndex} message={message}/>)
    }, [selectedIndex, initialMessages])
    
    const messagesList = useMemo(() => {
        return messages?.[selectedIndex]?.sort((first, second) => new Date(first.messageDate) > new Date(second.messageDate))?.map(message => message.sender.id === activeUser?.id ? <RightMessageComponent key={message.id} message={message}/> : <LeftMessageComponent key={message.id} message={message}/>)
    }, [selectedIndex, messages?.[selectedIndex]])

    return <main className="messages-container">
        <List className="users-list">
            {firstMessage && <UserMessageItemComponent key={-1} selectedItem={selectedIndex} setSelectedItem={setSelectedIndex} message={preparedMessage}/>}
            {userList}
        </List>
        <List className="messages-list">
            {messagesList}
        </List>
        {dialog}
    </main>
}

export default MessagesComponent