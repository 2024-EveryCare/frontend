import React, { useEffect, useState } from 'react';
import Morning from '../../assets/Calendar/Morning.svg';
import Lunch from '../../assets/Calendar/Lunch.svg';
import Night from '../../assets/Calendar/Night.svg';
import axios from 'axios';

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

interface CalendarInfoProps {
  selectedYear: number;
  month: number;
  selectedDay: number;
  dosageData: DosageData[];
  setDosageData: React.Dispatch<React.SetStateAction<DosageData[]>>;
}

const CalendarInfo: React.FC<CalendarInfoProps> = ({
  selectedYear,
  month,
  selectedDay,
  dosageData,
  setDosageData,
}) => {
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);
  const [filteredDosage, setFilteredDosage] = useState<DosageRecord[]>([]);

  useEffect(() => {
    const selectedDate = new Date(selectedYear, month, selectedDay)
      .toISOString()
      .split('T')[0];

    const filtered: DosageRecord[] = dosageData
      .filter((data) => data.date === selectedDate)
      .flatMap((data) => data.records);

    setFilteredDosage(filtered);
  }, [selectedYear, month, selectedDay, dosageData]);

  // 삭제 요청
  const deleteData = async (
    drugName: string,
    intakeStart: string,
    intakeEnd: string,
  ) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:8080/api/v1/medicines/records`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,

        data: {
          drugName,
          intakeStart,
          intakeEnd,
        },
      });
      // 삭제 후 UI 업데이트(필요시)
      setFilteredDosage(
        (prevDosage) =>
          prevDosage
            .map((record) => {
              // 선택한 알약 정보만 제거
              const updatedDrugNames = record.drugNames.filter(
                (name) => name !== drugName,
              );

              // 남은 알약이 있는 경우만 상태에 유지
              if (updatedDrugNames.length > 0) {
                return { ...record, drugNames: updatedDrugNames };
              }
              return null; // 알약이 없으면 기록에서 제거
            })
            .filter(Boolean), // null 값을 제거
      );

      // 달력 데이터에서 삭제된 알약 반영
      setDosageData((prevDosageData) =>
        prevDosageData
          .map((data) => {
            const updatedRecords = data.records
              .map((record) => {
                const updatedDrugNames = record.drugNames.filter(
                  (name) => name !== drugName,
                );
                if (updatedDrugNames.length > 0) {
                  return { ...record, drugNames: updatedDrugNames };
                }
                return null;
              })
              .filter(Boolean);

            return { ...data, records: updatedRecords };
          })
          .filter((data) => data.records.length > 0),
      );
    } catch (error) {
      console.log('삭제 에러:', error.response || error.message);
    }
  };

  const clickedBtn = () => {
    setDeleteBtn(!deleteBtn);
  };

  return (
    <div className="dosage-info mt-5">
      {selectedDay && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ paddingLeft: '8px' }}>
            {`${month + 1}월 ${selectedDay}일 복용 내역`}
          </h3>
          <span className="flex items-center" onClick={clickedBtn}>
            삭제
          </span>
        </div>
      )}
      {filteredDosage.length > 0 ? (
        <div
          className="h-[33vh] overflow-x-auto mt-2"
          style={{ paddingLeft: '8px' }}
        >
          {filteredDosage.flatMap((item, recordIndex) =>
            item.drugNames.map((drugName, drugIndex) => (
              <div
                key={`${recordIndex}-${drugIndex}`}
                className="empty-dosage-info h-10 bg-gray-100 flex items-center text-black rounded-lg mt-1"
              >
                <span className="text-xs" style={{ padding: '8px' }}>
                  {drugName}
                </span>
                <span className="text-xs ml-auto flex ">
                  {item.intakeDaily && item.intakeDaily.length >= 3 && (
                    <>
                      {item.intakeDaily[0] === '1' && (
                        <img
                          src={Morning}
                          alt="Morning"
                          className="w-6 h-6 mr-3"
                        />
                      )}
                      {item.intakeDaily[1] === '1' && (
                        <img src={Lunch} alt="Lunch" className="w-6 h-6 mr-3" />
                      )}
                      {item.intakeDaily[2] === '1' && (
                        <img src={Night} alt="Night" className="w-6 h-6 mr-3" />
                      )}
                    </>
                  )}
                </span>
                {deleteBtn && (
                  <button
                    onClick={() =>
                      deleteData(drugName, item.intakeStart, item.intakeEnd)
                    }
                    className="flex items-center"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  >
                    X
                  </button>
                )}
              </div>
            )),
          )}
        </div>
      ) : (
        <div
          className="ml-2 mt-2 empty-dosage-info h-10 bg-gray-100 flex items-center text-black text-xs rounded-lg"
          style={{ paddingLeft: '8px' }}
        >
          기록없음
        </div>
      )}
    </div>
  );
};

export default CalendarInfo;
