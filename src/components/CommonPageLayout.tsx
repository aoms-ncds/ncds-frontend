import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CommonConstants from '../extras/CommonConfig';
import { allModuleRoutes } from '../extras/CommonRouter';
import { useLoader } from '../hooks/Loader';
import PermissionChecks from '../modules/User/components/PermissionChecks';
import { useAuth } from '../hooks/Authentication';
import { unsubscribe } from '../extras/Firebase/messaging';
import NotificationService from '../modules/Notification/extras/NotificationService';
import { enqueueSnackbar } from 'notistack';

const drawerWidth = 240;

const CommonPageLayout = (props: { children: React.ReactNode; title?: string; hidePageHeader?: boolean }) => {
  const loader = useLoader();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const auth = useAuth();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = useState<number>();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    NotificationService.getMyMessagesCount()
      .then((res) => {
        setNotificationsCount(res.data);
      })
      .catch((res) => {
        enqueueSnackbar({
          message: res.message,
          variant: 'error',
        });
      });
  }, []);


  useEffect(() => {
    if (loader.count && loader.count < 0) {
      throw Error('Load count must never be less than 0');
    }
  }, [loader.count]);

  useEffect(() => {
    document.title = props.title ? (`IET : ${props.title}`) : 'Indian Evangelical Team';
  }, [props.title]);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Grid sx={{ height: 155 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img src="/favicon.ico" alt="" style={{ height: 80, marginTop: 20 }} />
          <br/>
          <b>IET</b>
        </div>
      </Grid>
      <Divider />
      <List>
        {allModuleRoutes
          .map((moduleRoute, index) =>
            moduleRoute.pages.map((page, _index) =>
              !page.showInDrawer ? null : (
                !page.requiredAccessRights ? (
                  <NavLink
                    to={moduleRoute.base + page.path}
                    style={({ isActive }) =>
                      !isActive ?
                        {
                          color: theme.palette.text.secondary,
                          textDecoration: 'none',
                        } :
                        {
                          color: isDark ? 'black' : 'white',
                          textDecoration: 'none',
                          backgroundColor: theme.palette.primary.main,
                        }
                    }
                  >
                    <ListItem disablePadding sx={{ backgroundColor: 'inherit' }}>
                      <ListItemButton>
                        {<ListItemIcon sx={{ color: 'inherit' }}>{page.icon}</ListItemIcon>}
                        <ListItemText primary={page.title} />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                ) : (
                  <PermissionChecks
                    key={page.path + index + _index}
                    permissions={page.requiredAccessRights}
                    granted={(
                      <NavLink
                        to={moduleRoute.base + page.path}
                        style={({ isActive }) =>
                          !isActive ?
                            {
                              color: theme.palette.text.secondary,
                              textDecoration: 'none',
                            } :
                            {
                              color: isDark ? 'black' : 'white',
                              textDecoration: 'none',
                              backgroundColor: theme.palette.primary.main,
                            }
                        }
                      >
                        <ListItem disablePadding sx={{ backgroundColor: 'inherit' }}>
                          <ListItemButton>
                            {<ListItemIcon sx={{ color: 'inherit' }}>{page.icon}</ListItemIcon>}
                            <ListItemText primary={page.title} />
                          </ListItemButton>
                        </ListItem>
                      </NavLink>
                    )}
                  />
                )
              ),
            ),
          )
          .flat()}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {CommonConstants.appName}
          </Typography>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              sx={{ ml: 'auto' }}
              onClick={() => {
                // subscribe();
              }}
              component={Link}
              to="/notification"
              target='_blank'
            >
              <Badge badgeContent={notificationsCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
              <PersonIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appBar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem component={Link} to={`/users/${auth.user ? auth.user.kind+'/'+auth.user._id : ''}`} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={async () => {
              await unsubscribe();
              handleCloseUserMenu();
              localStorage.removeItem('userToken');
              localStorage.removeItem('userData');
              auth.setUser(false);
            }}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
        {loader.count != undefined && loader.count > 0 && <LinearProgress />}
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            'display': { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            'display': { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.title && !props.hidePageHeader && (
          <>
            <Typography variant="h4">{props.title}</Typography>
            <br />
            <Divider />
            <br />
          </>
        )}
        {props.children}
      </Box>
    </Box>
  );
};

export default CommonPageLayout;
