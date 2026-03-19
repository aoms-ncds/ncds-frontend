import React, { useState } from 'react';
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  CalendarMonthOutlined,
  CalendarTodayTwoTone,
  DateRangeOutlined,
  FilterList,
  TodayOutlined,
} from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';


interface DateFilterProps {
  dateRange: DateRange;
  onChange: (newDateRange: DateRange) => void;
  rangeTypes: DateRangeType[];
  initialRange?: DateRangeType;
  min?: Moment;
  max?: Moment;
  sx?: SxProps<Theme>;
}

const MomentFilter = (props: DateFilterProps) => {
  const [currentRangeType, setCurrentRangeType] = useState<DateRangeType>(
    props.initialRange ? props.initialRange : 'weeks',
  );

  const [tmpDateRange, setTmpDateRange] = useState<
    DateRange
  >({
    startDate: moment(),
    endDate: moment(),
  });

  // Dialog Controls
  const [open, toggleOpen] = useState(false);

  // Menu controls
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {' '}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={0}
      >
        <ButtonGroup
          sx={
            props.sx ?
              props.sx :
              {
                minHeight: 52,
                minWidth: 342,
              }
          }
        >
          <Button
            sx={{ pr: 0, m: 0, width: '10%', borderRadius: '25px 0 0 25px  ' }}
            variant="contained"
            onClick={() =>
              currentRangeType === 'days' || currentRangeType === 'customDay' ?
                props.onChange({
                  startDate: props.dateRange.startDate
                    .clone()
                    .subtract(1, 'day')
                    .startOf('D'),
                  endDate: props.dateRange.endDate
                    .clone()
                    .subtract(1, 'day')
                    .endOf('D'),
                  rangeType: currentRangeType,
                }) :
                currentRangeType === 'weeks' ?
                  props.onChange({
                    startDate: props.dateRange.startDate
                      .clone()
                      .subtract(1, 'week')
                      .startOf('D'),
                    endDate: props.dateRange.endDate
                      .clone()
                      .subtract(1, 'week')
                      .endOf('D'),
                    rangeType: currentRangeType,
                  }) :
                  currentRangeType === 'months' ?
                    props.onChange({
                      startDate: props.dateRange.startDate
                        .clone()
                        .subtract(1, 'month')
                        .startOf('month'),
                      endDate: props.dateRange.endDate
                        .clone()
                        .subtract(1, 'month')
                        .endOf('month'),
                      rangeType: currentRangeType,
                    }) :
                    currentRangeType === 'quarter_years' ?
                      props.onChange({
                        startDate: props.dateRange.startDate
                          .clone()
                          .subtract(3, 'month')
                          .startOf('month'),
                        endDate: props.dateRange.endDate
                          .clone()
                          .subtract(3, 'month')
                          .endOf('month'),
                        rangeType: currentRangeType,
                      }) :
                      currentRangeType === 'years' ?
                        props.onChange({
                          startDate: props.dateRange.startDate
                            .clone()
                            .subtract(1, 'year')
                            .startOf('year'),
                          endDate: props.dateRange.endDate
                            .clone()
                            .subtract(1, 'year')
                            .endOf('year'),
                          rangeType: currentRangeType,
                        }) :
                        ' '
            }
            disabled={currentRangeType === 'customRange'}
          >
            <ArrowBackIosIcon />
          </Button>

          {/* ------------------------------------------- */}
          {/* DaysRange starts */}
          {currentRangeType === 'days' && (
            <Button
              variant={currentRangeType === 'days' ? 'contained' : 'outlined'}
              onClick={() => {
                setCurrentRangeType('days');
                props.onChange({
                  startDate: moment().startOf('D'),
                  endDate: moment().endOf('D'),
                  rangeType: currentRangeType,
                });
              }}
              sx={{ width: '70%', p: 0 }}
            >
              <Typography variant="body1" textAlign="center" width={'50%'}>
                Day
              </Typography>

              <Divider
                orientation="vertical"
                sx={{ mr: 0.5, height: '80%', bgcolor: 'black' }}
              />
              <Typography variant="caption" textAlign="center" width={'50%'}>
                {props.dateRange.startDate.format('DD/MM/YYYY')}
              </Typography>
            </Button>
          )}
          {/* DaysRange ends */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* WeeksRange starts */}
          {currentRangeType === 'weeks' && (
            <Button
              variant={currentRangeType === 'weeks' ? 'contained' : 'outlined'}
              onClick={() => {
                setCurrentRangeType('weeks');
                props.onChange({
                  startDate: moment().startOf('week'),
                  endDate: moment().endOf('week'),
                  rangeType: currentRangeType,
                });
              }}
              sx={{ width: '70%', p: 0 }}
            >
              <Typography variant="body1" textAlign="center" width={'50%'}>
                Week
              </Typography>
              <Divider
                orientation="vertical"
                sx={{ mr: 0.5, height: '80%', bgcolor: 'black' }}
              />
              <Typography
                variant="caption"
                textAlign="center"
                width={'50%'}
                noWrap
                sx={{ m: 0, p: 0 }}
              >
                {props.dateRange.startDate.format('DD/MM/YYYY')}
                <Divider
                  light={true}
                  variant="middle"
                  sx={{ width: '75%', backgroundColor: 'CaptionText' }}
                />
                {props.dateRange.endDate.format('DD/MM/YYYY')}
              </Typography>
            </Button>
          )}
          {/* WeeksRange ends */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* MonthsRange starts */}
          {currentRangeType === 'months' && (
            <Button
              variant={currentRangeType === 'months' ? 'contained' : 'outlined'}
              onClick={() => {
                setCurrentRangeType('months');
                props.onChange({
                  startDate: moment().startOf('month'),
                  endDate: moment().endOf('month'),
                  rangeType: currentRangeType,
                });
              }}
              sx={{ width: '70%', p: 0 }}
            >
              <Typography variant="body1" textAlign="center" width={'50%'}>
                Month
              </Typography>

              <Divider
                orientation="vertical"
                sx={{ mr: 0.5, height: '80%', bgcolor: 'black' }}
              />
              <Typography variant="caption" align="center" width={'50%'} noWrap>
                {props.dateRange.startDate.format('MMM YYYY')}
              </Typography>
            </Button>
          )}
          {/* MonthRange ends */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* QuarterYearRange starts */}
          {currentRangeType === 'quarter_years' && (
            <Button
              variant={
                currentRangeType === 'quarter_years' ? 'contained' : 'outlined'
              }
              onClick={() => {
                setCurrentRangeType('quarter_years');
                props.onChange({
                  startDate: moment().startOf('quarter'),
                  endDate: moment().endOf('quarter'),
                  rangeType: currentRangeType,
                });
              }}
              sx={{ width: '70%', p: 0 }}
            >
              <Typography variant="body1" textAlign="center" width={'50%'}>
                Quarter
              </Typography>
              <Divider
                orientation="vertical"
                sx={{
                  mr: 0.5,
                  height: '80%',
                  bgcolor: 'black',
                }}
              />
              <Typography
                variant="caption"
                noWrap
                textAlign="center"
                width={'50%'}
                sx={{ m: 0, p: 0 }}
              >
                {props.dateRange.startDate.format('MMM YYYY')}
                <Divider
                  light={true}
                  variant="middle"
                  sx={{ width: '70%', backgroundColor: 'CaptionText' }}
                />
                {props.dateRange.endDate.format('MMM YYYY')}
              </Typography>
            </Button>
          )}
          {/* QuarterYearRange ends */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* YearRange starts */}
          {currentRangeType === 'years' && (
            <Button
              variant={currentRangeType === 'years' ? 'contained' : 'outlined'}
              onClick={() => {
                setCurrentRangeType('years');
                props.onChange({
                  startDate: moment().startOf('year'),
                  endDate: moment().endOf('year'),
                  rangeType: currentRangeType,
                });
              }}
              sx={{ width: '70%', p: 0 }}
            >
              <Typography variant="body1" textAlign="center" width={'50%'}>
                Year
              </Typography>{' '}
              <Divider
                orientation="vertical"
                sx={{ mr: 0.5, height: '80%', bgcolor: 'black' }}
              />
              <Typography variant="caption" width={'50%'}>
                {props.dateRange.startDate.format('YYYY')}
              </Typography>
            </Button>
          )}
          {/* YearRange ends */}
          {/* ------------------------------------------- */}

          {/* CustomDay starts */}
          {currentRangeType === 'customDay' && (
            <Button
              variant={
                currentRangeType === 'customDay' ? 'contained' : 'outlined'
              }
              onClick={() => {
                setCurrentRangeType('customDay');
                toggleOpen(true);
              }}
              sx={{ width: '100%', p: 0 }}
            >
              <Typography variant="body2" textAlign="center" width={'50%'}>
                Custom Day
              </Typography>{' '}
              <Divider
                orientation="vertical"
                sx={{ mr: 0.5, height: '80%', bgcolor: 'black' }}
              />
              <Typography
                variant="caption"
                align="center"
                textAlign="center"
                width={'50%'}
                noWrap
                sx={{ m: 0, p: 0 }}
              >
                {props.dateRange.startDate.format('DD/MM/YYYY')}
              </Typography>
            </Button>
          )}
          {/* CustomDay ends */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* CustomRange starts */}
          {currentRangeType === 'customRange' && (
            <Button
              variant={
                currentRangeType === 'customRange' ? 'contained' : 'outlined'
              }
              onClick={() => {
                setCurrentRangeType('customRange');
                toggleOpen(true);
              }}
              sx={{ width: '100%', p: 0 }}
            >
              <Typography variant="body2" textAlign="center" width={'50%'}>
                Custom Range
              </Typography>{' '}
              <Divider
                orientation="vertical"
                sx={{
                  mr: 0.5,
                  height: '80%',
                  bgcolor: 'black',
                }}
              />
              <Typography
                variant="caption"
                noWrap
                textAlign="center"
                width={'50%'}
                sx={{ m: 0, p: 0 }}
              >
                {props.dateRange.startDate.format('DD/MM/YYYY')}
                <Divider
                  light={true}
                  variant="middle"
                  sx={{ width: '70%', backgroundColor: 'CaptionText' }}
                />
                {props.dateRange.endDate.format('DD/MM/YYYY')}
              </Typography>
            </Button>
          )}
          {/* CustomRange ends */}
          {/* ------------------------------------------- */}

          <Button
            sx={{ pl: 0, m: 0, width: '10%', borderRadius: ' 0 25px 25px 0' }}
            variant="contained"
            onClick={() =>
              currentRangeType === 'days' || currentRangeType === 'customDay' ?
                props.onChange({
                  startDate: props.dateRange.startDate.clone().add(1, 'day'),
                  endDate: props.dateRange.endDate.clone().add(1, 'day'),
                  rangeType: currentRangeType,
                }) :
                currentRangeType === 'weeks' ?
                  props.onChange({
                    startDate: props.dateRange.startDate
                      .clone()
                      .add(1, 'week')
                      .startOf('D'),
                    endDate: props.dateRange.endDate
                      .clone()
                      .add(1, 'week')
                      .endOf('D'),
                    rangeType: currentRangeType,
                  }) :
                  currentRangeType === 'months' ?
                    props.onChange({
                      startDate: props.dateRange.startDate
                        .clone()
                        .add(1, 'month')
                        .startOf('month'),
                      endDate: props.dateRange.endDate
                        .clone()
                        .add(1, 'month')
                        .endOf('month'),
                      rangeType: currentRangeType,
                    }) :
                    currentRangeType === 'quarter_years' ?
                      props.onChange({
                        startDate: props.dateRange.startDate
                          .clone()
                          .add(3, 'month')
                          .startOf('month'),
                        endDate: props.dateRange.endDate
                          .clone()
                          .add(3, 'month')
                          .endOf('month'),
                        rangeType: currentRangeType,
                      }) :
                      currentRangeType === 'years' ?
                        props.onChange({
                          startDate: props.dateRange.startDate
                            .clone()
                            .add(1, 'year')
                            .startOf('year'),
                          endDate: props.dateRange.endDate
                            .clone()
                            .add(1, 'year')
                            .endOf('year'),
                          rangeType: currentRangeType,
                        }) :
                        ' '
            }
            disabled={currentRangeType === 'customRange'}
          >
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
        <IconButton onClick={handleClick} aria-haspopup="true">
          <FilterList />
        </IconButton>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.rangeTypes.includes('days') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'days') {
                props.onChange({
                  startDate: moment().startOf('D'),
                  endDate: moment().endOf('D'),
                  rangeType: 'days',
                });
              }
              setCurrentRangeType('days');
            }}
          >
            <TodayOutlined sx={{ mr: 0.5 }} />
            Day
          </MenuItem>
        )}
        {props.rangeTypes.includes('weeks') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'weeks') {
                // reset to current week
                props.onChange({
                  startDate: moment().startOf('week'),
                  endDate: moment().endOf('week'),
                  rangeType: 'weeks',
                });
              }
              setCurrentRangeType('weeks');
            }}
          >
            <CalendarTodayTwoTone sx={{ mr: 0.5 }} />
            Week
          </MenuItem>
        )}
        {props.rangeTypes.includes('months') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'months') {
                // reset to current month
                props.onChange({
                  startDate: moment().startOf('month'),
                  endDate: moment().endOf('month'),
                  rangeType: 'months',
                });
              }
              setCurrentRangeType('months');
            }}
          >
            <DateRangeOutlined sx={{ mr: 0.5 }} />
            Month
          </MenuItem>
        )}
        {props.rangeTypes.includes('quarter_years') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'quarter_years') {
                // reset to current Quater
                props.onChange({
                  startDate: moment().startOf('quarter'),
                  endDate: moment().endOf('quarter'),
                  rangeType: 'quarter_years',
                });
              }
              setCurrentRangeType('quarter_years');
            }}
          >
            <CalendarMonthOutlined sx={{ mr: 0.5 }} />
            Quarter
          </MenuItem>
        )}
        {props.rangeTypes.includes('years') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'years') {
                // reset to current month
                props.onChange({
                  startDate: moment().startOf('year'),
                  endDate: moment().endOf('year'),
                  rangeType: 'years',
                });
              }
              setCurrentRangeType('years');
            }}
          >
            <CalendarMonthOutlined sx={{ mr: 0.5 }} /> Year
          </MenuItem>
        )}
        {props.rangeTypes.includes('customDay') ||
          (props.rangeTypes.includes('customRange') && <Divider />)}
        {props.rangeTypes.includes('customDay') && (
          <MenuItem
            onClick={() => {
              handleClose();
              if (currentRangeType !== 'customDay') {
                // reset to current Day
                props.onChange({
                  startDate: props.dateRange.startDate.startOf('D'),
                  endDate: props.dateRange.startDate.endOf('D'),
                  rangeType: 'customDay',
                });
                setTmpDateRange({
                  startDate: props.dateRange.startDate.startOf('D'),
                  endDate: props.dateRange.startDate.endOf('D'),
                });
              }
              setCurrentRangeType('customDay');
              toggleOpen(true);
            }}
          >
            Custom Day
          </MenuItem>
        )}
        {props.rangeTypes.includes('customRange') && (
          <MenuItem
            onClick={() => {
              handleClose();
              // if (currentRangeType !== "customRange") {
              //   // reset to current month
              //   props.onChange({
              //     startDate: moment().startOf("month"),
              //     endDate: moment().endOf("month"),
              //   });
              // }
              setCurrentRangeType('customRange');
              toggleOpen(true);
              setTmpDateRange({
                startDate: props.dateRange.startDate.startOf('D'),
                endDate: props.dateRange.endDate.endOf('D'),
              });
            }}
          >
            Custom Range
          </MenuItem>
        )}
      </Menu>
      {/* Custom Range Entry Dialog */}
      <Dialog open={open}>
        <DialogTitle>
          {currentRangeType == 'customRange' ? 'Custom Range' : 'Custom Day'}
        </DialogTitle>
        <DialogContent>
          <br />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          <DatePicker
            label={currentRangeType == 'customRange' ? 'Start date' : 'Date'}
            format="DD/MM/YYYY"
            value={tmpDateRange?.startDate}
            onChange={(newValue) => {
              newValue ?
                currentRangeType === 'customRange' ?
                  setTmpDateRange({
                    ...props.dateRange,
                    startDate: moment(newValue).startOf('D'),
                    rangeType: 'customRange',
                  }) :
                  setTmpDateRange({
                    startDate: moment(newValue).clone().startOf('D'),
                    endDate: moment(newValue).clone().endOf('D'),
                    rangeType: 'customDay',
                  }) :
                '';
            }}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
          {/* </LocalizationProvider> */}
          &nbsp;
          {currentRangeType == 'customRange' && (
            // <LocalizationProvider dateAdapter={}>
            <DatePicker
              label="End date"
              format="DD/MM/YYYY"
              value={tmpDateRange?.endDate}
              onChange={(newValue) => {
                newValue ?
                  setTmpDateRange({
                    ...props.dateRange,
                    endDate: moment(newValue).endOf('D'),
                    rangeType: 'customRange',
                  }) :
                  '';
              }}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
            // </LocalizationProvider>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              toggleOpen(false);
              props.onChange({
                startDate: tmpDateRange?.startDate ?? props.dateRange.startDate,
                endDate: tmpDateRange?.endDate ?? props.dateRange.endDate,
                rangeType: tmpDateRange?.rangeType ?? props.dateRange.rangeType,
              });
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MomentFilter;
