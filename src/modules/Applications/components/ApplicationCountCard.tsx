import { Card, CardActionArea, CardContent, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppCountCard = (props: { count?: string; secondaryText: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string }) => {
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
        <CardContent>
          <Typography variant="h5">{props.count}</Typography>
          <Typography variant="h6" align="right">
            {props.secondaryText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AppCountCard;
