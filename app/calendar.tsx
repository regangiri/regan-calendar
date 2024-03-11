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
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayCells.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
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
      const classNames = `day ${isSelected ? 'selected' : ''} ${
        isInRange ? 'in-range' : ''
      }`;
      dayCells.push(
        <div key={i} className={classNames} onClick={() => handleDateClick(i)}>
          {i}
        </div>
      );
    }
    return dayCells;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>{'<'}</button>
        <h3>{`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`}</h3>
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
