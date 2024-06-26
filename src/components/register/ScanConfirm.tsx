import React, { useState } from 'react';
import Prescription from '../../assets/register/Prescription.png';
import PillNextText from './PillNextText';
import BackBtn from './button/BackBtn';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CalendarImg from '../../assets/calendar.png';

import './CustomDatePicker.css';
import InputBtn from '../../components/register/button/InputBtn';
import SaveBtn from '../../components/register/button/SaveBtn';
import AddPillModal from './AddPillModal';

import axios from 'axios';

const formatDate = (date: []) => {
  switch (date[1]) {
    case 'Jan':
      date[1] = '01';
      break;
    case 'Feb':
      date[1] = '02';
      break;
    case 'Mar':
      date[1] = '03';
      break;
    case 'Apr':
      date[1] = '04';
      break;
    case 'May':
      date[1] = '05';
      break;
    case 'Jun':
      date[1] = '06';
      break;
    case 'Jul':
      date[1] = '07';
      break;
    case 'Aug':
      date[1] = '08';
      break;
    case 'Sep':
      date[1] = '09';
      break;
    case 'Oct':
      date[1] = '10';
      break;
    case 'Nov':
      date[1] = '11';
      break;
    case 'Dec':
      date[1] = '12';
      break;
  }
  const formatedDate = date[3] + '-' + date[1] + '-' + date[2];
  console.log(formatedDate);
  return formatedDate;
};

