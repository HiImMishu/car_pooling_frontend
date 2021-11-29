const RightMessageComponent = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' };

    return <div className="message-r message-right">
        <span className="message-timestamp message-timestamp-right">
            {new Date().toLocaleString("pl-PL", options)}
        </span>
        <p>
            Cześć, czy mogę zabrać walizkę podczas wyjazdu do Warszawy? Bo wczoraj nie miałem takiej mozliwości przez telefon no i nie zapytałem
        </p>
    </div>
}

export default RightMessageComponent