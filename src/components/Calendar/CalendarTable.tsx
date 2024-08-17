import React from 'react';
import { chunkArray } from '../../utils/helpers';
import pillImage from '../../assets/Calendar/CalendarPill.svg'; // 알약 이미지

interface DosageRecord {
  drugNames: string[];
  intakeDaily: string;
  intakeStart: string;
  intakeEnd: string;
}

interface DosageData {
  date: string;
  records: DosageRecord[];
}

interface CalendarTableProps {
  month: number;
  year: number;
  selectedDay: number;
  dates: Array<{ day: number; month: number; year: number }>;
  handleDayClick: (day: number) => void;
  dosageData: DosageData[];
}

const CalendarTable: React.FC<CalendarTableProps> = ({
  month,
  year,
  selectedDay,
  dates,
  handleDayClick,
  dosageData,
}) => {
  // 특정 날짜의 복용한 약물 개수를 계산하는 함수
  const IntakePeriod = (
    date: { day: number; month: number; year: number },
    dosageData: DosageData[],
  ) => {
    const formattedDate = new Date(date.year, date.month - 1, date.day)
      .toISOString()
      .split('T')[0];

    // 해당 날짜의 복용 기록을 가져옴
    const records =
      dosageData.find((data) => data.date === formattedDate)?.records || [];

    // 각 기록에서 약물의 수를 계산함
    const totalPills = records.reduce(
      (sum, record) => sum + record.drugNames.length,
      0,
    );

    // 약물 개수 표시
    if (totalPills > 0) {
      return (
        <div className="flex items-center">
          <img src={pillImage} alt="Pill" className="w-[60%] h-[1.5vh] mt-1" />
          <span className="ml-1 mt-1.5">{totalPills}</span>
        </div>
      );
    } else return null;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDayOfMonth = getFirstDayOfMonth(year, month + 1);

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    month: month + 1,
    year: year,
  }));

  const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, () => ({
    day: 0,
    month: month,
    year: year,
  }));

  const datesWithEmptyDays = [...leadingEmptyDays, ...calendarDays];

  return (
    <table className="calendar-table w-full mt-2">
      <thead>
        <tr className="bg-white">
          <th className="p-3">일</th>
          <th className="p-3">월</th>
          <th className="p-3">화</th>
          <th className="p-3">수</th>
          <th className="p-3">목</th>
          <th className="p-3">금</th>
          <th className="p-3">토</th>
        </tr>
      </thead>
      <tbody>
        {chunkArray(datesWithEmptyDays, 7).map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {weekIndex >= 0 && (
              <tr className="border-[1px] border-gray-300"></tr>
            )}
            <tr>
              {week.map((date, dayIndex) => {
                if (!date.day) {
                  return (
                    <td key={dayIndex} className="w-20 h-[8vh] bg-white"></td>
                  );
                }

                const pillsPeriod = IntakePeriod(date, dosageData);

                return (
                  <td
                    key={dayIndex}
                    className={`w-20 h-[8vh] ${date.month !== month + 1 ? 'text-gray-400' : ''} 
                    ${date.month === month + 1 && dayIndex === 0 ? 'text-red-500' : ''} 
                    ${date.month === month + 1 && dayIndex === 6 ? 'text-blue-500' : ''}`}
                    onClick={() => handleDayClick(date.day)}
                  >
                    <div className="flex flex-col items-center pt-[0.4vh] w-full h-full">
                      <span
                        className={`flex justify-center items-center p-[0.3vh] ${date.month === month && date.day === selectedDay ? 'bg-blue-200 text-black rounded-full' : ''}`}
                      >
                        {date.day}
                      </span>
                      <div
                        className={`h-[0.3vh] w-full ${pillsPeriod ? 'bg-blue-300' : 'bg-white'} mt-[1vh] mb-[0.3vh]`}
                      ></div>
                      {pillsPeriod}
                    </div>
                  </td>
                );
              })}
            </tr>
            {weekIndex === chunkArray(dates, 7).length - 1 && (
              <tr className="border-[1px] border-gray-300"></tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarTable;