const ScanConfirm: React.FC = () => {
  const ExContainnerStyle = {
    width: '100%',
    height: '80vh',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    overflow: 'auto',
    textAlign: 'center',
    margin: '0',
    marginTop: '1vh',
    // backgroundColor: 'green',
  }; // 처방전 사진, 처방약품, 복용기간, 질환이름등 모든 컨텐츠를 감싸는 컨테이너

  const ListStyle = {
    width: '46%',
    height: '2.5vh',
    display: 'flex',
    marginTop: '10px',
    marginLeft: '0.8rem',
    border: '1px solid gray',
    borderRadius: '15px',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
    fontSize: '0.8rem',
    color: 'gray',
    position: 'relative',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingRight: '1rem',
  };

  const deleteBtnStyle = {
    width: '1rem',
    height: '1rem',
    border: '1px solid #F5F5F5',
    borderRadius: '10px',
    fontSize: '1rem',
    color: '#F56132',
    backgroundColor: 'rgba(217, 217, 217, 0.58)',
    position: 'absolute',
    right: '1%',
    top: '18%',
    fontWeight: 'bold',
  };

  const MediNameStyle = {
    flex: 1, // p 태그가 가능한 너비를 차지하도록 설정합니다.
    margin: '0', // p 태그의 기본 마진을 제거합니다.
    overflow: 'hidden', // 넘치는 텍스트를 숨깁니다.
    whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록 합니다.
    textOverflow: 'ellipsis', // 넘치는 텍스트를 말줄임표(...)로 표시합니다.
  };
  //--------------------------- 스타일 ---------------------------------------
  const [inputValue, setInputValue] = useState<string>(''); // 모달창 input박스 안 데이터를 읽어오는 배열.

  interface MedicineData {
    medicine_name: string;
    medicine_code: string;
    medicine_pcode: string;
    medicine_company: string;
    check: boolean;
  }
  const [mediData, setMediData] = useState<MedicineData>([]);

  const changeInputBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 모달창 input박스에서 글씨가 입력되면 onChange이벤트 발생하는데 그때마다 배열 최신화.
    console.log('입력중...');
  };

  const searchMedi = () => {
    //서버로 inputValue값 넘길 로직 작성
    if (inputValue.trim() == '') {
      alert('감색어를 입력하세요!!');
      // 스페이스 같은 짓 못하도록 trim() 을 사용해서 공백문자 줄바꿈 제거 후 검증
      return;
    }
    console.log('전송중,,');
    axios
      .post('http://127.0.0.1:8000/test/', { query: inputValue })
      .then((response) => {
        console.log('서버 응답:', response.data);
        setMediData(response.data);
        // console.log('테스트', mediData);
        // console.log('테스트2', mediData[0]["medicine_id"]);
      })
      .catch((error) =>
        console.error('서버로 데이터를 보내는데 실패했습니다:', error),
      );
  };

  const [saveMediData, setSaveMediData] = useState<MedicineData[]>([]);
  const handleCheckboxChange = (index: number) => {
    const updatedMediData = [...mediData];
    updatedMediData[index].check = !updatedMediData[index].check;
    console.log(index);
    if (updatedMediData[index].check) {
      console.log('체크박스 체크');
      setSaveMediData([...saveMediData, updatedMediData[index]]);
    } else {
      const updatedSaveMediData = saveMediData.filter(
        (item) => item.medicine_id !== updatedMediData[index].medicine_id,
      ); // 일치하지 않는것은 저장을 안하고 일치하는것만 남겨서 update배열에 새로 저장, 중괄호가 없으면 boolean으로
      console.log('체크박스 해제');
      setSaveMediData(updatedSaveMediData);
    }

    setMediData(updatedMediData);
  };

  const handleDeleteList = (medicine_name: string) => {
    const updatedMediData = [...saveMediData]; // 기존 저장배열을 받아옴
    const updatedSaveMediData = updatedMediData.filter((item) => {
      return item.medicine_name !== medicine_name;
    });
    setSaveMediData(updatedSaveMediData);
    console.log(saveMediData);
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMediData([]);
  };

  const [startDate, setStartdDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: Date | null) => {
    console.log(date);

    const splitDate = String(date).split(' '); // date가 datepicker 의 객체로 전달되어서 형변환 필요.
    const formatedDate = formatDate(splitDate);

    console.log(formatedDate);

    setStartdDate(formatedDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    console.log(date);

    const splitDate = String(date).split(' '); // date가 datepicker 의 객체로 전달되어서 형변환 필요.
    const formatedDate = formatDate(splitDate);

    console.log(formatedDate);
    setEndDate(formatedDate);
  };

  const [showIntakeCycle, setShowIntakeCycle] = useState(false);
  const [showHospital, setShowHospital] = useState(false);
  const [showDisease, setShowDisease] = useState(false);
  const [intakeCycle, setIntakeCycle] = useState('');
  const [intakeDaily, setIntakeDaily] = useState('');
  const [hospital, setHospital] = useState('');
  const [disease, setDisease] = useState('');

  const handleShowIntakeCycle = () => {
    setShowIntakeCycle((preShowIntakeCycle) => !preShowIntakeCycle);
  };

  const handleShowHospital = () => {
    setShowHospital((preShowHospital) => !preShowHospital);
  };

  const handleShowDisease = () => {
    setShowDisease((preShowDisease) => !preShowDisease);
  };

  const handleIntakeCycle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIntakeCycle(e.target.value);
  };

  const handleIntakeDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setIntakeDaily(e.target.value);
  };

  const handleHospital = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setHospital(e.target.value);
  };

  const handleDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDisease(e.target.value);
  };

  interface submitData {
    drugName: [];
    intakeStart: string;
    intakeEnd: string;
    intakeCycle: string;
    hospital: string;
    disease: string;
  }

  const [dataSubmit, setDataSubmit] = useState<submitData>(null);

  const handleDataSubmit = () => {
    console.log(saveMediData);
    console.log(hospital);
    console.log(startDate);
    console.log(endDate);
    console.log(disease);
    console.log(intakeCycle);
    console.log(intakeDaily);
    const medicineCode = saveMediData.map((item) => item.medicine_code);
    console.log(medicineCode);
    axios
      .put('http://127.0.0.1:8000/test/', {
        medicineCode: medicineCode,
        intakeStart: startDate,
        intakeEnd: endDate,
        intakeCycle: intakeCycle,
        intakeDaily: intakeDaily,
        hospital: hospital,
        disease: disease,
      })
      .then((response) => {
        console.log('서버 응답:', response.data);
      });
  };
  return (
    <>
      <BackBtn text="처방전 확인"></BackBtn>

      <div style={ExContainnerStyle}>
        <img
          src={Prescription}
          className="h-[30%] w-[80%] m-[auto] mt-[10px] mb-[0] pt-[2vh]"
        />
        <p
          style={{ textAlign: 'center', fontSize: '0.94rem', color: '#666666' }}
          className="mt-[0.5rem]"
        >
          등록한 처방전에서 개인정보는 저장되지 않습니다.
        </p>

        <div className="w-[100%] h-[15vh] relative mb-[0] mt-[0.8rem]">
          {/* //추가, 수정 소 버튼의 위치를 상대적으로 지정하기 위해 div로 한번 감싸주었음. */}
          <PillNextText className="absolute" headText="처방약품"></PillNextText>
          <ul className="flex m-auto w-[90%] h-[10vh] flex-wrap overflow-y-scroll">
            {saveMediData.map((medicine) => (
              <li style={ListStyle}>
                <p style={MediNameStyle}>{medicine.medicine_name}</p>
                <button
                  style={deleteBtnStyle}
                  onClick={() => handleDeleteList(medicine.medicine_name)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>

          <AddPillModal showModal={showModal} onClose={handleCloseModal}>
            <div className="w-[100%] h-[20%] mt-[2vh]">
              <input
                type="text"
                placeholder="   찾는 약이 있으신가요?"
                className="mx-auto w-[80%] h-[5vh] border border-gray-300  "
                onChange={changeInputBox} // input창에 입력 발생시 배열에 저장.(최종전송은 버튼이 눌리면 할거임.)
              />

              <button
                className="w-[20%] h-[5vh] border border-gray-400 bg-gray-200"
                onClick={searchMedi}
              >
                검색 🔍
              </button>
            </div>

            <div className="w-[100%] h-[25vh] overflow-y-scroll text-[1vh]">
              <table className="w-[100%] h-[30vh] divide-y border-black border-1 table-fixed">
                <thead className="w-[100%] h-[3vh] bg-gray-100 border-t-2 border-gray-300">
                  <tr>
                    <th className="h-[3vh] w-[26%] text-center align-middle text-[1.4vh] p-[5px] border-l-[1px] border-gray-200">
                      제품명
                    </th>
                    <th className="h-[3vh] w-[17%] text-center align-middle text-[1.4vh] p-[5px] border-l-[1px] border-gray-200">
                      제품코드
                    </th>
                    <th className="h-[3vh] w-[19%] text-center align-middle text-[1.4vh] p-[5px] border-l-[1px] border-gray-200">
                      주성분코드
                    </th>
                    <th className="h-[3vh] w-[28%] text-center align-middle text-[1.4vh] p-[5px] border-l-[1px] border-gray-200">
                      업체명
                    </th>
                    <th className="h-[3vh] w-[10%] text-center align-middle text-[1.4vh] p-[5px] border-l-[1px] border-r-[1px] border-gray-200">
                      선택
                    </th>
                  </tr>
                </thead>
                <tbody className="w-[100%] bg-white h-[80%] overflow-y-scroll">
                  {mediData.map((medicine, index) => (
                    <tr
                      className="border border-gray-200 relative"
                      key={medicine.medicine_id}
                    >
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.medicine_name}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.medicine_code}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.medicine_pcode}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.medicine_company}
                      </td>
                      <input
                        className="absolute bottom-[50%] right-[3%]"
                        type="checkbox"
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AddPillModal>
          {/* </div> */}
          <button
            className="absolute right-[7%] top-[10%] pl-[5px] pr-[5px] rounded-full bg-gray-200 text-red-500 text-center font-extrabold text-[12px] leading-normal"
            onClick={handleOpenModal} // 모달창 open 핸들러
          >
            추가
          </button>
        </div>

        <div className="h-[15vh] w-[100%] mt-[2vh]">
          <PillNextText headText="복용기간"></PillNextText>

          <div className="flex w-[100%] h-[6.4%] justify-center">
            <DatePicker
              className="date-picker-input"
              showIcon
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작일"
              icon={
                // 외부 이미지를 사용하려면 아이콘을 <img> 요소로 변경합니다.
                <img
                  src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                  alt="Icon" // 이미지에 대한 대체 텍스트를 제공합니다.
                  className="date-picker-img"
                />
              }
            />
            <DatePicker
              // className="border border-gray-300 rounded-lg"
              className="date-picker-input"
              showIcon
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="죵료일"
              icon={
                // 외부 이미지를 사용하려면 아이콘을 <img> 요소로 변경합니다.
                <img
                  src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                  className="date-picker-img"
                />
              }
            />
          </div>
        </div>

        <div className="h-[15vh] w-[100%] mt-[3vh]">
          <PillNextText
            headText="복약횟수"
            contentText="하루에 몇번 복약 하시나요"
          ></PillNextText>
          <div>
            {showIntakeCycle ? (
              <div className="flex justify-center items-center h-[6vh] mt-[1vh]">
                <div className="w-[30%] h-[30px] flex justify-center items-center rounded-2xl border-blue-200 border-[1px] text-gray-500 text-[8px] inline-block m-auto ml-auto mr-[1vh]">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="ex)1"
                    className="text-[14px] text-right"
                    onChange={handleIntakeDaily}
                  />
                  <button className="w-[30%] text-blue-400 text-left font-bold">
                    회 섭취
                  </button>
                </div>
                <div className="w-[30%] h-[30px] flex justify-center items-center rounded-2xl border-blue-200 border-[1px] text-gray-500 text-[8px] inline-block mr-auto ml-[1vh]">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="ex)0"
                    className="text-[14px] text-right"
                    onChange={handleIntakeCycle}
                  />
                  <button className="w-[30%] text-blue-400 text-left font-bold">
                    일 간격
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <InputBtn
            onClick={handleShowIntakeCycle}
            className="w-[80%] h-[30px] text-[16px] p-[1vh] flex items-center justify-center text-center]"
          >
            주기입력
          </InputBtn>
        </div>

        <div className="h-[15vh] w-[100%] mt-[3vh]">
          <PillNextText
            headText="처방병원"
            contentText="어느 병원에서 처방받으셨나요"
          ></PillNextText>
          {showHospital ? (
            <div className="flex flex-col justify-center aligin-center h-[30px] w-[80%] mt-[1rem] rounded-2xl border-blue-200 border-[1px] text-gray-500 m-auto">
              <input
                type="text"
                className="w-[70%] h-[80%] m-auto text-center"
                placeholder="병원을 입력 해 주세요"
                onChange={handleHospital}
              />
            </div>
          ) : null}

          <InputBtn
            onClick={handleShowHospital}
            className="w-[80%] h-[30px] text-[16px] p-[1vh] flex items-center justify-center text-center]"
          >
            병원입력
          </InputBtn>
        </div>

        <div className="w-[100%] h-[15vh] mt-[5vh] relative">
          <PillNextText
            headText="질환이름"
            contentText="어떤 질환으로 약을 복용하시나요"
          ></PillNextText>
          {showDisease ? (
            <div className="flex flex-col justify-center aligin-center h-[30px] w-[80%] mt-[1rem] rounded-2xl border-blue-200 border-[1px] text-gray-500 m-auto">
              <input
                type="text"
                className="w-[70%] h-[80%] m-auto text-center"
                placeholder="질병을 입력 해 주세요."
                onChange={handleDisease}
              />
            </div>
          ) : null}
          <InputBtn
            onClick={handleShowDisease}
            className="w-[80%] h-[30px] text-[16px] p-[1vh] flex items-center justify-center text-center]"
          >
            질병입력
          </InputBtn>
        </div>

        <SaveBtn
          className="w-[80%] h-[30px] text-[16px] p-[1vh] flex items-center justify-center text-center]"
          onClick={handleDataSubmit}
        >
          저장하기
        </SaveBtn>
      </div>
    </>
  );
};

export default ScanConfirm;
