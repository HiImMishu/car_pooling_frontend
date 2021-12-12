const RightMessageComponent = ({message}) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' }
    console.log(message)

    return <div className="message-r message-right">
        <span className="message-timestamp message-timestamp-right">
            {new Date(message.messageDate).toLocaleString("pl-PL", options)}
        </span>
        <p>
            {message.content}
        </p>
    </div>
}

export default RightMessageComponent