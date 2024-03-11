'use client';

import Calendar from './calendar';
import dayjs from 'dayjs';
export default function Home() {
  const handleSelectDateRange = (startDate: Date, endDate: Date): void => {
    console.log(
      `Selected date range: ${dayjs(startDate).format('MM/DD/YYYY')} - ${dayjs(
        endDate
      ).format('MM/DD/YYYY')}`
    );
  };
  return (
    <div>
      <Calendar
        year={dayjs().year()}
        month={dayjs().month()}
        onSelectDateRange={handleSelectDateRange}
      />
    </div>
  );
}
