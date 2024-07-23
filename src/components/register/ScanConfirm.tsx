import React, { useContext, useEffect, useState } from 'react';
import Prescription from '../../assets/register/Prescription.png';
import PillNextText from './PillNextText';
import BackBtn from './button/BackBtn';
import { useSearchDrug } from '../../service/queries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CalendarImg from '../../assets/calendar.png';

import './CustomDatePicker.css';
import InputBtn from '../../components/register/button/InputBtn';
import SaveBtn from '../../components/register/button/SaveBtn';
import AddPillModal from './AddPillModal';
import {
  formatDate,
  formatDateObject,
  intakeDailyCalculator,
} from '../../utils/date';
import axios from 'axios';
import { RegisterContext } from '../../context/RegisterContext';
import { searchDrug } from '../../service/searchDrug';
import { submitDrugData } from '../../service/submitDrugData';

interface DrugData {
  drugName: string;
  drugCode: string;
  drugPcode: string;
  drugCompany: string;
  check: boolean;
}

const ScanConfirm: React.FC = () => {
  const { OCRData, setOCRData, imgURL, setImgURL } =
    useContext(RegisterContext); // 처방전 인식 결과를 받아오는 전역변수 역할
  useEffect(() => {
    //ocr데이터가 넘어올때 초기 새팅을 위한 useEffect
    const drugName = OCRData.drugName; // ocr로 받을때 약 정보는 한번에 배열로 받아서 직접입력하기 형식과 맞추려면 drugName배열을 다 풀어서 pcode,code,company가 있는 형식으로 맞춰줘야함. 안그러면 리스트에서 랜더링을 못함
    //OCRData는 객체이므로 바로 map으로 돌리기가 불가능.
    const parsedDrugData = drugName.map((drugName) => ({
      drugName: drugName,
      drugCode: '',
      drugPcode: '',
      drugCompany: '',
    }));

    setSaveDrugData(parsedDrugData);
    setIntakeCycle(OCRData.intakeCycle);
    setHospital(OCRData.hospital);
    // setShowHospital(true); 결과가 있을때만 보여주기
    setDisease(OCRData.disease);
    // setShowDisease(true); 결과가 있을때만 보여주기
  }, [OCRData]);
  const [morning, setMorning] = useState<boolean>(false);
  const [lunch, setLunch] = useState<boolean>(false);
  const [night, setNight] = useState<boolean>(false);
  const [showedDrugCount, setShowedDrugCount] = useState(0);
  const [inputValue, setInputValue] = useState<string>(''); // 모달창 input박스 안 데이터를 읽어오는 배열.


  const [drugData, setDrugData] = useState<DrugData>([]);

  const changeInputBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // 모달창 input박스에서 글씨가 입력되면 onChange이벤트 발생하는데 그때마다 배열 최신화.
    console.log('입력중...');
  };

  const searchMedi = async () => {
    //서버로 inputValue값 넘길 로직 작성
    if (inputValue.trim() == '') {
      alert('감색어를 입력하세요!!');
      // 스페이스 같은 짓 못하도록 trim() 을 사용해서 공백문자 줄바꿈 제거 후 검증
      return;
    }
    const searchedDrugData = await searchDrug(inputValue);
    setDrugData(searchedDrugData.data);
  };

  const [saveDrugData, setSaveDrugData] = useState<DrugData[]>([]);
  const handleCheckboxChange = (index: number) => {
    const updatedDrugData = [...drugData];
    updatedDrugData[index].check = !updatedDrugData[index].check;
    console.log(index);
    if (updatedDrugData[index].check) {
      console.log('체크박스 체크');
      setSaveDrugData([...saveDrugData, updatedDrugData[index]]);
      console.log(saveDrugData);
    } else {
      const updatedSaveDrugData = saveDrugData.filter(
        (item) => item.drugID !== updatedDrugData[index].drugID,
      ); // 일치하지 않는것은 저장을 안하고 일치하는것만 남겨서 update배열에 새로 저장, 중괄호가 없으면 boolean으로
      console.log('체크박스 해제');
      setSaveDrugData(updatedSaveDrugData);
    }

    setDrugData(updatedDrugData);
  };

  const handleDeleteList = (drugName: string) => {
    const updatedDrugData = [...saveDrugData]; // 기존 저장배열을 받아옴
    const updatedSaveDrugData = updatedDrugData.filter((item) => {
      return item.drugName !== drugName;
    });
    setSaveDrugData(updatedSaveDrugData);
    console.log(saveDrugData);
  };
  const handleDailyBtn = (name: string) => {
    if (name == 'morning') {
      setMorning((pre) => !pre);
    } else if (name == 'lunch') setLunch((pre) => !pre);
    else setNight((pre) => !pre);
    console.log('Daily 상태: ', morning, lunch, night);
  };

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDrugData([]);
  };

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleStartDate = (date: Date | null) => {
    console.log(date);
    setStartDate(date);
  };

  const handleEndDate = (date: Date | null) => {
    console.log(date);
    setEndDate(date);
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
    console.log(OCRData);
    console.log(endDate);
    setHospital(e.target.value);
  };

  const handleDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDisease(e.target.value);
  };

  const [saveBtn, setSaveBtn] = useState<boolean>(false);
  const [drugName, setDrugName] = useState<string[]>([]);
  const handleSubmitDrugData = async () => {
    await setDrugName(await saveDrugData.map((drugData) => drugData.drugName));
    await setIntakeDaily(await intakeDailyCalculator(morning, lunch, night));
    if (
      drugName.length &&
      startDate &&
      endDate &&
      intakeDaily &&
      hospital &&
      disease
    ) {
      await setStartDate(await formatDateObject(startDate));
      await setEndDate(await formatDateObject(endDate));
      setSaveBtn((pre) => !pre);
    } else {
      console.log('값이 입력되지 않았습니다.');
    }
  };

  useEffect(() => {
    if (saveBtn) {
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
    <>
      <BackBtn text="처방전 확인"></BackBtn>

      <div className="w-[100%] h-[80vh] text-center margin-0 mt-0 overflow-y-scroll">
        <img
          src={imgURL}
          className="h-[30%] w-[80%] m-[auto] mt-[10px] mb-[0] pt-[2vh]"
        />
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.94rem',
            color: '#666666',
          }}
          className="mt-[0.5rem]"
        >
          등록한 처방전에서 개인정보는 저장되지 않습니다.
        </p>

        <div className="w-[100%] h-[15vh] relative mb-[0] mt-[0.8rem]">
          {/* //추가, 수정 소 버튼의 위치를 상대적으로 지정하기 위해 div로 한번 감싸주었음. */}
          <PillNextText
            imgStyle="ml-[1vh]"
            headText="처방약품"
            contentText="처방 받으신 약이 맞으신가요 ?"
          ></PillNextText>
          <ul className="flex m-auto mt-[3vh] w-[90%] h-[10vh] flex-wrap overflow-y-scroll bg-blue-50 rounded-[15px]">
            {saveDrugData.map((medicine) => (
              <li className="w-[46%] h-[2.5vh] flex mt-[23px] ml-[0.8rem] border border-gray-500 rounded-[15px] justify-center items-center text-[0.8rem] text-gray-500 relative pt-4 pb-4 pr-4">
                <p className="flex-1 m-0 overflow-hidden whitespace-nowrap text-ellipsis">
                  {medicine.drugName}
                </p>

                <button
                  className="w-4 h-4 border border-[#F5F5F5] rounded-[10px] text-[1rem] text-[#F56132] bg-[rgba(217,217,217,0.58)] absolute right-[1%] top-[18%] font-bold"
                  onClick={() => handleDeleteList(medicine.drugName)}
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
                  {drugData.map((medicine, index) => (
                    <tr
                      className="border border-gray-200 relative"
                      key={medicine.drugID}
                    >
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.drugName}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.drugCode}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.drugPcode}
                      </td>
                      <td className="h-[10%] w-[17%] border border-gray-200 whitespace-normal overflow-x-scroll align-middle">
                        {medicine.drugCompany}
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

        <div className="h-[15vh] w-[100%] mt-[8vh]">
          <PillNextText
            imgStyle="ml-[1vh]"
            headText="복용기간"
            contentText="복용 시작일과 종료일을 입력해주세요"
          ></PillNextText>

          <div className="flex w-[100%] h-[6.4%] mt-[4vh] justify-center">
            <DatePicker
              className="date-picker-input"
              showIcon
              selected={startDate}
              onChange={handleStartDate}
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
              onChange={handleEndDate}
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

        <div className="h-[20vh] w-[100%] mt-[8vh]">
          <PillNextText
            imgStyle="ml-[1vh]"
            headText="복약횟수"
            contentText="하루에 몇번 복약 하시나요"
          ></PillNextText>
          <div>
            {showIntakeCycle ? (
              <div className="flex justify-center items-center h-[8vh] mt-[1vh] flex justify-center gap-3">
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
            ) : null}
          </div>
          <div className="w-[100%] h-[10vh] mt-[1vh]">
            {showIntakeCycle ? (
              <InputBtn
                onClick={handleShowIntakeCycle}
                className="w-[80%] h-[30px] mt-[3vh] hover:bg-blue-200 hover:text-white"
              >
                확인
              </InputBtn>
            ) : (
              <InputBtn
                onClick={handleShowIntakeCycle}
                className="w-[80%] h-[30px] mt-[3vh] hover:bg-blue-200 hover:text-white"
              >
                주기입력
              </InputBtn>
            )}
          </div>
        </div>

        <div className="h-[20vh] w-[100%] mt-[3vh]">
          <PillNextText
            imgStyle="ml-[1vh]"
            headText="처방병원"
            contentText="어느 병원에서 처방받으셨나요"
          ></PillNextText>
          {showHospital ? (
            <div className="flex flex-col justify-center aligin-center h-[30px] w-[80%] mt-[2rem] rounded-2xl border-blue-200 border-[1px] m-auto">
              <input
                type="text"
                className="w-[70%] h-[80%] m-auto text-center"
                placeholder="병원을 입력 해 주세요"
                value={hospital}
                onChange={handleHospital}
              />
            </div>
          ) : null}
          <div className="w-[100%] h-[10vh] mt-[3.5vh]">
            {showHospital ? (
              <InputBtn
                onClick={handleShowHospital}
                className="w-[80%] h-[30px] hover:bg-blue-200 hover:text-white"
              >
                확인
              </InputBtn>
            ) : (
              <InputBtn
                onClick={handleShowHospital}
                className="w-[80%] h-[30px] hover:bg-blue-200 hover:text-white"
              >
                병원입력
              </InputBtn>
            )}
          </div>
        </div>

        <div className="w-[100%] h-[20vh] mt-[5vh] relative">
          <PillNextText
            imgStyle="ml-[1vh]"
            headText="질환이름"
            contentText="어떤 질환으로 약을 복용하시나요"
          ></PillNextText>
          {showDisease ? (
            <div className="flex flex-col justify-center aligin-center h-[30px] w-[80%] mt-[2rem] rounded-2xl border-blue-200 border-[1px] m-auto">
              <input
                type="text"
                className="w-[70%] h-[80%] m-auto text-center"
                placeholder="질병을 입력 해 주세요."
                value={disease}
                onChange={handleDisease}
              />
            </div>
          ) : null}
          <div className="w-[100%] h-[10vh] mt-[3vh]">
            {showDisease ? (
              <InputBtn
                onClick={handleShowDisease}
                className="w-[80%] h-[30px] hover:bg-blue-200 hover:text-white"
              >
                확인
              </InputBtn>
            ) : (
              <InputBtn
                onClick={handleShowDisease}
                className="w-[80%] h-[30px] hover:bg-blue-200 hover:text-white"
              >
                질병입력
              </InputBtn>
            )}
          </div>
        </div>
        <div className="w-[100%] h-[15vh] flex flex-col justify-center">
          <SaveBtn
            className="m-auto h-[35px] w-[50%]"
            onClick={handleSubmitDrugData}
          >
            저장하기
          </SaveBtn>
        </div>
      </div>
    </>
  );
};

export default ScanConfirm;