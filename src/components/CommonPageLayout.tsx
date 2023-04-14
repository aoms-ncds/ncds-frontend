import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
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
import { Menu as MenuIcon, Person as PersonIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import homePageRoutes from '../pages/Home/extras/HomeRoutes';
import { Link, NavLink } from 'react-router-dom';
import divisionsPageRoutes from '../pages/Divisions/extras/DivisionsRoutes';
import frPageRoutes from '../pages/FR/extras/FRRoutes';
import hrPageRoutes from '../pages/HR/extras/HRRoutes';
import iroPageRoutes from '../pages/IRO/extras/IRORoutes';
import workersPageRoutes from '../pages/Workers/extras/WorkersRoutes';
import CommonConstants from '../extras/CommonConstants';

const drawerWidth = 240;

const CommonPageLayout = (props: {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  loadCount?: number;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
    if (props.loadCount && props.loadCount < 0) {
      throw Error('Load count must never be less than 0');
    }
  }, [props.loadCount]);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <img src="/iet_logo.png" alt="" style={{ width: '100%' }} />
      <Divider />
      <List>
        {([] as (JSX.Element | null)[]).concat(
          ...[
            homePageRoutes,
            hrPageRoutes,
            divisionsPageRoutes,
            workersPageRoutes,
            frPageRoutes,
            iroPageRoutes,
          ].map((moduleRoute) =>
            moduleRoute.pages.map((page) =>
              !page.showInDrawer ? null : (
                <NavLink
                  key={page.path}
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
                      {<ListItemIcon sx={{ color: 'inherit' }}>
                        {page.icon}
                      </ListItemIcon>}
                      <ListItemText primary={page.title} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ),
            ),
          ),
        )}
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {CommonConstants.appName}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, marginLeft: 'auto' }}
              color="inherit"
            >
              <PersonIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
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
            <MenuItem
              component={Link}
              to={'/users/profile/me'}
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
        {props.loadCount != undefined && props.loadCount > 0 && (
          <LinearProgress />
        )}
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
        {props.title && <>
          <Typography variant='h4'>{props.title}</Typography>
          <br />
          <Divider />
          <br />
        </>}
        {props.children}
      </Box>
    </Box>
  );
};

export default CommonPageLayout;
