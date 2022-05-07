import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import Icon from '@mui/material/Icon';
import '@assets/styles/Calendar.css';

interface Props {
  label?: string;
  showIcon?: boolean;
  value?: Array<any>;
  classes?: string;
  direction?: string;
  maxDate?: string;
  onChangeCalendar?: (event: any) => void;
}
const DatePicker = (props: Props) => {
  const {
    value,
    onChangeCalendar,
    direction,
    classes,
    label,
    showIcon,
    maxDate,
  } = props;

  const element = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [shuffleId] = useState(Math.random().toString());
  const [fromDate, setFromDate] = useState<string>(moment(value?.[0]).format('DD-MM-YYYY'));
  const [toDate, setToDate] = useState<string>(moment(value?.[1]).format('DD-MM-YYYY'));
  const [defaultValue, setDefaultvalue] = useState<Array<any>>();
  const defaultDirection = {
    bottom: 'origin-top-right mt-2 right-0',
    top: 'origin-bottom-right mb-12 bottom-0',
    left: 'origin-bottom-right mr-28 bottom-0 top-0 right-0',
    right: 'origin-bottom-right ml-28 bottom-0 top-0 left-0',
  };

  useEffect(() => {
    if (value?.[0] === '' && value?.[1] === '') {
      setFromDate('');
      setToDate('');
    } else {
      setDefaultvalue(value);
      setFromDate(moment(value?.[0]).format('DD-MM-YYYY'));
      setToDate(moment(value?.[1]).format('DD-MM-YYYY'));
    }
  }, [value]);

  const calendarHandler = (e) => {
    setFromDate(moment(value?.[0]).format('DD-MM-YYYY'));
    setToDate(moment(value?.[1]).format('DD-MM-YYYY'));
    setDefaultvalue(e);
  };

  return (
    <div className="relative inline-block m-1">
      <button
        title={`${fromDate} - ${toDate}`}
        type="button"
        onClick={() => setOpen(!open)}
        ref={element}
        id={`${shuffleId}`}
        className={classes}
      >
        {fromDate === '' || toDate === '' ? (
          <span>{label}</span>
        ) : (
          <span>{`${fromDate} - ${toDate}`}</span>
        )}
        {showIcon && (
          <i className="right-0 bg-white flex align-items-center my-auto mx-1 text-mainColor"><Icon>calendar_month_icon</Icon></i>
        )}
      </button>
      <div
        className={`
          ${defaultDirection[`${direction}`]}
          absolute w-80 rounded-md z-10
          ring-opacity-5 focus:outline-none menu-option
          shadow-lg bg-white ring-1 ring-black
          ${!open && 'hidden'}
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="flex-col w-full menu-option p-1" role="none">
          <div className="text-center text-darker font-bold my-2">
            <span>Atur Tanggal</span>
          </div>
          <div className="p-2">
            <Calendar
              prev2Label={null}
              next2Label={null}
              className="menu-option border-0"
              tileClassName="menu-option text-sm"
              value={defaultValue}
              selectRange
              maxDate={new Date(maxDate || moment().format('YYYY, MM, DD'))}
              onChange={(e) => calendarHandler(e)}
              showDoubleView={false}
            />
          </div>
          <button
            className="block font-bold w-full p-2 mt-2 rounded-md bg-mainColor text-white text-center"
            type="button"
            onClick={() => {
              if (onChangeCalendar) {
                onChangeCalendar(defaultValue);
                setOpen(false);
              }
            }}
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
};

DatePicker.defaultProps = {
  value: [new Date(moment().format('YYYY, MM, DD')), new Date(moment().add(7, 'days').format('YYYY, MM, DD'))],
  onChangeCalendar: () => { },
  maxDate: '',
  direction: 'bottom',
  label: 'Pilih Tanggal',
  showIcon: true,
  classes: `relative w-full h-fit flex items-center
  focus:outline-none menu-option
  inline-flex justify-center
  rounded-md border border-mainColor
  shadow-sm p-2 bg-white text-sm
  font-thin text-gray-700 hover:bg-gray-50
  whitespace-nowrap overflow-hidden`,
};

export default DatePicker;
