import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import CalendarTable from './CalendarTable';
import CalendarInfo from './CalendarInfo';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarLogo from '../../assets/Calendar/Calendar.svg';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CalendarStyle: React.CSSProperties = {
  borderRadius: '15px',
  backgroundColor: '',
  padding: '16px',
  overflowY: 'auto',
};

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

const Calendar: React.FC = () => {
  const { token } = useAuth();
  const {
    year,
    month,
    selectedDay,
    showModal,
    setShowModal,
    handleModalConfirm,
    handleModalCancel,
    handleDayClick,
    dates,
    handleScroll,
  } = useCalendar();

  const [dosageData, setDosageData] = useState<DosageData[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    handleScroll(event);
  };

  // API 요청 시 토큰 포함
  const fetchAllDosageData = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/medicines/records/list',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // AuthContext로부터 가져온 토큰 포함
          },
          withCredentials: true, // credentials: 'include'와 동일하게 쿠키를 포함
        },
      );

      console.log('Response:', response);
      console.log('Response Headers:', response.headers);

      // 서버 응답 헤더에서 Access-Control-Allow-Credentials 확인
      if (response.headers['access-control-allow-credentials'] === 'true') {
        console.log('Server accepts credentials (cookies).');
      } else {
        console.log('Server does not accept credentials.');
      }
      const rawData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      //날짜별로 그룹화된 데이터로 변환
      const groupedData: DosageData[] = [];

      rawData.forEach((record) => {
        const startDate = new Date(record.intakeStart);
        const endDate = new Date(record.intakeEnd);
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const formattedDate = currentDate.toISOString().split('T')[0];

          // 해당 날짜의 데이터가 이미 있는지 확인
          let dateData = groupedData.find(
            (data) => data.date === formattedDate,
          );

          if (!dateData) {
            dateData = { date: formattedDate, records: [] };
            groupedData.push(dateData);
          }

          // 해당 날짜에 기록 추가
          dateData.records.push({
            drugNames: record.drugNames,
            intakeDaily: record.intakeDaily,
            intakeStart: record.intakeStart,
            intakeEnd: record.intakeEnd,
          });

          // 다음 날짜로 이동
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setDosageData(groupedData);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchAllDosageData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [fetchAllDosageData]);

  const handleDelete = (
    drugNames: string[],
    intakeStart: string,
    intakeEnd: string,
  ) => {
    setDosageData((prevDosageData) =>
      prevDosageData.map((data) => ({
        ...data,
        records: data.records.filter(
          (record) =>
            !(
              record.drugNames.join(',') === drugNames.join(',') &&
              record.intakeStart === intakeStart &&
              record.intakeEnd === intakeEnd
            ),
        ),
      })),
    );
    console.log(`항목 ${drugNames.join(', ')} 삭제됨`);
  };

  const fetchDosageData = useCallback(
    async (date: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/medicines/records/list`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`, // AuthContext로부터 가져온 토큰 포함
            },
            withCredentials: true,
          },
        );
        console.log('서버 응답 데이터:', response.data);

        const rawData = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        // 날짜별로 그룹화된 데이터로 변환
        const groupedData: DosageData[] = [];

        rawData.forEach((record) => {
          const startDate = new Date(record.intakeStart);
          const endDate = new Date(record.intakeEnd);
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];

            // 해당 날짜의 데이터가 이미 있는지 확인
            let dateData = groupedData.find(
              (data) => data.date === formattedDate,
            );

            if (!dateData) {
              dateData = { date: formattedDate, records: [] };
              groupedData.push(dateData);
            }

            // 해당 날짜에 기록 추가
            dateData.records.push({
              drugNames: record.drugNames,
              intakeDaily: record.intakeDaily || '',
              intakeStart: record.intakeStart,
              intakeEnd: record.intakeEnd,
            });

            // 다음 날짜로 이동
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        return groupedData;
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    },
    [token],
  );

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜를 포맷팅
    fetchDosageData(formattedDate).then((groupedData) => {
      setDosageData(groupedData);
      console.log('Dosage data:', groupedData); // 데이터가 올바르게 받아졌는지 확인
    });
  }, [fetchDosageData]);

  // 다른 날짜를 선택할 때도 데이터를 불러오는 useEffect 추가
  useEffect(() => {
    if (selectedDay) {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
      fetchDosageData(formattedDate).then((groupedData) => {
        setDosageData(groupedData);
        console.log('Updated dosage data for selected day:', groupedData);
      });
    }
  }, [selectedDay, year, month, fetchDosageData]);

  return (
    <div
      className="calendar-container"
      style={CalendarStyle}
      onWheel={handleWheel}
      ref={calendarRef}
    >
      <div className="top-bar flex items-center"></div>
      <div className="month-display flex items-center bg-white">
        <div className="Calendar">
          <img
            src={CalendarLogo}
            alt="Calendar"
            className="mr-2 cursor-pointer"
            onClick={() => setShowModal(true)}
          />
          <div className="mb-2" />
        </div>
        <span
          className="current-month font-bold"
          style={{ fontSize: '1.3rem' }}
        >
          {`${year}년 ${month + 1}월`}
          <div className="mb-2" />
        </span>
        {showModal && (
          <Modal onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
        )}
      </div>
      <CalendarTable
        month={month}
        year={year}
        selectedDay={selectedDay}
        dates={dates}
        handleDayClick={handleDayClick}
        dosageData={dosageData}
      />
      <CalendarInfo
        selectedYear={year}
        month={month}
        selectedDay={selectedDay}
        dosageData={dosageData}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Calendar;
