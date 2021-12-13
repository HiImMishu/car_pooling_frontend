import { useState } from 'react';
import { makeStyles, alpha } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Menu, Badge, MenuItem, IconButton, Button, Divider } from "@material-ui/core";
import { DriveEta, Mail, AccountCircle, Notifications, MoreVert, Search, AddCircle, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import './styles.css';
import NotificationsComponent from '../notifications/NotificationsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsSelector, tokenSelector, unreadCountSelector } from '../../application/selectors/userSelector';
import { logout } from '../../application/actions/userAction';

const styles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    offset: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 900
    },
    paper: {
        zIndex: theme.zIndex.drawer + 1900 + " !important", 
    }
  }));

const Navbar = () => {
    const classes = styles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [notificationComponentVisible, setNotificationComponentVisible] = useState(false)
    const authenticated = useSelector(tokenSelector)
    const dispatch = useDispatch()
    const notifications = useSelector(notificationsSelector)
    const unreadCount = useSelector(unreadCountSelector)

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    };

    const menuId = 'primary-search-account-menu';
    const menuItemsLogged = (
        [
            <MenuItem key={1} component={Link} to="/my-trips" onClick={handleMenuClose}>Moje ogłoszenia</MenuItem>,
            <MenuItem key={2} component={Link} to={`/user/${2}/profile`} onClick={handleMenuClose}>Moje konto</MenuItem>,
            <Divider key={3}/>,
            <MenuItem key={4} onClick={() => {dispatch(logout); handleMenuClose()}}>Wyloguj</MenuItem>
        ]
    )
    const menuItemsUnLogged = (
        [
            <MenuItem key={1} component={Link} to="/login" onClick={handleMenuClose}>Logowanie</MenuItem>,
            <MenuItem key={2} component={Link} to="/register" onClick={handleMenuClose}>Rejestracja</MenuItem>
        ]
    )
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PopoverClasses={{
                root: classes.paper
            }}
        >
            {authenticated ? menuItemsLogged : menuItemsUnLogged}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PopoverClasses={{
                root: classes.paper
            }}
        >
        <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <IconButton color="inherit">
                <Search />
            </IconButton>
            <p>Wyszukaj przejazd</p>
        </MenuItem>
        <MenuItem component={Link} to="/add-trip" onClick={handleMenuClose}>
            <IconButton color="inherit">
                <AddCircle />
            </IconButton>
            <p>Dodaj przejazd</p>
        </MenuItem>
        {authenticated && <MenuItem component={Link} to="/messages/-1">
            <IconButton color="inherit">
            <Badge badgeContent={unreadCount} color="secondary">
                <Mail />
            </Badge>
            </IconButton>
            <p>Wiadomości</p>
        </MenuItem>}
        {authenticated && <MenuItem onClick={() => {
            handleMenuClose()
            handleMobileMenuClose()
            setNotificationComponentVisible(!notificationComponentVisible)
        }}>
            <IconButton color="inherit">
            <Badge badgeContent={notifications?.filter(notification => !notification.isRead)?.length} color="secondary">
                <Notifications />
            </Badge>
            </IconButton>
            <p>Powiadomienia</p>
        </MenuItem>}
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <p>Profil</p>
        </MenuItem>
        </Menu>
    );

    return (
        <div className="navbar">
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar>
                    <Typography component={Link} to="/" className="title" variant="h5">
                        <DriveEta fontSize="large" className="nav-icon"/>
                        HopInAndGo
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button component={Link} to="/" color="inherit"><Search/> Wyszukaj przejazd</Button>
                        <Button component={Link} to="/add-trip" color="inherit"><Add/> Dodaj przejazd</Button>
                        {authenticated && <>
                            <IconButton  component={Link} to="/messages/-1" color="inherit">
                            <Badge badgeContent={unreadCount} color="secondary">
                                <Mail />
                            </Badge>
                            </IconButton>
                            <IconButton color="inherit" onClick={() => {
                                handleMenuClose()
                                handleMobileMenuClose()
                                setNotificationComponentVisible(!notificationComponentVisible)
                            }}>
                            <Badge badgeContent={notifications?.filter(notification => !notification.isRead)?.length} color="secondary">
                                <Notifications />
                            </Badge>
                            </IconButton>
                        </>}
                        <IconButton
                            edge="end"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                        <MoreVert />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
            {renderMobileMenu}
            {renderMenu}
            {<NotificationsComponent isOpen={notificationComponentVisible} setIsOpen={setNotificationComponentVisible}/>}
        </div>
    )
} 

export default Navbar