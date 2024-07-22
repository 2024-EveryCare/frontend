import React, {
  ReactEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PillNextText from '../../components/register/PillNextText';
import SaveBtn from './button/SaveBtn';
import { RegisterContext } from '../../context/RegisterContext';
import './CustomDatePicker.css';
import ReactDatePicker from 'react-datepicker';
import CalendarImg from '../../assets/calendar.png';
import { useNavigate } from 'react-router';
import InputBtn from './button/InputBtn';

const MediNameStyle = {
  flex: 1, // p 태그가 가능한 너비를 차지하도록 설정합니다.
  margin: '0', // p 태그의 기본 마진을 제거합니다.
  overflow: 'hidden', // 넘치는 텍스트를 숨깁니다.
  whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록 합니다.
  textOverflow: 'ellipsis', // 넘치는 텍스트를 말줄임표(...)로 표시합니다.
  textAlign: 'center',
};
const PillRegister: React.FC = () => {
  const {
    savedDrug,
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
    setIntakeCycle,
    morning,
    setMorning,
    lunch,
    setLunch,
    night,
    setNight,
  } = useContext(RegisterContext);

  useEffect(() => {
    console.log('');
  }, [morning, lunch, night]);

  const handleDailyBtn = (name: string) => {
    if (name == 'morning') {
      setMorning((pre) => !pre);
    } else if (name == 'lunch') setLunch((pre) => !pre);
    else setNight((pre) => !pre);
    console.log('Daily 상태: ', morning, lunch, night);
  };

  const handleIntakeCycle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('intakecycle input.. : ');
    setIntakeCycle(e.target.value);
    console.log(intakeCycle);
  };
  const handleIntakeDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('intakedaily input..');
    setIntakeDaily(e.target.value);
    console.log(intakeDaily);
  };

  const handleStartDate = (date: Date) => {
    console.log(date);
    setStartDate(date);
  };
  const handleEndDate = (date: Date) => {
    console.log(date);
    setEndDate(date);
  };

  const [intakeDailyBtn, setIntakeDailyBtn] = useState<boolean>(true);

  const onClickIntakeDaily = () => {
    setIntakeDailyBtn((pre) => !pre);
  };
  const onClickStartDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setSelectedStartDateBtn(name);
  };

  const onClickEndDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setSelectedEndDateBtn(name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleDeleteList = (itemName) => {
    const temp = savedDrug.filter((item) => item.drugName !== itemName);
    console.log('기존:', temp);
    setSavedDrug(temp);
  };
  const nevigate = useNavigate();
  const handleRedirect = (path) => {
    console.log('pill-search page redirect...');
    nevigate(path);
  };
  return (
    <div className="h-[79vh] overflow-y-auto">
      <div className="w-[100%] h-[22vh]">
        <div className="mt-[3vh] ml-[5%] mb-[2%]">
          <PillNextText
            headText="복용 약"
            contentText="복용하시는 약이 맞으신가요?"
          ></PillNextText>
        </div>
        {savedDrug.length ? (
          <ul className="flex m-auto h-[10vh] flex-wrap overflow-y-scroll">
            {savedDrug.map((showedDrug) => (
              <li className="w-[46%] h-[2.5vh] flex mt-2 ml-2 border border-gray-500 rounded-xl justify-center items-center text-sm text-gray-500 relative pt-4 pb-4 pr-4 text-center">
                <p style={MediNameStyle}>{showedDrug.drugName}</p>

                <button
                  className="w-4 h-4 border border-[#F5F5F5] rounded-[10px] text-[1rem] text-[#F56132] bg-[rgba(217, 217, 217, 0.58)] absolute right-[1%] top-[18%] font-bold"
                  onClick={() => handleDeleteList(showedDrug.drugName)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="w-[100%] flex">
          <InputBtn
            className={`${savedDrug.length ? 'm-auto h-[35px] w-[80%]' : 'm-auto mt-[30px] h-[35px] w-[80%]'}`}
            onClick={() => handleRedirect('/pill-search')}
          >
            추가하기
          </InputBtn>
        </div>
      </div>
      <div className="w-[100%] h-[22vh]">
        <div className="mt-[3vh] ml-[5%] mb-[2%]">
          <PillNextText
            headText="복약 횟수"
            contentText="하루에 몇 번, 몇 일 간격으로 복용하시나요?"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-100% flex flex-col justify-center items-center space-y-6"
        >
          {/* <div className="flex justify-center space-x-8 w-[100%] px-4">
            <InputBtn
              className="h-[35px] w-[80%] mt-[30px]"
              onClick={onClickIntakeDaily}
            >
              주기 입력
            </InputBtn>
          </div> */}
          {(intakeDailyBtn) ? (
            <div className="w-[100%] h-[100px]  flex items-center space-x-1 justify-center gap-1 m-auto">
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
        </form>
      </div>
      <div className="w-[100%] h-[22vh]">
        <div className="mt-[3vh] ml-[5%] mb-[2%]">
          <PillNextText
            headText="복약일"
            contentText="언제부터 언제까지 복약을 하시나요?"
          />
        </div>
        <div className="w-[100%] h-[10vh] mt-[30px] flex justify-center">
          <ReactDatePicker
            className="pillRegister-date-picker-input-start"
            showIcon
            dateFormat="yyyy-MM-dd"
            placeholderText="시작일"
            selected={startDate}
            onChange={handleStartDate}
            icon={
              <img
                src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                className="date-picker-img"
              />
            }
          ></ReactDatePicker>
          <span className="w-[30px]"></span>
          <ReactDatePicker
            className="pillRegister-date-picker-input-end"
            showIcon
            dateFormat="yyyy-MM-dd"
            placeholderText="죵료일"
            selected={endDate}
            onChange={handleEndDate}
            icon={
              <img
                src={CalendarImg} // 외부 이미지의 URL을 지정합니다.
                className="date-picker-img"
              />
            }
          ></ReactDatePicker>
        </div>
      </div>
      <div className="w-[100%] h-[15vh] flex flex-col justify-center">
        <SaveBtn
          className="m-auto h-[35px] w-[50%]"
          onClick={() => handleRedirect('/direct-register')}
        >
          저장하기
        </SaveBtn>
      </div>
    </div>
  );
};

export default PillRegister;
