const LeftMessageComponent = ({message}) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' }

    return <div className="message-l message-left">
        <span className="message-timestamp message-timestamp-left">
            {new Date(message.messageDate).toLocaleString("pl-PL", options)}
        </span>
        <p>
            {message.content}
        </p>
    </div>
}

export default LeftMessageComponent