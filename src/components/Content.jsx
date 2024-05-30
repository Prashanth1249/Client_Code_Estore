import React, { Fragment, useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import ShopTwoOutlinedIcon from '@mui/icons-material/ShopTwoOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import AddIcon from '@mui/icons-material/Add';
import Toolbar from '@mui/material/Toolbar';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import List from '@mui/material/List';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import SellTwoToneIcon from '@mui/icons-material/SellTwoTone';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from "@mui/icons-material/Home"
import axios from 'axios';
import { Stack, Button, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import LoginPage from './Login';
import ContentComponent from './Notice';
import RegisterComponent from './Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './dashboard';
import BookStore from './Productpage';
import Home from './Home';
import YourOrder from './YourOrders';
import YourSell from './YourSell';
import PersonalInfoForm from './Profile';
import SellBooksForm from './SellBook';
import AboutPage from './About';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSubsection, setOpenSubsection] = useState(false);
  const [openSubsection1, setOpenSubsection1] = useState(false);
  const [openSubsection2, setOpenSubsection2] = useState(false);
  const [openSubsection3, setOpenSubsection3] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    if (window.innerWidth <= 600) {
      setTimeout(() => setOpen(false), 5000); // Close drawer after 5 seconds
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemMouseEnter = () => {
    setHovered(true);
  };

  const handleListItemMouseLeave = () => {
    setHovered(false);
  };

  const handleListItemClick = () => {
    setOpenSubsection(!openSubsection);
  };

  const handleListItemClick1 = () => {
    setOpenSubsection1(!openSubsection1);
  };

  const handleListItemClick2 = () => {
    setOpenSubsection2(!openSubsection2);
  };

  const handleListItemClick3 = () => {
    setOpenSubsection3(!openSubsection3);
  };

  const getInfo = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let url = `https://estorerguktbasarbackend.onrender.com/getinfo/` + token;
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setLogin(true);
      setUser(data);
      setProfilePhoto(data.profilePhoto);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const logOut = () => {
    if (login) {
      localStorage.removeItem('token');
      setLogin(false);
      setUser(null);
      window.location.reload();
    }
  };

  const avatarStyle = {
    height: '40px',
    width: '40px',
    cursor: 'pointer',
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const onProfile = () => {
    setShowDropdown(!showDropdown);
  };

  const onLogout = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let timer;
    if (showDropdown) {
      timer = setTimeout(() => {
        setShowDropdown(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showDropdown]);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f4f4f4' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#4267b2" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            size='Huge'
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {open ? null : (
            <Fragment>
              <Box
                component="img"
                src="https://hub.rgukt.ac.in/hub/static/images/logo.png"
                alt="logo"
                sx={{
                  maxWidth: {
                    xs: "10%",
                    sm: "35px",
                  },
                  objectFit: "cover",
                  paddingRight: '3px',
                  display: { xs: 'none', sm: 'block' }
                }}
              />
              <Box sx={{ paddingLeft: "12px", color: "white", display: { xs: 'none', sm: 'block' } }}>
                RGUKT BASAR
              </Box>
            </Fragment>
          )}
          <Typography variant='h6' component='div' edge='end' sx={{ flexGrow: 1 }}>
            e-studyStore
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button color='inherit'> <a href='/about' style={{ textDecoration: "none", color: "white" }}>About</a></Button>
            <Button color='inherit' ><a href="mailto:prshanthpottola49an@gmail.com" style={{ textDecoration: "none", color: "white" }}>Contact</a></Button>
            {showDropdown && (
              <div className="dropdown">
                {login && (
                  <>
                    <div className="dropdown-item" onClick={onProfile}>
                      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>Profile</Link>
                    </div>
                    <div className="dropdown-item" onClick={onLogout}>
                      <Link onClick={logOut} style={{ textDecoration: "none", color: "black" }}>Logout</Link>
                    </div>
                  </>
                )}
              </div>
            )}
            {login && (
              <>
                <Avatar
                  src={profilePhoto || "/default-avatar.jpg"}
                  alt="Profile"
                  onClick={handleAvatarClick}
                  style={avatarStyle}
                />
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Home"} disablePadding>
            <ListItemButton component={Link} to={"/"} onClick={handleDrawerClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Notice Board"} disablePadding>
            <ListItemButton component={Link} to={"/noticeboard"} onClick={handleDrawerClose}>
              <ListItemIcon>
                <AddchartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Notice Board"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Academics"} disablePadding>
            <ListItemButton onClick={handleListItemClick1}>
              <ListItemIcon>
                <BookTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary={"Academics"} />
              {openSubsection1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubsection1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/register"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Notice"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/dashboard"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AdminPanelSettingsTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem key={"Book Store"} disablePadding>
            <ListItemButton onClick={handleListItemClick}>
              <ListItemIcon>
                <ShopTwoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Book Store"} />
              {openSubsection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubsection} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/buybooks"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <ShoppingBagTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Buy Books"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/sellbooks"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <SellTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sell Books"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/yourorders"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <ShoppingCartTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Your Orders"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/yoursell"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <ShoppingCartTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Your Sellings"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
          <ListItem key={"Profile"} disablePadding>
            <ListItemButton onClick={handleListItemClick2}>
              <ListItemIcon>
                <AccountBoxTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
              {openSubsection2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSubsection2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to={"/profile"} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AccountBoxTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={"View Profile"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticeboard" element={<ContentComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/buybooks" element={<BookStore />} />
          <Route path="/sellbooks" element={<SellBooksForm />} />
          <Route path="/yourorders" element={<YourOrder />} />
          <Route path="/yoursell" element={<YourSell />} />
          <Route path="/profile" element={<PersonalInfoForm />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Main>
    </Box>
  );
}
