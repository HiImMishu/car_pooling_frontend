import { Drawer, Toolbar, List } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import NotificationComponent from "./notificationComponent";
import { PersonAdd, VerifiedUser, PersonAddDisabled, DeleteOutline, StarOutline, PersonPin, Block } from "@material-ui/icons";

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
    const classes = useStyles();
    const userEnrolled = {
      icon: <PersonAdd className="icon-font-color-blue" fontSize="large"/>,
      header: "Nowy Pasażer!",
      message: "Krzysztof Matczak zapisał się na Twój przejazd.",
      link: "/search/2"
    }
    const enrollmentAgreed = {
      icon: <VerifiedUser className="icon-font-color-green" fontSize="large"/>,
      header: "Zaakceptowano Podróż!",
      message: "Marcin Najman dodał Cię do przejazdu w kierunku Warszawa.",
      link: "/search/2"
    }
    const enrollmentResignation = {
      icon: <PersonAddDisabled className="icon-font-color-red" fontSize="large"/>,
      header: "Pasażer zrezygnował.",
      message: "Krzysztof Ibisz zrezygnował z podróży w kierunku Wrocław.",
      link: "/search/2"
    }
    const tripDeleted = {
      icon: <DeleteOutline className="icon-font-color-red" fontSize="large"/>,
      header: "Usunięto przejazd.",
      message: "Przejazd w kierunku Kraków w dniu 23/02/2021 został odwołany.",
      link: "/"
    }
    const newScore = {
      icon: <StarOutline className="icon-font-color-gold" fontSize="large"/>,
      header: "Nowa ocena!",
      message: "Użytkownik Elżbieta XYZ wystawił nową ocenę na Twoim profilu.",
      link: "/user/:userId/reviews"
    }
    const newPassangerRequest = {
      icon: <PersonPin className="icon-font-color-blue" fontSize="large"/>,
      header: "Prośba o potwierdzenie!",
      message: "Użytkownik Piotr Kosieradzki prosi o dodanie do przejazdu.",
      link: "/search/2"
    }
    const newPassangerBlock = {
      icon: <Block className="icon-font-color-red" fontSize="large"/>,
      header: "Odrzucono Twoją prośbę!",
      message: "Użytkownik Szymon Steczkowski nie zaakceptował Twojej prośby o dołączenie do przejazdu.",
      link: "/search/2"
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
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={userEnrolled}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={enrollmentAgreed}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={enrollmentResignation}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={tripDeleted}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={newScore}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={newPassangerRequest}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={newPassangerBlock}/>
            <NotificationComponent closeDrawer={() => setIsOpen(false)} notification={userEnrolled}/>
          </List>
    </Drawer>
}

export default NotificationsComponent