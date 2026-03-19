import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledLink = styled(Link)`
  text-decoration: none;
`;
// box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.6);
// transform: translate(0, -2px);
// cursor: pointer;

const DashboardCardButton = (props: { primaryText: string;icon?: React.ReactNode; secondaryText?: string; color: string; onClick?: React.MouseEventHandler<HTMLDivElement>; targetRoute?: string }) => {
  return (
    <Card
      onClick={props.onClick}
      {...(props.targetRoute && {
        component: StyledLink,
        to: props.targetRoute,
      })}
      sx={{
        'borderRadius': 3,
        'boxShadow': '14px 20px 24px rgba(2, 2, 2, 0.08)',
        'backgroundColor': '#ffffff',
        'height': { xs: 80, sm: 90 },
        'display': 'flex',
        'alignItems': 'stretch',
        'cursor': 'pointer',
        'transition': 'all 0.25s ease',
        'borderColor': '#e5e7eb',
        'borderWidth': 1,
        'borderStyle': 'solid',
        '&:hover': {
          boxShadow: '20px 20px 22px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
          backgroundColor: '#e9e9fc',
        },
      }}
    >
      {/* LEFT COLOR STRIP */}
      {/* <Box
        sx={{
          width: 4,
          backgroundColor: '#ffffff',
          borderRadius: '2px 0 0 2px',
        }}
      /> */}

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          position: 'relative', // ✅ important
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 0,
        }}
      >
        {/* LEFT: ICON + TEXT */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          {/* ICON */}
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: '#eef2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {props.icon}
          </Box>

          {/* TEXT */}
          <Typography
            fontSize={{ xs: 14, sm: 15 }}
            fontWeight={600}
            color="text.primary"
          >
            {props.primaryText}
          </Typography>
        </Box>

        {/* GO BUTTON – bottom right */}
        {/* <Button
          size="small"
          variant="contained"
          sx={{
            'position': 'absolute',
            'bottom': 8,
            'right': 8,
            'minWidth': 44,
            'height': 26,
            'fontSize': 12,
            'borderRadius': 100,
            'textTransform': 'none',
            'backgroundColor': '#ff7c24',
            'boxShadow': 'none',
            '&:hover': {
              backgroundColor: '#0c37c9',
            },
          }}
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent card click
          }}
        >
          <KeyboardDoubleArrowRightOutlinedIcon fontSize="small" />
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default DashboardCardButton;
