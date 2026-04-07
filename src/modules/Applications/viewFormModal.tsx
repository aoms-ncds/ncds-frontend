import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Button,
} from '@mui/material';

const ViewFormModal = ({ open, onClose, data }: any) => {
  if (!data) return null;

  const renderFields = (obj: any, prefix = '') => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];

      // nested object
      if (typeof value === 'object' && value !== null) {
        return (
          <Grid item xs={12} key={prefix + key}>
            <strong style={{ textTransform: 'capitalize' }}>{key}</strong>
            <Grid container spacing={2}>
              {renderFields(value, prefix + key)}
            </Grid>
          </Grid>
        );
      }

      return (
        <Grid item xs={12} md={6} key={prefix + key}>
          <TextField
            fullWidth
            label={key}
            value={value || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>View Form</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {renderFields(data.formData)}
        </Grid>

        <Button
          onClick={onClose}
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewFormModal;
