import { useState, useEffect } from "react";

interface Props {
  onDateChange: (date: Date) => void;
}

const Calendar = ({ onDateChange }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [minSelectableDate, setMinSelectableDate] = useState<Date | null>(null);

  useEffect(() => {
    // Calculate current date + 5 days as the minimum selectable date
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 5);

    // Set the minimum selectable date
    setMinSelectableDate(minDate);

    // Set the default selected date to the minimum selectable date + 1 day
    const defaultSelectedDate = new Date(minDate);
    defaultSelectedDate.setDate(minDate.getDate() + 1);
    setSelectedDate(defaultSelectedDate);

    // set on Parent too
    onDateChange(defaultSelectedDate);

    // If the current month doesn't show the selectable dates well, jump to that month
    if (minDate.getMonth() !== today.getMonth() || minDate.getDate() > 25) {
      // If minimum date is near the end of the month
      setCurrentMonth(new Date(minDate));
    }
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (!minSelectableDate) return true;

    // Disable all dates before or equal to minSelectableDate
    return date.getTime() <= minSelectableDate.getTime();
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderDays = () => {
    const days = getDaysInMonth(currentMonth);

    return days.map((day, index) => {
      if (!day) {
        return <div key={`empty-${index}`} className="w-10 h-10"></div>;
      }

      const isDisabled = isDateDisabled(day);
      const isSelected =
        selectedDate && day.toDateString() === selectedDate.toDateString();
      const isToday = new Date().toDateString() === day.toDateString();

      return (
        <button
          key={day.toString()}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`size-12 rounded-full flex items-center justify-center text-md font-medium
            ${isSelected ? "bg-primary text-white text-bold" : ""}
            ${
              isDisabled
                ? "bg-dark-grey-shade text-dark-grey-tint cursor-not-allowed"
                : "hover:bg-light-grey"
            }
            ${isToday && !isSelected ? "border-1 border-dark-grey-tint" : ""}
            ${
              !isSelected && !isDisabled
                ? "text-neutral-white bg-dark-grey-tint"
                : ""
            }
          `}
        >
          {day.getDate()}
        </button>
      );
    });
  };

  const isCurrentMonthHavingSelectableDates = () => {
    if (!minSelectableDate) return true;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Check if the last day of current month is after minSelectableDate
    return lastDayOfMonth.getTime() > minSelectableDate.getTime();
  };

  return (
    <div className="w-140 border-1 border-gray-600 rounded-md shadow-lg bg-dark-primary p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-light-grey">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            disabled={!isCurrentMonthHavingSelectableDates()}
            className={`p-2 rounded-full ${
              !isCurrentMonthHavingSelectableDates()
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-dark-grey"
            }`}
          >
            &lt;
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-dark-grey"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-2">
        {["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="w-10 h-6 flex items-center justify-center text-lg text-light-grey"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">{renderDays()}</div>

      <div className="mt-4 text-md text-gray-600">
        Selected: {selectedDate ? formatDate(selectedDate) : "None"}
      </div>

      <div className="mt-2 text-md text-grey">
        Note: Dates before{" "}
        {minSelectableDate ? formatDate(minSelectableDate) : "loading..."} are
        not available
      </div>
    </div>
  );
};

export default Calendar;
