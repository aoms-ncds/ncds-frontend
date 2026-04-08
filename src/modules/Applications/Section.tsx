import { Paper, Typography, Divider, Grid } from "@mui/material";

const Section = ({ title, children }: any) => (
  <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
    <Typography variant="h6" sx={{ mb: 2, color: "#1976d2", fontWeight: 600 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2}>{children}</Grid>
  </Paper>
);
export default Section;