import { Drawer, Toolbar, List } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import NotificationComponent from "./notificationComponent";
import { PersonAdd, VerifiedUser, PersonAddDisabled, DeleteOutline, StarOutline, PersonPin, Block } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { notificationsSelector } from "../../application/selectors/userSelector";

const useStyles = makeStyles(() => ({
    drawer: {
      width: 240,
      flexShrink: 0
    },
    drawerPaper: {
      width: "80%",
      maxWidth: 350
    },
    drawerContainer: {
      overflow: "auto"
    }
  }));

const NotificationsComponent = ({isOpen, setIsOpen}) => {
    const notifications = useSelector(notificationsSelector)
    const classes = useStyles()
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' }

    const mapTypeToIcon = (type) => {
      switch (type) {
        case 'NEW_PASSENGER': return <PersonAdd className="icon-font-color-blue" fontSize="large"/>
        case 'GOT_ACCEPTED': return <VerifiedUser className="icon-font-color-green" fontSize="large"/>
        case 'PASSENGER_RESIGNED': return <PersonAddDisabled className="icon-font-color-red" fontSize="large"/>
        case 'TRIP_DELETED': return <DeleteOutline className="icon-font-color-red" fontSize="large"/>
        case 'NEW_RATING': return <StarOutline className="icon-font-color-gold" fontSize="large"/>
        case 'ACCEPTATION_REQUEST': return <PersonPin className="icon-font-color-blue" fontSize="large"/>
        case 'REQUEST_REJECTED': return <Block className="icon-font-color-red" fontSize="large"/>
        default: return ""
      }
    }

    const mapTypeToHeader = (type) => {
      switch (type) {
        case 'NEW_PASSENGER': return "Nowy pasażer!"
        case 'GOT_ACCEPTED': return "Zaakceptowano Podróż!"
        case 'PASSENGER_RESIGNED': return "Pasażer zrezygnował."
        case 'TRIP_DELETED': return "Usunięto przejazd."
        case 'NEW_RATING': return "Nowa ocena!"
        case 'ACCEPTATION_REQUEST': return "Prośba o potwierdzenie!"
        case 'REQUEST_REJECTED': return "Odrzucono Twoją prośbę!"
        default: return ""
      }
    }

    const mapNotificationMessage = (notification) => {
      switch (notification.type) {
        case 'NEW_PASSENGER': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} zapisał/-a się na Twój przejazd.`
        case 'GOT_ACCEPTED': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} zaakceptował/-a twoją prośbę o przejazd!`
        case 'PASSENGER_RESIGNED': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} zrezygnował/-a z podróży w kierunku Wrocław.`
        case 'TRIP_DELETED': return `Przejazd w dniu ${new Date(notification?.trip?.tripDate).toLocaleString("pl-PL", options)} został odwołany.`
        case 'NEW_RATING': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} XYZ wystawił/-a nową ocenę na Twoim profilu!`
        case 'ACCEPTATION_REQUEST': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} prosi o dodanie do przejazdu.`
        case 'REQUEST_REJECTED': return `${notification.actionTaker.firstName} ${notification.actionTaker.lastName} nie zaakceptował/-a Twojej prośby o dołączenie do przejazdu.`
        default: return ""
      }
    }

    const mapNotificationToLink = (notification) => {
      switch (notification.type) {
        case 'NEW_PASSENGER': return `/search/${notification.trip.id}`
        case 'GOT_ACCEPTED': return `/search/${notification.trip.id}`
        case 'PASSENGER_RESIGNED': return `/search/${notification.trip.id}`
        case 'TRIP_DELETED': return "/"
        case 'NEW_RATING': return `/user/${notification.notificationOwner.id}/reviews`
        case 'ACCEPTATION_REQUEST': return `/search/${notification.trip.id}`
        case 'REQUEST_REJECTED': return `/search/${notification.trip.id}`
        default: return ""
      }
    }

    return <Drawer
          className={classes.drawer}
          open={isOpen}
          variant="temporary"
          anchor="right"
          onClose={() => setIsOpen(false)}
          classes={{
              paper: classes.drawerPaper
          }}
      >
          <Toolbar />
          <List className={classes.drawerContainer}>
            {notifications.map(n => {
              const notification = {
                icon: mapTypeToIcon(n.type),
                header: mapTypeToHeader(n.type),
                message: mapNotificationMessage(n),
                link: mapNotificationToLink(n)
              }
              return <NotificationComponent element={n} key={n.id} closeDrawer={() => setIsOpen(false)} notification={notification}/>
            })}
          </List>
    </Drawer>
}

export default NotificationsComponent