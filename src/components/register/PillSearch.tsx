import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchIcon from '../../assets/SearchIc.png';
import PillNextText from './PillNextText';
import SaveBtn from './button/SaveBtn';
import { RegisterContext } from '../../context/RegisterContext';
import { useNavigate } from 'react-router';
import { autoData, drugSearch } from '../../service/searchDrug';

const PillSearch: React.FC = () => {
  const navigate = useNavigate();
  interface DrugData {
    drugName: string;
    imageUrl: string;
    name: string;
  }

  const { savedDrug, setSavedDrug } = useContext(RegisterContext);
  const [searchedDrugData, setSearchedDrugData] = useState<DrugData[] | null>(
    null,
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [countDrug, setCountDrug] = useState<number>(0); // countDrug 타입 추가
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]); // checkboxRefs 수정
  const checkedBgRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchData = e.target.value;
    setSearchInputValue(searchData);

    if (searchData.length >= 2) {
      console.log('자동 완성 검색어:', searchData);

      const data = await autoData(searchData);
      setAutoCompleteData(data.map((item) => item.name));
      setShowDropdown(data.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDropdownClick = (drugName: string) => {
    setSearchInputValue(drugName);
    setShowDropdown(false);
  };

  const handleCheckboxChange = (index: number) => {
    if (checkboxRefs.current[index]) {
      checkboxRefs.current[index]!.checked =
        !checkboxRefs.current[index]!.checked;
      if (checkboxRefs.current[index]!.checked) {
        handleCheckboxBgChange2(index);
      } else {
        handleCheckboxBgChange(index);
      }
    }
  };

  const handleCheckboxBgChange = (index: number) => {
    // 선택 해제 모드
    console.log(checkedBgRefs.current[index]);
    checkedBgRefs.current[index]?.classList.remove('bg-blue-50');
    const drug = checkboxRefs.current[index]!.value; // 삭제 할 약의 값
    const { drugName } = JSON.parse(drug); // 문자열로 바꾼후, 재구조화를 통해서 drugCode만 추출.
    console.log('drugCode:', drugName);
    const temp = savedDrug.filter(
      (drugData: DrugData) => drugData.drugName !== drugName,
    ); // 지우려는 데이터를 뺀 나머지 항목을 다시 저장
    setSavedDrug(temp);
  };

  const handleCheckboxBgChange2 = (index: number) => {
    // 선택 모드
    console.log(checkedBgRefs.current[index]);
    checkedBgRefs.current[index]?.classList.add('bg-blue-50');
    const drug = JSON.parse(checkboxRefs.current[index]!.value);
    setSavedDrug((preSavedDrug: DrugData[]) => [...preSavedDrug, drug]);
  };

  useEffect(() => {
    if (searchedDrugData) {
      setCountDrug(searchedDrugData.length); // 검색된 약데이터의 길이로 count 설정
    } else {
      setCountDrug(0);
    }
  }, [searchedDrugData]);

  const autoSave = () => {
    setShowDropdown(false);
    const updatedDrugs = [...savedDrug];
    for (let i = 0; i < checkboxRefs.current.length; i++) {
      if (checkboxRefs.current[i]?.checked) {
        const drug = JSON.parse(checkboxRefs.current[i]!.value);
        const exists = updatedDrugs.some(
          (savedDrug) => savedDrug.drugName === drug.drugName,
        );
        if (!exists) {
          updatedDrugs.push(drug);
        }
        handleCheckboxChange(i);
      }
    }
    setSavedDrug(updatedDrugs);
  };

  const searchDrugs = async () => {
    if (searchInputValue.trim() === '') {
      alert('검색어를 입력해 주세요!');
      return;
    }

    autoSave();
    try {
      console.log('검색 요청어:', searchInputValue);
      const drugs = await drugSearch(searchInputValue);
      if (Array.isArray(drugs)) {
        setSearchedDrugData(drugs);
      } else {
        console.error('Unexpected data format:', drugs);
        setSearchedDrugData([]);
      }
    } catch (error) {
      console.error('약물 검색 오류:', error);
      setSearchedDrugData([]);
    }
  };

  const saveDrug = () => {
    console.log(savedDrug);
    navigate('/pill-register');
  };

  return (
    <div className="h-[80vh] mb-20">
      <div className="w-[100%] relative flex justify-center mt-4">
        <input
          type="text"
          placeholder="약 이름으로 입력해주세요."
          onChange={handleSearchInputChange}
          className="w-[97%] h-[35px] border-blue-500 border rounded-2xl px-2"
        />
        <button className="absolute right-[3%]" onClick={searchDrugs}>
          <img
            src={SearchIcon}
            alt="검색"
            className="w-[100%] h-[2.5vh] mt-0.5"
          />
        </button>
        {showDropdown && autoCompleteData.length > 0 && (
          <ul className="absolute top-10 w-[97%] bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
            {autoCompleteData.map((medicine, index) => (
              <li
                key={index}
                onClick={() => handleDropdownClick(medicine)}
                className="cursor-pointer px-4 py-2 hover:bg-blue-50"
              >
                {medicine}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-[100%] mt-[20px] ml-5 mb-2">
        <span>검색 결과</span>
        <span className="text-red-600 ml-2">{countDrug}</span>
      </div>

      {searchedDrugData && (
        <div>
          <div className="w-full h-[66vh] overflow-x-auto">
            <table className="bg-white border min-w-full">
              <thead>
                <tr>
                  <th
                    className="py-2 border-b text-center align-middle"
                    style={{ minWidth: '110px' }}
                  >
                    식별/포장
                  </th>
                  <th
                    className="py-2 border-b text-center align-middle"
                    style={{ minWidth: '300px' }}
                  >
                    제품명
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchedDrugData.map((drug, index) => (
                  <tr
                    key={index}
                    ref={(el) => (checkedBgRefs.current[index] = el)}
                    className="text-center hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleCheckboxChange(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td
                      className="px-6 border-b align-middle"
                      style={{ paddingTop: '20px', paddingBottom: '20px' }}
                    >
                      {drug.imageUrl ? (
                        <img
                          src={drug.imageUrl}
                          alt={drug.name}
                          className="w-12 h-12 object-cover mx-auto"
                        />
                      ) : (
                        <div className="ml-5">
                          <PillNextText />
                        </div>
                      )}
                    </td>
                    <td
                      className="px-2 border-b align-middle"
                      style={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-all',
                      }}
                    >
                      {drug.name}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="hidden"
                        value={JSON.stringify(drug)}
                        ref={(element) =>
                          (checkboxRefs.current[index] = element)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-[100%] h-[8vh] flex flex-col justify-center">
            <SaveBtn className="m-auto h-[35px] w-[50%]" onClick={saveDrug}>
              저장하기
            </SaveBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default PillSearch;
