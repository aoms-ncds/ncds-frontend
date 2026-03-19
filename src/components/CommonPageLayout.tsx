import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
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
import UserServices from '../modules/User/extras/UserServices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
const CommonPageLayout = (props: { children: React.ReactNode; title?: string;
   status?:string; hidePageHeader?: boolean; momentFilter?: DateFilterProps; appBarSx?: SxProps; mainContentSx?: SxProps; }) => {
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
  // console.log(userId, 'ii');
  if (auth.user) {
    const divDi = auth?.user?.division?.toString();
    // console.log(divDi, 'divDi');

    useEffect(() => {
      if (divDi) {
        DivisionsServices.getDivisionById(divDi).then((res) => {
          setDivision(res.data.details.name);
        });
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
    document.title = 'IET-AOMS';
  }, [props.title]);


  const [logs, setLog] = useState<ILog |null>();

  useEffect(() => {
    UserServices.getLastLog()
      .then((response) => {
        if (response.data) {
          setLog(response.data);
        } else {
          setLog(null);
        }
      })
      .catch((err) => {
        console.error('Error fetching log:', err);
      });
  }, []);


  const drawer = (
    <div>

      {/* <Toolbar /> */}
      {/* <Grid sx={{ height: 100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img src="/favicon.ico" alt="" style={{ height: 90, marginTop: 20 }} />
          <br />

          <div>
          </div>
        </div>
      </Grid>
      <Divider /> */}
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
                      <ListItemText primary={page.title} /> <Typography>{props.status}</Typography>
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
                            color: isDark ? 'white' : 'black',
                            textDecoration: 'none',
                            backgroundColor: 'rgb(224, 224, 224)',
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
      {/* <Divider /> */}
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
        {/* <ArrowBackIcon/> */}

        <Toolbar >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <img src="/favicon.ico" alt="" style={{ height: 50 }} />
          </div>
          <Typography variant="h6" noWrap component="div" sx={{ padding: '10px', fontSize: '17px', marginRight: '15px' }}>
            {'IET - AOMS'}
          </Typography>
          &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <Divider /> */}
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawer} sx={{ mr: 2, display: isMobile ? 'none' : 'inherit' }}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ ml: 'auto', fontSize: '13px' }}>
            Last Login: {logs?.createdAt?.format('hh:mm A DD/MM/YYYY')}
          </Typography>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
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
                  {`${auth.user?.basicDetails.firstName} ${auth.user?.basicDetails.middleName ?? ''} ${auth.user?.basicDetails.lastName ?? ''}`}
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
              marginTop: '65px',
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
        {/* <br />
        <br /> */}
        <Grid sx={{ p: 2 }} container spacing={2} alignItems="start" justifyContent="space-between">
          {/* Left Side: Back Icon + Title */}
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            {props.title && !props.hidePageHeader && (
              <Typography variant="h6" fontWeight={600} color="text.primary">
                {props.title}
                {props.status && (
                  <>
                    {' - '}
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: 14,
                        fontWeight: 700,
                        backgroundColor: '#E3F2FD',
                        color: '#1976D2',
                      }}
                    >
                      {props.status}
                    </Box>
                  </>
                )}


                <Divider sx={{ mt: 1 }} />
              </Typography>
            )}
          </Grid>
          {/* Right Side: MomentFilter */}

          {props.momentFilter && (
            <Grid item>
              <MomentFilter
                dateRange={props.momentFilter.dateRange}
                onChange={props.momentFilter.onChange}
                rangeTypes={props.momentFilter.rangeTypes}
                initialRange={props.momentFilter.initialRange}
                sx={{
                  minHeight: 25,
                  minWidth: 240,
                  justifyContent: 'flex-end',
                }}
                min={props.momentFilter.min}
                max={props.momentFilter.max}
              />
            </Grid>
          )}

        </Grid>

        <Button
          sx={{
            backgroundColor: 'orange',
            display: { xs: 'block', sm: 'none' }, // Show only on mobile (xs), hide on larger screens (sm and up)
          }}
          variant='contained'
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon />
        </Button>

        {/* <br />
        <Divider />
        <br /> */}

        {props.children}
      </Box>
    </Box>
  );
};

export default CommonPageLayout;
