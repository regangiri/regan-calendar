import React, { useState } from 'react';

type CalendarProps = {
  year: number;
  month: number;
  onSelectDateRange: (startDate: Date, endDate: Date) => void;
};

const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  onSelectDateRange,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date(year, month, 1));

  const days = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = currentDate.getDay();

  const handleDateClick = (day: number): void => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    } else {
      if (clickedDate >= selectedStartDate) {
        setSelectedEndDate(clickedDate);
        onSelectDateRange(selectedStartDate, clickedDate);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(clickedDate);
        onSelectDateRange(clickedDate, selectedStartDate);
      }
    }
  };

  const handlePrevMonth = (): void => {
    setCurrentDate((prevDate) => {
      const prevMonth =
        prevDate.getMonth() === 0 ? 11 : prevDate.getMonth() - 1;
      const prevYear =
        prevDate.getMonth() === 0
          ? prevDate.getFullYear() - 1
          : prevDate.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  const handleNextMonth = (): void => {
    setCurrentDate((prevDate) => {
      const nextMonth =
        prevDate.getMonth() === 11 ? 0 : prevDate.getMonth() + 1;
      const nextYear =
        prevDate.getMonth() === 11
          ? prevDate.getFullYear() + 1
          : prevDate.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  const renderDays = (): JSX.Element[] => {
    const dayCells: JSX.Element[] = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Render day names row
    const dayNameRow = dayNames.map((dayName, index) => (
      <div
        key={dayName}
        className={`day ${index === 0 ? 'empty' : ''} day-name`}
      >
        {dayName}
      </div>
    ));
    dayCells.push(...dayNameRow);

    // Render empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayCells.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Render days
    for (let i = 1; i <= days; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isInRange =
        selectedStartDate &&
        selectedEndDate &&
        date >= selectedStartDate &&
        date <= selectedEndDate;
      const isSelected =
        isInRange ||
        (!selectedEndDate &&
          selectedStartDate &&
          date.getTime() === selectedStartDate.getTime());

      dayCells.push(
        <div
          key={i}
          className={`flex items-center justify-center py-1  rounded-full  ${
            isSelected ? 'bg-[#003366] text-white' : ''
          }`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return dayCells;
  };

  return (
    <div className="calendar flex justify-center items-center w-full flex-col">
      <div className="calendar-header flex items-center justify-center gap-6">
        <button
          className="py-1 px-2 bg-slate-600 text-white font-bold rounded-md my-6"
          onClick={handlePrevMonth}
        >
          {'<'}
        </button>
        <h3>{`${currentDate.getFullYear()} - ${currentDate.toLocaleString(
          'default',
          { month: 'long' }
        )}`}</h3>
        <button
          className="py-1 px-2 bg-slate-600 text-white font-bold rounded-md my-6"
          onClick={handleNextMonth}
        >
          {'>'}
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-y-2 gap-x-36">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
