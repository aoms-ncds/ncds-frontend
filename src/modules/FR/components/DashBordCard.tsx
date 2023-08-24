import React from 'react';
import { Badge, Card, CardActionArea, Grid, CardContent, Typography, styled, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Notifications as NotificationsIcon } from '@mui/icons-material'; // You can import the icon you want to use
import BorderInnerIcon from '@mui/icons-material/BorderInner';
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const DashBoardCard = (props: {
    count?: string;
    secondaryText: string;
    color: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    targetRoute?: string;
    icon?: React.ReactNode; // Allow passing an icon as a prop
    badgeContent?: number;
    badgeColor?: 'default' | 'error' | 'primary' | 'secondary'; // Allow customizing badge color
    contentAlignment?: 'left' | 'center' | 'right'; // Allow customizing content alignment
  }) => {
  return (
    <Card
      onClick={props.onClick}
      {...(props.targetRoute && {
        component: StyledLink,
        to: props.targetRoute,
      })}
    >
      <CardActionArea
        sx={{
          'backgroundColor': props.color,
          'color': 'white',
          'borderRadius': 3,
          'transition': 'all 0.3s',
          'padding': 2,
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.6)',
            transform: 'translate(0, -2px)',
            cursor: 'pointer',
          },
          '&:active': {
            boxShadow: 'none !important',
            transform: 'translate(0, 2px)',
            cursor: 'pointer',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontSize: '2.5rem' }}>
            {/* {props.count} */}
          </Typography>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {props.secondaryText}
            <Box sx={{ marginLeft: '10px' }}>{props.icon}</Box> {/* Adjust the margin here */}
          </Typography>
        </CardContent>


        {props.count !== undefined && (
          <Grid style={{position: 'absolute', top: 0, right: 0 }}>
            <Badge
              max={9999}
              badgeContent={props.count}
              color={props.badgeColor || 'error'}
              showZero
              sx={{
                fontSize: '4rem', // Increase the font size significantly
                width: '6rem', // Increase the badge width
                height: '6rem', // Increase the badge height
              }}
            ></Badge>
          </Grid>


        )}
      </CardActionArea>
    </Card>
  );
};


export default DashBoardCard;
