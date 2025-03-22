import { Badge, Box, Card, CardActionArea, CardContent, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FRCountCard = (props: {
  count?: string; badgeColor?: 'default' | 'error' | 'primary' | 'secondary';
  icon?: React.ReactNode;
  secondaryText: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string;
}) => {
  const countCard = (

    <Card
      onClick={props.onClick}
      {...(props.targetRoute && {
        component: StyledLink,
        to: props.targetRoute,
      })}
      sx={{
        'fontSize': '12px',
        'border': '2px solid #3B32E6',
        'backgroundColor': props.color,
        // 'color': 'white',
        'borderRadius': 3,
        'transition': 'all 0.3s',
        'padding': 1,
        'height': 190,
        '&:hover': {
          boxShadow: '0 8px 16px 0 rgba(0, 217, 255, 0.6)',
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
      {/* <CardActionArea
      > */}
      <CardContent >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ marginRight: '1px' }}>{props.icon}</Box>
          <Typography sx={{ alignContent: 'center' }} fontWeight={600} variant="h6" align="right">
            {props.secondaryText}
          </Typography>
        </Box>

        <Typography variant="h6" color={'#8833ff'} fontSize={34} fontWeight={600} align="right">
          {props.count}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
  return countCard;
};

export default FRCountCard;
