import React, { useContext, useEffect, useRef, useState } from 'react';
import SearchIcon from '../../assets/SearchIc.png';
import axios from 'axios';
import { RegisterContext } from '../../context/RegisterContext';
import { useNavigate } from 'react-router';
import PillNextText from '../register/PillNextText';
import { pillSearch } from '../../service/pillInfoSearch';

const PillInfoSearch: React.FC = () => {
  const navigate = useNavigate();

  interface DrugData {
    drugName: string;
    imageUrl: string;
    name: string;
    mainIngredient: string;
    companyName: string;
    classification: string;
    check: boolean;
  }

  const { savedDrug, setSavedDrug } = useContext(RegisterContext);
  const [searchedDrugData, setSearchedDrugData] = useState<DrugData[] | null>(
    null,
  );
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [countDrug, setCountDrug] = useState<number>(0); // countDrug 타입 추가
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]); // checkboxRefs 수정
  const checkedBgRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchData = e.target.value;
    setSearchInputValue(searchData);

    if (searchData.length >= 2) {
      console.log('자동 완성 검색어:', searchData);

      const data = await pillSearch(searchData);
      setAutoCompleteData(data);
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
    // 토글 기능만 하는 함수
    if (checkboxRefs.current[index]) {
      console.log(checkboxRefs.current[index]?.value);
      if (checkboxRefs.current[index]!.checked == true) {
        //체크박스가 선택이 안되어 있다면 -> 선택을 한 후 -> 배경색, 선택되어진 약 저장하는 함수로 이동
        checkboxRefs.current[index]!.checked =
          !checkboxRefs.current[index]!.checked; // checked 토글 역할
        handleCheckboxBgChange(index);
      } else if (checkboxRefs.current[index]!.checked == false) {
        console.log('선택됌.');

        checkboxRefs.current[index]!.checked =
          !checkboxRefs.current[index]!.checked; // checked 토글 역할
        handleCheckboxBgChange2(index);
      }
    }
  };

  const handleCheckboxBgChange = (index: number) => {
    // 선택 해제 모드
    console.log(checkedBgRefs.current[index]);
    checkedBgRefs.current[index]?.classList.remove('bg-blue-100');
    const drug = checkboxRefs.current[index]!.value; // 삭제 할 약의 값
    const { drugCode } = JSON.parse(drug); // 문자열로 바꾼후, 재구조화를 통해서 drugCode만 추출.
    console.log('drugCode:', drugCode);
    const temp = savedDrug.filter(
      (drugData: DrugData) => drugData.drugCode != drugCode,
    ); // 지우려는 데이터를 뺀 나머지 항목을 다시 저장
    setSavedDrug(temp);
  };

  const handleCheckboxBgChange2 = (index: number) => {
    // 선택 모드
    console.log(checkedBgRefs.current[index]);
    checkedBgRefs.current[index]?.classList.add('bg-blue-100');
    const temp = checkboxRefs.current[index]?.value; //json형식으로 파싱되어 있는 value값을 받아옴
    const drug = JSON.parse(temp); // input값의 객체를 원래 DrugData객체로 다시 파싱해줌.
    // setSavedDrug(...savedDrug, drug);
    setSavedDrug((preSavedDrug: DrugData) => [...preSavedDrug, drug]);
  };

  useEffect(() => {
    if (searchedDrugData) {
      setCountDrug(searchedDrugData.length); // 검색된 약데이터의 길이로 count 설정
    } else {
      setCountDrug(0);
    }
  }, [searchedDrugData]);

  const searchDrug = () => {
    setShowDropdown(false);
    if (searchInputValue.trim() === '') {
      alert('검색어를 입력해 주세요!');
      return;
    }
    console.log('기존 약 내용', savedDrug);
    const updatedDrugs = [...savedDrug]; // 기존 저장된 약 데이터 복사
    for (let i = 0; i < checkboxRefs.current.length; i++) {
      const temp = checkboxRefs.current[i]?.checked;
      if (temp === true) {
        const item = checkboxRefs.current[i]?.value;
        const drug = JSON.parse(item); // JSON 문자열을 객체로 변환

        // 이미 있는지 확인
        const exists = updatedDrugs.some(
          (savedDrug) => savedDrug.drugCode === drug.drugCode,
        );
        if (!exists) {
          updatedDrugs.push(drug); // 새로운 약 데이터 추가
        }

        handleCheckboxChange(i); // 체크박스 상태 변경
      }
    }

    setSavedDrug(updatedDrugs); // 한 번에 상태 업데이트

    axios
      .get(`https://www.everycare.site/api/v1/medicines/find-drug-info`, {
        params: { drugName: searchInputValue },
      })
      .then((response) => {
        const data = response.data;
        console.log('서버 응답 data : ', data);
        setSearchedDrugData(response.data.data || []);
      })
      .catch((error) =>
        console.error('서버로 데이터를 보내는데 실패했습니다:', error),
      );
  };

  const handleProductClick = (drug: DrugData) => {
    navigate(`/pill-detail-search/${encodeURIComponent(drug.name)}`, {
      state: { drugName: drug.name, imageUrl: drug.imageUrl },
    });
  };

  return (
    <div className="h-[88vh] mb-20">
      <div className="relative flex justify-center mt-4">
        <input
          type="text"
          placeholder="약 이름으로 입력해주세요."
          value={searchInputValue}
          onChange={handleSearchInputChange}
          className="w-[97%] h-[35px] border-blue-500 border rounded-2xl px-2"
        />
        <button className="absolute right-[3%]" onClick={searchDrug}>
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
                onClick={() => handleDropdownClick(medicine.name)}
                className="cursor-pointer px-4 py-2 hover:bg-blue-50"
              >
                {medicine.name}
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
        <div className="w-full h-[79vh] overflow-x-scroll overflow-y-scroll scrollbar-custom">
          <table className="bg-white border min-w-full">
            <thead>
              <tr>
                <th
                  className="py-2 border-b text-center align-middle"
                  style={{ minWidth: '130px' }}
                >
                  식별/포장
                </th>
                <th
                  className="py-2 border-b text-center align-middle"
                  style={{ minWidth: '200px' }}
                >
                  제품명
                </th>
                <th
                  className="py-2 border-b text-center align-middle"
                  style={{ minWidth: '150px' }}
                >
                  성분/함량
                </th>
                <th className="py-2 border-b text-center align-middle">
                  회사명
                </th>
                <th className="py-2 border-b text-center align-middle">구분</th>
              </tr>
            </thead>
            <tbody>
              {searchedDrugData.map((drug, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleProductClick(drug)}
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
                  <td
                    className="py-2 px-2 border-b align-middle"
                    style={{
                      whiteSpace: 'normal',
                      wordBreak: 'break-all',
                    }}
                  >
                    {drug.mainIngredient}
                  </td>
                  <td
                    className="py-2 px-3 border-b align-middle"
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {drug.companyName}
                  </td>
                  <td
                    className="py-2 px-6 border-b align-middle"
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {drug.classification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PillInfoSearch;
