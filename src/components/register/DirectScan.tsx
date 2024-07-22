import React, { useContext, useEffect, useRef } from 'react';
import CustomHr from '../CustomHr';
import RegisterIcon from '../../assets/register/Register3.png';
import QR from '../../assets/register/QRImg.png';
import BackBtn from './button/BackBtn';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  RegisterContext,
  RegisterContextProvider,
} from '../../context/RegisterContext';
import { submitOcrFile } from '../../service/submitOcrFile';

const DirectScan: React.FC = () => {
  const nevigate = useNavigate();

  const { setOCRData, imgURL, setImgURL } = useContext(RegisterContext); //상태관리에서 필요한 부분만 추출
  //setOCRData => 처방전을 올리고 서버에서 값을 받으면 저장 후 다른 페이지 랜더링에 쓰일 예정
  //imgURL => 사진 url추출 후 다른 페이지에서 랜더링 후 보여 줄 예정.
  const fileInputRef = useRef<HTMLInputElement>(null); //파일 업로드(input태그에 hidden적용 후 안보이게 한 후 간접적으로 이용)를 위해 쓰임

  const preventDragOver = (e: React.DragEvent) => {
    //파일 드랍을 하기 전 사진을 위에 올리는 과정에서 기본 이벤트가 생기는 현상 방지용.
    console.log('드레그 오버 이벤트 제한');
    e.preventDefault();
    e.stopPropagation();
  };

  const dropFile = async (e: React.DragEvent) => {
    //파일 드랍시 이미지 업로드 로직
    // 파일을 드레그 후 드랍할때 발생하는 함수.
    e.preventDefault();
    e.stopPropagation(); // 기본적인 동작 억제. 이게 없다면 이미지가 "새창"으로 생기는 불상사 발생.
    const OCRImgFile = e.dataTransfer.files; //드랍 된 파일 받기
    if (OCRImgFile.length > 0) {
      //파일이 있다면
      if (fileInputRef.current) {
        fileInputRef.current.files = OCRImgFile; // 위에 설정한 hidden 처리 한 input에 있는 current에 이미지 삽입.(input태그를 숨겨서 이렇게 넣어줌)
        const formData = new FormData(); //백엔드에서 요청 데이터 형식. FormData 객체.
        formData.append('OCRImg', fileInputRef.current.files[0]);
        console.log(formData);
        try {
          const data = await submitOcrFile(formData); //ocr 사진을 서버로 보낸 후 리턴 값 기다리기.
          //submitOcrFile은 service 디렉터리에 있음.
          setOCRData({
            drugName: data.drugName,
            intakeStart: data.intakeStart,
            intakeEnd: data.intakeEnd,
            intakeCycle: data.intakeCycle,
            hospital: data.hospital,
            disease: data.disease,
          });
          const reader = new FileReader(); //url 생성을 위한 FileReader생성
          reader.onload = async function (event) {
            //이미지가 로드 될때까지 기다림.
            const imageUrl = event.target.result;
            console.log('이미지 데이터 URL:', imageUrl);
            await setImgURL(imageUrl);
          };
          reader.readAsDataURL(fileInputRef.current.files[0]);
          console.log('서버로 부터 응답... data : ', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };

  useEffect(() => {
    //로컬에서 테스트 용으로 사진 업로드 시 바로 넘어가도록 하는 역할 도커 실핼 후 주석처리 요망.
    if (imgURL) {
      console.log('Data response OK, redirecting...');
      nevigate('/scan-confirm');
    }
  }, [imgURL, nevigate]);
  return (
    <>
      <BackBtn text="약봉투 등록하기"></BackBtn>
      <div className="min-h-[83vh] flex flex-col justify-center items-center overflow-hidden text-center">
        {/* //최상단 < 약봉투 등록하기 */}
        <div
          onDrop={dropFile}
          onDragOver={preventDragOver}
          className="w-[90%] h-[23vh] flex justify-center items-center bg-[#F5F5F5] border border-dashed border-black rounded-[10px] text-[0.9rem] mt-0 mb-[2vh]"
        >
          <img src={RegisterIcon} className="w-[10vh] h-[10vh] inline-block" />
          <input
            onChange={(e) => console.log(e.target.files)}
            style={{ display: 'none' }}
            accept="image/*"
            type="file"
            ref={fileInputRef}
          />
          <p>이곳에 이미지를 드래그하거나 파일을 업로드 하세요</p>
        </div>

        <CustomHr></CustomHr>
        <div className="w-full flex justify-center items-center h-[32vh] text-[0.9rem] flex-col">
          <img src={QR} className="w-[50vh] h-[30vh]" />
          <div
            style={{
              width: '80%',
              textAlign: 'center',
              backgroundColor: '#D9D9D9',
              borderRadius: '20px',
              fontSize: '0.9rem',
              padding: '0.2rem',

              //맨 하단 코멘트 스타일 및 코멘트 박스 스타일
            }}
          >
            휴대폰으로 qr코드를 인식한 후 약 봉투를 스캔해주세요
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectScan;
