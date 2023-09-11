import { Badge, Card, CardActionArea, CardContent, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FRCountCard = (props: { count?: string; badgeColor?: 'default' | 'error' | 'primary' | 'secondary';
 secondaryText: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string; }) => {
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
          <Typography variant="h5"></Typography>
          <Typography variant="h6" align="center">
            {props.secondaryText}
          </Typography>
        </CardContent>
        {props.count !== undefined && (
          <Grid style={{ position: 'absolute', top: 0, right: 0 }}>
            <Badge
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
                },
              }}

            ></Badge>
          </Grid>


        )}
      </CardActionArea>
    </Card>
  );
};

export default FRCountCard;
