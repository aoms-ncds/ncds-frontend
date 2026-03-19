import React, { useState } from 'react';
import { ArrowBackIos as ArrowBackIosIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { Button, ButtonGroup, Divider, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';

type DateRangeType = 'datetime' | 'days' | 'weeks' | 'months' | 'quarter_years' | 'years' | 'custom';
interface DateFilterProps {
  dateRage: DateRange;
  onChange: (newDateRange: DateRange) => void;
  rangeTypes: DateRangeType[];
  min?: Moment;
  max?: Moment;
}
const DateFilter = (props: DateFilterProps) => {
  const [currentRangeType, setCurrentRangeType] = useState<DateRangeType>('weeks');
  return (
    <>
      {props.rangeTypes.includes('custom') && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <DatePicker label="Start date" value={props.dateRage.startDate} slotProps={{ textField: { size: 'small', fullWidth: true } }} format="DD/MM/YYYY hh:mm:ss A" />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={2}>
              <DatePicker label="End date" value={props.dateRage.endDate} slotProps={{ textField: { size: 'small', fullWidth: true } }} format="DD/MM/YYYY hh:mm:ss A" />
            </Grid>
          </Grid>
        </>
      )}
      <Grid container spacing={3} sx={{ mt: 0.1 }}>
        <Grid item xs={12} md={6} lg={3} xl={2}>
          <ButtonGroup>
            {props.rangeTypes.includes('days') && (
              <>
                {/* ------------------------------------------- */}
                {/* DaysRange starts */}
                {currentRangeType === 'days' && (
                  <Button
                    sx={{ pr: 0, m: 0 }}
                    variant="contained"
                    onClick={() =>
                      props.onChange({
                        startDate: props.dateRage.startDate.clone().subtract(1, 'day').startOf('D'),
                        endDate: props.dateRage.startDate.clone().subtract(1, 'day').endOf('D'),
                      })
                    }
                  >
                    <ArrowBackIosIcon />
                  </Button>
                )}
                <Button
                  variant={currentRangeType === 'days' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setCurrentRangeType('days');
                    props.onChange({
                      startDate: moment().startOf('D'),
                      endDate: moment().endOf('D'),
                    });
                  }}
                >
                  Day
                  {currentRangeType === 'days' && (
                    <>
                      <Divider orientation="vertical" sx={{ ml: 1, height: '80%', bgcolor: 'black' }} />
                      <Typography variant="caption">{props.dateRage.startDate.format('DD/MM/YYYY') + ' To ' + props.dateRage.startDate.format('DD/MM/YYYY')}</Typography>
                    </>
                  )}
                </Button>
                {currentRangeType === 'days' && (
                  <Button
                    sx={{ pr: 0, m: 0 }}
                    variant="contained"
                    onClick={() =>
                      props.onChange({
                        startDate: props.dateRage.startDate.clone().add(1, 'day'),
                        endDate: props.dateRage.startDate.clone().add(1, 'day'),
                      })
                    }
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                )}
                {/* DaysRange ends */}
              </>
            )}
            {/* ------------------------------------------- */}
            {props.rangeTypes.includes('weeks') && (
              <>
                {/* WeeksRange starts */}
                {currentRangeType === 'weeks' && (
                  <Button
                    sx={{ pr: 0, m: 0 }}
                    variant="contained"
                    onClick={() =>
                      props.onChange({
                        startDate: props.dateRage.startDate.clone().subtract(1, 'week').startOf('D'),
                        endDate: props.dateRage.startDate.clone().subtract(1, 'week').endOf('D'),
                      })
                    }
                  >
                    <ArrowBackIosIcon />
                  </Button>
                )}
                <Button
                  variant={currentRangeType === 'weeks' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setCurrentRangeType('weeks');
                    props.onChange({
                      startDate: moment().startOf('week'),
                      endDate: moment().endOf('week'),
                    });
                  }}
                >
                  Week
                  {currentRangeType === 'weeks' && (
                    <>
                      <Divider orientation="vertical" sx={{ ml: 1, height: '80%', bgcolor: 'black' }} />
                      <Typography variant="caption">{props.dateRage.startDate.format('DD/MM/YYYY') + ' To ' + props.dateRage.startDate.format('DD/MM/YYYY')}</Typography>
                    </>
                  )}
                </Button>
                {currentRangeType === 'weeks' && (
                  <Button
                    sx={{ pr: 0, m: 0 }}
                    variant="contained"
                    onClick={() =>
                      props.onChange({
                        startDate: props.dateRage.startDate.clone().add(1, 'week').startOf('D'),
                        endDate: props.dateRage.startDate.clone().add(1, 'week').endOf('D'),
                      })
                    }
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                )}
                {/* WeeksRange ends */}
              </>
            )}
            {/* ------------------------------------------- */}
          </ButtonGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default DateFilter;
