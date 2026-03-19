import { Badge, Card, CardActionArea, CardContent, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AppCountCard = (props: { count?: string; secondaryText: string;
   badgeColor?: 'default' | 'error' | 'primary' | 'secondary'; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string; }) => {
  const countCard = (
    <Card
    // onClick={props.onClick}
    // {...(props.targetRoute && {
    //   component: StyledLink,
    //   to: props.targetRoute,
    // })}
      sx={{
        'backgroundColor': props.color,
        'color': 'white',
        'borderRadius': 3,
        'transition': 'all 0.3s',
        'padding': 4,
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
        'width': '100%',
      }}
    >
      <CardActionArea
      >
        <CardContent>
          <Typography variant="h5"></Typography>
          <Typography variant="h6" align="center">
            {props.secondaryText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return props.count !== undefined ? <Badge
    max={9999}
    badgeContent={props.count}
    color={props.badgeColor || 'error'}
    showZero
    sx={{
      '& .MuiBadge-badge': {
        width: '3rem',
        height: '3rem',
        fontSize: '1.5rem',
        borderRadius: '50%',
        // position: 'absolute', top: 0, right: 0,
        zIndex: 9999,
      },
      'width': '100%',
    }}

  >
    {countCard}
  </Badge>:countCard;
};

export default AppCountCard;
