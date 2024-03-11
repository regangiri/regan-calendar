'use client';

import Image from 'next/image';
import Calendar from './calendar';

export default function Home() {
  const handleSelectDateRange = (startDate: Date, endDate: Date): void => {
    console.log(`Selected date range: ${startDate} - ${endDate}`);
  };
  return (
    <div>
      <Calendar
        year={2024}
        month={2}
        onSelectDateRange={handleSelectDateRange}
      />
    </div>
  );
}
