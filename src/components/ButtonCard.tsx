import React from 'react';
import { Badge, Card, CardActionArea, Grid, CardContent, Typography, styled, IconButton, Box, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ButtonCard = (props: {
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

    <Box sx={{ color: "red" }}>

      <Card
        onClick={props.onClick}
        {...(props.targetRoute && {
          component: StyledLink,
          to: props.targetRoute,
        })}
      >
        <CardActionArea
          sx={{
            'border': '2px solid #3B32E6',
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
            <br />

            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', color: 'black' }}>
              {props.secondaryText}
            </Typography>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'end', justifyContent: 'end', color: '#8833ff', fontWeight: 600 }}>
              {props.count}
              {/* <Box sx={{ marginLeft: '10px' }}>{props.icon}</Box> Adjust the margin here */}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', color: 'black' }}>{props.icon}</Box>
          </CardContent>

          {/* 
        {props.count !== undefined && (
          <Grid style={{ position: 'absolute', top: 0, right: 0 }}>
            <Badge
              max={10000000}
              badgeContent={props.count}
              color={props.badgeColor || 'error'}
              showZero
              sx={{
                '& .MuiBadge-badge': {
                  width: '3rem',
                  height: '3rem',
                  fontSize: '1.5rem',
                  borderRadius: '50%',

                },
              }}

            ></Badge>
          </Grid>


        )} */}
          <CardActions >
            {/* <Button variant='outlined' sx={{ ml: 'auto', color: 'white', borderColor: 'white' }}>Help</Button> */}
            <Button
              variant="contained"
              endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
              sx={{
                'ml': 'auto',
                'color': 'white',
                'bgcolor': 'orange',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'orange',
                },
                '&:active': {
                  color: 'white',
                  bgcolor: 'orange',
                },
              }}
            >
              Go
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};


export default ButtonCard;
