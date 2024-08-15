import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import RegisterSick from '../../assets/register/RegisterSick.svg';
import RegisterHos from '../../assets/register/RegisterHospital.svg';
import { useNavigate } from 'react-router-dom';
// import CustomHr from '../CustomHr';
import { RegisterContext } from '../../context/RegisterContext';
import DatePicker from 'react-datepicker';
import './CustomDatePicker.css';
import CalendarImg from '../../assets/calendar.png';
import SaveBtn from './button/SaveBtn';
import InputBtn from './button/InputBtn';
import { formatDate, intakeDailyCalculator } from '../../utils/date';
import { submitDrugData } from '../../service/submitDrugData';
import axios from 'axios';

const DirectRegister: React.FC = () => {
  const navigate = useNavigate(); //리다이렉트를 위한 useNavigate Hook
  const {
    //전역변수 context 불러오기
    OCRData,
    setOCRData,
    savedDrug, //약물의 name,code,pcode,company등의 정보를 담고있음.
    setSavedDrug,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    hospital,
    setHospital,
    disease,
    setDisease,
    intakeDaily,
    setIntakeDaily,
    intakeCycle,
    morning,
    setMorning,
    lunch,
    setLunch,
    night,
    setNight,
  } = useContext(RegisterContext);
  const [drugName, setDrugName] = useState<string[]>([]);

  const [selectedSick, setSelectedSick] = useState<boolean>(false); //질병버튼 상태
  const [sickConfirm, setSickConfirm] = useState<boolean>(false); //질병입력 후 확인. 상태

  const [selectedHos, setSelectedHos] = useState<boolean>(false); //병원버튼 상태
  const [hosConfirm, setHosConfirm] = useState<boolean>(false); //병원입력 후 확인. 상태

  const [clickedDateBtn, setClickedDateBtn] = useState<boolean>(false); //복용일 버튼 상태
  const [clickedDailyBtn, setClickedDailyBtn] = useState<boolean>(false); //아침, 점심, 저녁 복용횟수 상태

  const [saveBtn, setSaveBtn] = useState<boolean>(false); //저장하기 버튼을 누르고 랜더링이 한번 일어나야 값들이 정상 저장 되므로 저장버튼 상태관리를 위한 배열

  const onClickSick = () => {
    //질병버튼 핸들러
    setSelectedSick(true);
    setSickConfirm(false);
  };
  const onClickSickConfirm = () => {
    //질병확인버튼 핸들러
    const trimmedValue = disease.trim();
    if (trimmedValue === '') {
      console.log('아무것도 입력되지 않았습니다.');
      alert('질병명을 입력해주세요!');
      setDisease(trimmedValue);
    } else {
      setSickConfirm(true);
    }
  };
  const onClickDate = () => {
    //날짜 확인 버튼 핸들러
    if (clickedDateBtn) {
      setClickedDateBtn(false);
      return;
    } else setClickedDateBtn(true);
  };

  const onClickDaily = () => {
    //아침 점심 저녁 복용횟수 버튼 핸들러
    setClickedDailyBtn((pre) => !pre);
  };
  const onClickHos = () => {
    //병원입력 버튼 핸들러
    setSelectedHos(true);
    setHosConfirm(false);
  };
  const onClickHosConfirm = () => {
    //병원 이름 입력 후 확인 핸들러
    const trimmedValue = hospital.trim();
    if (trimmedValue === '') {
      console.log('아무것도 입력되지 않았습니다.');
      alert('처방 받으신 병원을 입력해주세요!');
      setHospital(trimmedValue);
    } else {
      setHosConfirm(true);
    }
  };
  const handleDailyBtn = (name: string) => {
    //아침 점심 저녁 버튼 클릭 핸들러
    if (name == 'morning') {
      setMorning((pre) => !pre);
    } else if (name == 'lunch') {
      setLunch((pre) => !pre);
    } else {
      setNight((pre) => !pre);
    }
    console.log('Daily 상태: ', morning, lunch, night);
  };

  useEffect(() => {
    console.log('복약 횟수 상태:', morning, lunch, night);
  }, [morning, lunch, night]);

  const handleSickInputChange = (
    //질병입력 박스 핸들러
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDisease(event.target.value);
    console.log(event.target.value);
  };

  const handleHosInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //질병입력 박스 핸들러
    setHospital(event.target.value);
    console.log(event.target.value);
  };

  const handleRedirect = (path) => {
    //리다이렉트
    console.log(path, 'redirecting ...');
    navigate(path);
  };

  const handleStartDate = (date: Date) => {
    //시작일 날짜선택 핸들러
    console.log(date);
    setStartDate(date);
  };
  const handleEndDate = (date: Date) => {
    //종료일 날짜선택 핸들러
    console.log(date);
    setEndDate(date);
  };

  const handleSubmitDrugData = async () => {
    const drugNames = savedDrug.map((drugData) => drugData.name);

    const calculatedIntakeDaily = await intakeDailyCalculator(
      morning,
      lunch,
      night,
    );
    setIntakeDaily(calculatedIntakeDaily);

    if (
      drugNames.length &&
      startDate &&
      endDate &&
      calculatedIntakeDaily &&
      hospital.trim() &&
      disease.trim()
    ) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      await submitDrugData(
        drugNames,
        formattedStartDate,
        formattedEndDate,
        0, // intakeCycle
        calculatedIntakeDaily,
        hospital.trim(),
        disease.trim(),
      );

      navigate('/calendar');
    } else {
      alert('필수 데이터가 누락되었습니다. 모든 필드를 입력했는지 확인하세요.');
    }
    setSaveBtn(false);
  };

  // const handleSubmitDrugData = async () => {
  //   const drugNames = savedDrug.map((drugData) => drugData.name);
  //   console.log('Updated drugNames:', drugNames);

  //   const calculatedIntakeDaily = await intakeDailyCalculator(
  //     morning,
  //     lunch,
  //     night,
  //   );
  //   setIntakeDaily(calculatedIntakeDaily);

  //   console.log('intakeDaily:', calculatedIntakeDaily);

  //   if (
  //     // drugNames.length &&
  //     // drugName.length &&
  //     startDate &&
  //     endDate &&
  //     calculatedIntakeDaily &&
  //     hospital.trim() &&
  //     disease.trim()
  //   ) {
  //     const formattedStartDate = formatDate(startDate);
  //     const formattedEndDate = formatDate(endDate);

  //     const requestData = {
  //       drugNames: drugNames,
  //       hospital: hospital.trim(),
  //       disease: disease.trim(),
  //       intakeStart: formattedStartDate,
  //       intakeEnd: formattedEndDate,
  //       intakeDaily: calculatedIntakeDaily,
  //       intakeCycle: 0,
  //     };

  //     console.log('요청 데이터:', requestData);

  //     try {
  //       const response = await axios.post(
  //         'http://localhost:8080/api/v1/medicines/direct-records',
  //         requestData,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Accept: 'application/json',
  //           },
  //         },
  //       );
  //       console.log('서버 응답:', response.data);
  //       navigate('/calendar');
  //     } catch (error) {
  //       if (axios.isAxiosError(error) && error.response) {
  //         console.error('서버 응답 오류 데이터:', error.response.data);
  //         console.error('서버 응답 상태:', error.response.status);
  //         console.error('서버 응답 헤더:', error.response.headers);
  //       } else {
  //         console.error('요청 실패:', error);
  //       }
  //     }
  //   } else {
  //     console.error('필수 데이터가 누락되었습니다.');
  //     alert('필수 데이터가 누락되었습니다. 모든 필드를 입력했는지 확인하세요.');
  //   }
  //   setSaveBtn(false);
  // };

  // useEffect(() => {
  //   if (saveBtn) {
  //     submitDrugData(
  //       drugName,
  //       startDate,
  //       endDate,
  //       intakeCycle,
  //       intakeDaily,
  //       hospital,
  //       disease,
  //     );
  //   }
  // }, [saveBtn]);

  useEffect(() => {
    //OCR인식결과가 들어올 시 useEffect로 랜더링 후 화면 출력
    console.log(OCRData);
  }, [OCRData]);

  useEffect(() => {
    //저장버튼 클릭시 서버로 데이터 전송,
    //따로 뺀 이유는 같이 넣으면 랜더링 주기가 안맞아서 최신화 된 값이 안나오므로 handleSubmitDrugData에서 await을 걸어 준 후
    //값이 나오면 saveBtn상태 바뀌면서 전송하도록
    if (saveBtn) {
      console.log('asdasd22');
      console.log(
        '따라라라',
        drugName,
        startDate,
        endDate,
        intakeCycle,
        intakeDaily,
        hospital,
        disease,
      );
      submitDrugData(
        drugName,
        startDate,
        endDate,
        intakeCycle,
        intakeDaily,
        hospital,
        disease,
      );
    }
  }, [saveBtn]);

  return (
    <div className="h-[86vh] w-100% items-center overflow-auto">
      <div className="h-[22vh] w-[100%]">
        <div className="flex flex-col h-[30%] mt-[12%]">
          <p className="text-3xl font-black mb-[2%] ml-[5%]">약</p>
          <p className="text-base text-gray-500 ml-[5%]">
            복용하실 약을 입력해주세요.
          </p>
          <div className="flex justify-center space-x-7 mt-[5vh]">
            <InputBtn
              className="w-[38%] h-[37px] hover:bg-blue-200 hover:text-white"
              onClick={() => handleRedirect('/pill-search')}
            >
              약 입력
            </InputBtn>
            <InputBtn
              className="w-[38%] h-[37px] hover:bg-blue-200 hover:text-white"
              onClick={() => handleRedirect('/pill-register')}
            >
              입력 확인
            </InputBtn>
          </div>
        </div>
      </div>
      <hr className="border-1 border-gray-300 m-auto w-[85%]" />
      <div className="w-[100%] h-[22vh]">
        <div className="flex flex-col h-[30%] mt-[12%]">
          {!selectedHos && !hospital.length ? (
            <>
              <p className="text-3xl w-[50%] font-black mb-[2%] ml-[5%]">
                병원
              </p>
              <p className="text-base text-gray-500 ml-[5%]">
                처방 받으신 병원을 입력해주세요.
              </p>
              <div className="flex justify-center w-full mt-[5vh]">
                <InputBtn
                  className="w-[50%] h-[37px] hover:bg-blue-200 hover:text-white"
                  onClick={onClickHos}
                >
                  병원 입력
                </InputBtn>
              </div>
            </>
          ) : (
            <div className="m-[3vh] flex items-center space-x-4">
              <img
                src={RegisterHos}
                alt="hopital"
                className="w-[41px] h-[34px]"
              />
              {hosConfirm ? (
                <div className="relative w-[90%]">
                  <p className="inline-block w-[70%] h-[40px] text-2xl text-gray-700 font-bold">
                    {hospital}
                  </p>
                  <button
                    name="sickConfirm"
                    onClick={onClickHos}
                    className="absolute right-[5%] top-[18%] text-xs text-orange-500 font-bold bg-gray-100 pl-[13px] pr-[13px] p-[5px] rounded-2xl"
                  >
                    수정
                  </button>
                </div>
              ) : (
                <div className="relative w-[90%]">
                  <input
                    type="text"
                    value={hospital}
                    onChange={handleHosInputChange}
                    className="inline-block h-[40px] w-[70%] rounded-xl border border-black text-gray-700 bg-white text-lg p-2"
                    placeholder="병원명을 입력해주세요."
                  />
                  <button
                    name="hosConfirm"
                    onClick={onClickHosConfirm}
                    className="inline-block absolute right-[5%] top-[18%] text-xs text-orange-500 font-bold bg-gray-100 pl-[13px] pr-[13px] p-[5px] rounded-2xl"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr className="border-1 border-gray-300 m-auto w-[85%]" />
      <div className="flex h-[25vh] w-[100%]">
        <div className="flex flex-col w-full h-[30%] mt-[12%]">
          {!selectedSick && !disease ? (
            <>
              <p className="text-3xl w-[50%] font-black ml-[5%] mb-[2%]">
                질병
              </p>
              <p className="text-base w-[90%] text-gray-500 ml-[5%]">
                어떤 질병으로 약을 복용하시나요?
              </p>
              <div className="flex justify-center m-auto w-full mt-[5vh]">
                <InputBtn
                  className="w-[50%] h-[37px] hover:bg-blue-200 hover:text-white"
                  onClick={onClickSick}
                >
                  질병 입력
                </InputBtn>
              </div>
            </>
          ) : (
            <div className="flex m-[3vh] items-center space-x-4">
              <img
                src={RegisterSick}
                alt="질병"
                className="w-[41px] h-[34px]"
              />
              {sickConfirm ? (
                <div className="relative w-[90%]">
                  <p className="inline-block w-[70%] h-[40px] text-2xl text-gray-700 font-bold">
                    {disease}
                  </p>
                  <button
                    name="sickConfirm"
                    onClick={onClickSick}
                    className="absolute right-[5%] top-[18%] text-xs text-orange-500 font-bold bg-gray-100 pl-[13px] pr-[13px] p-[5px] rounded-2xl"
                  >
                    수정
                  </button>
                </div>
              ) : (
                <div className="relative w-[90%]">
                  <input
                    type="text"
                    value={disease}
                    onChange={handleSickInputChange}
                    className="h-[40px] w-[70%] rounded-xl border border-black text-gray-700 bg-white text-lg p-2"
                    placeholder="질병명을 입력해주세요."
                  />
                  <button
                    name="sickConfirm"
                    onClick={onClickSickConfirm}
                    className="inline-block absolute right-[5%] top-[18%] text-xs text-orange-500 font-bold bg-gray-100 pl-[13px] pr-[13px] p-[5px] rounded-2xl"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr className="border-1 border-gray-300 m-auto w-[85%]" />
      <div className="w-[100%] h-[22vh]">
        <div className="flex flex-col h-[30%] mt-[12%]">
          {!clickedDateBtn && (!startDate || !endDate) ? (
            <>
              <p className="text-3xl w-[50%] font-black mb-[2%] ml-[5%]">
                복용일
              </p>
              <p className="text-base text-gray-500 ml-[5%]">
                복용 시작일과 종료일을 입력해주세요.
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center space-x-6 mt-2 mr-7">
                <DatePicker
                  selected={startDate}
                  className="date-picker-input2"
                  showIcon
                  dateFormat="yyyy-MM-dd"
                  placeholderText="시작일"
                  onChange={handleStartDate}
                  icon={
                    <img
                      src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                      className="date-picker-img"
                    />
                  }
                ></DatePicker>
                <DatePicker
                  selected={endDate}
                  className="date-picker-input2"
                  showIcon
                  dateFormat="yyyy-MM-dd"
                  placeholderText="죵료일"
                  onChange={handleEndDate}
                  icon={
                    <img
                      src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                      className="date-picker-img"
                    />
                  }
                ></DatePicker>
              </div>
            </>
          )}
          <div className="flex justify-center h-[10vh] w-full mt-[5vh]">
            {clickedDateBtn ? (
              <InputBtn
                className="w-[50%] h-[37px] mb-[105px] hover:bg-blue-200 hover:text-white"
                onClick={onClickDate}
              >
                확인
              </InputBtn>
            ) : (
              <InputBtn
                className="w-[50%] h-[37px] hover:bg-blue-200 hover:text-white"
                onClick={onClickDate}
              >
                복용일 입력
              </InputBtn>
            )}
          </div>
        </div>
      </div>
      <hr className="border-1 border-gray-300 m-auto w-[85%]" />
      <div className="flex h-[27vh] w-[100%]">
        <div className="flex flex-col w-full h-[30%] mt-[12%]">
          {!clickedDailyBtn && !(morning || lunch || night) ? (
            <>
              <p className="text-3xl w-[50%] font-black ml-[5%] mb-[2%]">
                복용주기
              </p>
              <p className="text-base w-[90%] text-gray-500 ml-[5%]">
                하루에 몇번, 몇일 간격으로 드시나요 ?
              </p>
            </>
          ) : (
            <div className="flex justify-center items-center h-[8vh] mt-[1vh] gap-3">
              <InputBtn
                className={`w-[25%] h-[35px] ${morning ? `bg-blue-300 text-white` : ''}`}
                onClick={() => handleDailyBtn('morning')}
              >
                아침
              </InputBtn>
              <InputBtn
                className={`w-[25%] h-[35px] ${lunch ? `bg-blue-300 text-white` : ''}`}
                onClick={() => handleDailyBtn('lunch')}
              >
                점심
              </InputBtn>
              <InputBtn
                className={`w-[25%] h-[35px] ${night ? `bg-blue-300 text-white` : ''}`}
                onClick={() => handleDailyBtn('night')}
              >
                저녁
              </InputBtn>
            </div>
          )}
          <div className="flex justify-center m-auto w-full mt-[5vh]">
            {!clickedDailyBtn ? (
              <InputBtn
                className="w-[50%] h-[37px] hover:bg-blue-200 hover:text-white"
                onClick={onClickDaily}
              >
                주기입력
              </InputBtn>
            ) : (
              <InputBtn
                className="w-[50%] h-[37px] hover:bg-blue-200 hover:text-white"
                onClick={onClickDaily}
              >
                확인
              </InputBtn>
            )}
          </div>
        </div>
      </div>
      <hr className="border-1 border-gray-300 m-auto w-[85%] mt-[10px]" />

      <div className="w-[100%] h-[15vh] flex flex-col justify-center">
        <SaveBtn
          className="m-auto h-[35px] w-[50%]"
          onClick={handleSubmitDrugData}
        >
          저장하기ㄴㄴ
        </SaveBtn>
      </div>
    </div>
  );
};

export default DirectRegister;
