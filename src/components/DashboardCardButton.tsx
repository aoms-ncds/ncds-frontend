import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
    text-decoration: none;
    `;
// box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
// transform: translate(0, -2px);
// cursor: pointer;

const DashboardCardButton = (props: {
    primaryText: string;
    secondaryText?: string;
    color: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    targetRoute?: string;
}) => {
  return (
    <Card
      onClick={props.onClick}
      {
        ...(props.targetRoute && {
          component: StyledLink,
          to: props.targetRoute,
        })
      }
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
        }}>
        <CardContent>
          <Typography variant='h5'>{props.primaryText}</Typography>
          <Typography variant='h6'>{props.secondaryText}</Typography>
        </CardContent>
        <CardActions>
          {/* <Button variant='outlined' sx={{ ml: 'auto', color: 'white', borderColor: 'white' }}>Help</Button> */}
          <Button
            variant='contained'
            endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
            sx={{
              'ml': 'auto',
              'color': 'black',
              'bgcolor': 'white',
              '&:hover': {
                'color': 'black',
                'bgcolor': 'white',
              },
              '&:active': {
                'color': 'black',
                'bgcolor': 'white',
              },
            }}
          >Go</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCardButton;
