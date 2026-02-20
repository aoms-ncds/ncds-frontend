import { Badge, Box, Card, CardActionArea, CardContent, Grid, MenuItem, TextField, Typography, styled } from '@mui/material';
import { useState } from 'react';
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [year, setYear] = useState(new Date().getFullYear());
  const countCard = (
    <Card
      onClick={props.onClick}
      {...(props.targetRoute && {
        component: StyledLink,
        to: props.targetRoute,
      })}
      sx={{
        'fontSize': '12px',
        'border': '1px solid #E5E7EB',
        'backgroundColor': '#fff',
        'borderRadius': 5,
        'transition': 'all 0.3s',
        'height': { xs: 160, sm: 140, md: 120 },
        'display': 'flex',
        'overflow': 'hidden',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(88, 240, 17, 0.12)',
          transform: 'translateY(-2px)',
          cursor: 'pointer',
        },
        '&:active': {
          boxShadow: 'none',
          transform: 'translateY(1px)',
        },
      }}
    >
      {/* LEFT COLOR STRIP */}
      <Box
        sx={{
          width: 5,
          backgroundColor: props.color || '#3B32E6',
          flexShrink: 0,
        }}
      />

      {/* CONTENT */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column', // ✅ stack vertically
          justifyContent: 'space-between',
          paddingLeft: 2.5, // ✅ left margin from strip
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        {/* TOP: TITLE */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            fontWeight={600}
            fontSize={{ xs: 14, sm: 16 }}
            color="text.primary"
          >
            {props.secondaryText}
          </Typography>

          <TextField
            select
            size="small"
            value={year}
            onClick={(e) => e.stopPropagation()} // ✅ blocks card click
            onMouseDown={(e) => e.stopPropagation()} // ✅ mobile fix
            onChange={(e) => {
              e.stopPropagation(); // ✅ blocks bubbling
              setYear(Number(e.target.value));
            }}
            sx={{
              'minWidth': 80,
              '& .MuiOutlinedInput-root': {
                'height': 30,
                'fontSize': 12,
                'borderRadius': 2,
                'color': '#3B32E6',
                'fontWeight': 600,
                // 'border': '1px solid #3B32E6',
                '&:hover fieldset': {
                  borderColor: '#3B32E6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3B32E6',
                },
              },
            }}
          >
            {years.map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            // mt: 1,
          }}
        >
          <Box >{props.icon}</Box>

          <Typography
            fontWeight={700}
            fontSize={{ xs: 20, sm: 26, md: 30 }}
            color={'#3B32E6'}
          >
            {props.count || '0'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
  return countCard;
};

export default FRCountCard;
