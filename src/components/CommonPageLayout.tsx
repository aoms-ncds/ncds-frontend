import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
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
  SxProps,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Moment } from 'moment';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import CommonConstants from '../extras/CommonConfig';
import { allModuleRoutes } from '../extras/CommonRouter';
import { unsubscribe } from '../extras/Firebase/messaging';
import { useAuth } from '../hooks/Authentication';
import { useLoader } from '../hooks/Loader';
import NotificationService from '../modules/Notification/extras/NotificationService';
import PermissionChecks from '../modules/User/components/PermissionChecks';
import MomentFilter from './MomentFilter';
import StaffServices from '../modules/HR/extras/StaffServices';
import WorkersServices from '../modules/Workers/extras/WorkersServices';
import DivisionsServices from '../modules/Divisions/extras/DivisionsServices';

const drawerWidth = 240;


type DateRangeType = 'date-time' | 'days' | 'weeks' | 'months' | 'quarter_years' | 'years' | 'customDay' | 'customRange';
interface DateFilterProps {
  dateRange: DateRange;
  onChange: (newDateRange: DateRange) => void;
  rangeTypes: DateRangeType[];
  initialRange?: DateRangeType;
  min?: Moment;
  max?: Moment;
}
const CommonPageLayout = (props: { children: React.ReactNode; title?: string; hidePageHeader?: boolean; momentFilter?: DateFilterProps; appBarSx?: SxProps; mainContentSx?: SxProps }) => {
  const loader = useLoader();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const auth = useAuth();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notificationsCount, setNotificationsCount] = useState<number>();
  const [open, setOpen] = useState(true);
  const [Division, setDivision] = useState('');
  const { userId, userKind } = useParams();
  console.log(userId, 'ii');
  if (auth.user) {
    const divDi = auth?.user?.division?.toString();
    console.log(divDi, 'divDi');

    useEffect(() => {
      if (divDi) {
        DivisionsServices.getDivisionById(divDi).then((res) => {
          setDivision(res.data.details.name);


        })
      }
    }, []);
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerEnter = () => {
    setOpen(true);
  };

  const handleDrawerLeave = () => {
    // if(){
    //   setOpen(false);
    // }
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
    document.title = props.title ? `IET : ${props.title}` : 'Indian Evangelical Team';
  }, [props.title]);


  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Grid sx={{ height: 100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img src="/favicon.ico" alt="" style={{ height: 90, marginTop: 20 }} />
          <br />
          {/* <b>IET</b> */}
          <div>
          </div>
        </div>
      </Grid>
      <Divider />
      <List>
        {allModuleRoutes
          .map((moduleRoute, index) =>
            moduleRoute.pages.map((page, _index) =>
              !page.showInDrawer ? null : !page.requiredAccessRights ? (
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
                  granted={
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
                  }
                />
              ),
            ),
          )
          .flat()}
      </List>
      <Divider />
    </div>
  );

  const handleDrawer = () => {
    setOpen(!open); // Toggle the state of the drawer
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.primary.main,
          // width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          // ml: { sm: `${drawerWidth}px` },
          // width: () => {
          //   if (isMobile) {
          //     console.log('mobile');
          //     return mobileOpen ? `calc(100% - ${drawerWidth}px)` : '100%';
          //   } else {
          //     console.log('desktop');
          //     return open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${60}px)`;
          //   }
          // },
          // transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          ...props.appBarSx,
        }}
      >
        <Toolbar >
          <Typography variant="h6" noWrap component="div" sx={{ padding: '10px', fontSize: '17px', marginRight: '15px' }}>
            {CommonConstants.appName}
          </Typography>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawer} sx={{ mr: 2, display: isMobile ? 'none' : 'inherit' }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontSize: '13px' }}>
            {props.title}
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
              target="_blank"
            >
              <Badge badgeContent={notificationsCount} color="error">
                <NotificationsIcon />
              </Badge>
              <Grid item xs={12} md={1}>
              </Grid>
            </IconButton>
          </Tooltip>
          &nbsp;&nbsp;
          {/* <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
              <PersonIcon fontSize="large" />
            </IconButton>
          </Tooltip> */}
          {auth?.user && (

            <>
              {auth?.user?.division?._id}
              <Avatar
                sx={{ width: 40, height: 40 }}
                src={`${auth.user.imageURL?.replace('uc', 'thumbnail')}`}
                alt={`${auth.user.basicDetails?.firstName}`}
                onClick={handleOpenUserMenu} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ paddingLeft: '5px', fontSize: '15px', fontWeight: '600' }} variant="h6" component='span'>
                  {`${auth.user?.basicDetails.firstName} ${auth.user?.basicDetails.lastName}`}
                </Typography>
                <Typography sx={{ paddingLeft: '8px', fontSize: '13px', fontWeight: '500' }} variant="body1" component='span'>
                  {Division}
                </Typography>
              </div>

            </>
          )}
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
            <MenuItem component={Link} to={`/users/${auth.user ? auth.user.kind + '/' + auth.user._id : ''}`} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await unsubscribe();
                handleCloseUserMenu();
                localStorage.removeItem('userToken');
                localStorage.removeItem('userData');
                auth.setUser(false);
              }}
            >
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
          variant="persistent"
          onMouseEnter={handleDrawerEnter}
          onMouseLeave={handleDrawerLeave}
          sx={{
            'display': { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              // transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
              width: open ? drawerWidth : '70px',
              marginTop: '65px'
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
          // width: `calc(100% - ${open ? drawerWidth : 60}px)`, // Adjust width based on the drawer state
          // transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms', // Transition effect // Initial open drawer margin
          ...(!open && {
            marginLeft: '-180px', // Reset margin when drawer is open
          }),
          ...props.mainContentSx,
        }}
      >
        <Toolbar />
        {props.title && !props.hidePageHeader && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                {/* <Typography variant="h4" color="color.secondary">
                  {props.title}
                </Typography> */}
              </Grid>
              <Grid item xs={12} md={3} >
                {props.momentFilter && (
                  <MomentFilter
                    dateRange={props.momentFilter.dateRange}
                    onChange={props.momentFilter.onChange}
                    rangeTypes={props.momentFilter.rangeTypes}
                    initialRange={props.momentFilter.initialRange}
                    sx={{
                      minHeight: 40,
                      minWidth: 268,
                      // width: "100%",
                      justifyContent: 'flex-end',
                    }}
                    min={props.momentFilter.min}
                    max={props.momentFilter.max}
                  />
                )}
              </Grid>
            </Grid>

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
