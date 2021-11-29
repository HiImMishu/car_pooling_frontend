import { Paper } from "@material-ui/core";
import './styles.css';

const HomeCard = ({img, title, text}) => {

    return (
        <Paper className="card">
            <span className="image-container">
                <img className="card-image" src={img} alt="Home page card header"></img>
            </span>
            <h3>{title}</h3>
            <p className="card-text">{text}</p>
        </Paper>
    )
}

export default HomeCard