// 훅에서는 달력의 상태 관리와 API로부터의 데이터를 가져오는 로직을 담당

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

export const useCalendar = () => {
  const { token } = useAuth();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dosageData, setDosageData] = useState<DosageData[]>([]);
  const [dates, setDates] = useState<
    Array<{ day: number; month: number; year: number }>
  >([]);
  const [selectedDayData, setSelectedDayData] = useState<DosageRecord[]>([]);

  // 전체 복용 데이터 가져오기
  const fetchAllDosageData = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://www.everycare.site/api/v1/medicines/records/list',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      const rawData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      const groupedData: DosageData[] = [];

      rawData.forEach((record) => {
        const startDate = new Date(record.intakeStart);
        const endDate = new Date(record.intakeEnd);

        // 시간을 00:00:00으로 설정하여 날짜만 비교
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        for (
          let currentDate = new Date(startDate);
          currentDate <= endDate;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          const formattedDate = currentDate.toISOString().split('T')[0];
          let dateData = groupedData.find(
            (data) => data.date === formattedDate,
          );

          if (!dateData) {
            dateData = { date: formattedDate, records: [] };
            groupedData.push(dateData);
          }

          // 달력에 사용할 데이터 설정
          dateData.records.push({
            drugNames: record.drugNames, // 복용 약물 이름 포함
            intakeDaily: record.intakeDaily, // 일일 복용량 포함
            intakeStart: record.intakeStart,
            intakeEnd: record.intakeEnd,
          });
        }
      });

      setDosageData(groupedData);
      return groupedData;
    } catch (error) {
      console.error('Failed to fetch dosage data:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchAllDosageData(); // 컴포넌트가 마운트될 때 전체 데이터를 가져옴
  }, [fetchAllDosageData]);

  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDates = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      month: month,
      year: year,
    }));
    setDates(newDates);
  }, [year, month]);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // 날짜 선택시 해당 날짜의 데이터 필터링 및 표시
    const selectedDateData = dosageData.find(
      (data) => data.date === formattedDate,
    );
    if (selectedDateData) {
      setSelectedDayData(selectedDateData.records);
      console.log('Selected Date Data:', selectedDateData.records);
    } else {
      setSelectedDayData([]);
    }
  };

  const handleModalConfirm = (
    selectedYear: number,
    selectedMonth: number,
    selectedDay: number,
  ) => {
    setYear(selectedYear);
    setMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY < 0) {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      setYear((prev) => (prev === 0 ? prev - 1 : prev));
    } else {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      setYear((prev) => (prev === 11 ? prev + 1 : prev));
    }
  };

  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDates = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      month: month,
      year: year,
    }));
    setDates(newDates);
  }, [year, month]);

  const initializeCalendar = () => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
    setSelectedDay(currentDate.getDate());
    setShowModal(false);
  };

  return {
    year,
    month,
    selectedDay,
    showModal,
    setShowModal,
    handleModalConfirm,
    handleModalCancel,
    handleDayClick,
    dosageData,
    dates,
    handleScroll,
    initializeCalendar,
    setDosageData,
  };
};
