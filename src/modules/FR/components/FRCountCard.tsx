import { Badge, Card, CardActionArea, CardContent, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FRCountCard = (props: {
  count?: string; badgeColor?: 'default' | 'error' | 'primary' | 'secondary';
  secondaryText: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string;
}) => {
  const countCard = (

    <Card
      // onClick={props.onClick}
      // {...(props.targetRoute && {
      //   component: StyledLink,
      //   to: props.targetRoute,
      // })}
      sx={{
        'backgroundColor': props.color,
        'color': 'black',
        'borderRadius': 3,
        'transition': 'all 0.3s',
        'padding': 4,
        // '&:hover': {
        //   boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.6)',
        //   transform: 'translate(0, -2px)',
        //   cursor: 'pointer',
        // },
        // '&:active': {
        //   boxShadow: 'none !important',
        //   transform: 'translate(0, 2px)',
        //   cursor: 'pointer',
        // },
        'width': '100%',
      }}
    >
      {/* <CardActionArea
      > */}
      <CardContent>
        <Typography variant="h5"></Typography>
        <Typography variant="h6" align="center">
          {props.secondaryText}
        </Typography>
        <Typography variant="h6" color={'#5b4ec7'} fontWeight={600} align="center">
          {props.count}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
  return countCard;
};

export default FRCountCard;
