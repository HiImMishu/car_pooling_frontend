import { Container, withStyles, Divider } from '@material-ui/core';
import { StarOutline, NavigateNext } from '@material-ui/icons';
import { useParams } from "react-router";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedUserSelector, tokenSelector } from '../../application/selectors/userSelector';
import { useEffect } from 'react';
import { fetchUserById } from '../../application/actions/userAction';
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';

const tripAddInfo = [
    {
        id: 0,
        avatar: freeSeat,
        alt: "Wolne miejsce na tylnej kanapie",
        description: "Maks. dwie osoby na tylnym siedzeniu"
    },
    {
        id: 1,
        avatar: noSmoking,
        alt: "Nie palić",
        description: "Proszę, bez palenia w samochodzie"
    },
    {
        id: 2,
        avatar: noAnimals,
        alt: "Zakaz zwierząt",
        description: "Proszę, żadnych zwierząt w aucie"
    },
    {
        id: 3,
        avatar: chat,
        alt: "Rozmowa",
        description: "Chętnie rozmawiam"
    },
    {
        id: 4,
        avatar: music,
        alt: "Muzyka",
        description: "Muzyka? Nie ma problemu!"
    },
    {
        id: 5,
        avatar: approveImg,
        alt: "Potwierdzam automatycznie",
        description: "Potwierdzam automatycznie"
    }
]


const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserInformationComponent = () => {
    const { userId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const fetchedUser = useSelector(fetchedUserSelector)
    const options = { month: 'long', year: 'numeric' }
    const token = useSelector(tokenSelector)

    useEffect(() => {
        dispatch(fetchUserById(userId))
    }, [token, userId, dispatch])

    const navigateToReviews = () => {
        history.push(`/user/${userId}/reviews/`)
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <section className="user-profile-header">
                <img className="profile-avatar" src={defaultAvatar} alt="User avatar"/>
                <h1 className="user-profile-heading">{fetchedUser?.firstName}</h1>
                <h4 className="user-profile-age text-secondary">{parseInt((new Date() - new Date(fetchedUser?.birthday)) / (1000*60*60*24*365))} lat/-a</h4>
            </section>
            <section className="trip-driver" onClick={navigateToReviews}>
                <div className="driver">
                    <span className="user-row">
                        <h3 className="user-reviews text-secondary"><StarOutline className="score-star" fontSize="large"/> 5/5 Liczba ocen - 20 //ToDo</h3>
                    </span>
                </div>
                <span className="navigate-user">
                    <NavigateNext fontSize="large"/> 
                </span>
            </section>
            <Divider className="profile-divider trip-divider"/>
            <section className="add-info-section trip-padding price-text">
                {fetchedUser?.emptyThirdSeat && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[0].avatar} alt={tripAddInfo[0].alt}/>
                    <h4>{tripAddInfo[0].description}</h4>
                </span>}
                {fetchedUser?.noSmoking && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[1].avatar} alt={tripAddInfo[1].alt}/>
                    <h4>{tripAddInfo[1].description}</h4>
                </span>}
                {fetchedUser?.noAnimals && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[2].avatar} alt={tripAddInfo[2].alt}/>
                    <h4>{tripAddInfo[2].description}</h4>
                </span>}
                {fetchedUser?.talkative && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[3].avatar} alt={tripAddInfo[3].alt}/>
                    <h4>{tripAddInfo[3].description}</h4>
                </span>}
                {fetchedUser?.music && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[4].avatar} alt={tripAddInfo[4].alt}/>
                    <h4>{tripAddInfo[4].description}</h4>
                </span>}
                {fetchedUser?.autoAccept && <span className="add-info-item">
                    <img className="additional-information" src={tripAddInfo[5].avatar} alt={tripAddInfo[5].alt}/>
                    <h4>{tripAddInfo[5].description}</h4>
                </span>}
            </section>
            <Divider className="profile-divider trip-divider"/>
            <section className="add-info-section trip-padding price-text">
                <h4 className="profile-statistics">Opublikowanych przejazdów: {fetchedUser?.ownedTrips?.length}</h4> 
                <h4 className="profile-statistics">Dołączył/-a {new Date(fetchedUser?.registeredDate).toLocaleString("pl-PL", options)}</h4> 
            </section>
        </StyledContainer>
}

export default UserInformationComponent