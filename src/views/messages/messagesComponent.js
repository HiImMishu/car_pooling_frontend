import { List, TextField } from "@material-ui/core";
import { useMemo, useState } from "react";
import LeftMessageComponent from "./leftMessageComponent";
import RightMessageComponent from "./rightMessageComponent";
import "./styles.css";
import UserMessageItemComponent from "./userMessageItemComponent";

const MessagesComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [message, setMessage] = useState("")

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
        {return Array.from(Array(50).keys()).map((index) => {
            console.log(1)
            return <UserMessageItemComponent selectedItem={selectedIndex} setSelectedItem={setSelectedIndex} index={index}/>
            })}
    }, [selectedIndex])
    
    const messagesList = useMemo(() => {
        {return Array.from(Array(50).keys()).map(index => {
            return index % 2 === 0 ? <RightMessageComponent/> : <LeftMessageComponent/>
            })}
    }, [selectedIndex])

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