import React, { useContext, useEffect, useRef, useState } from 'react';
import CustomHr from '../CustomHr';
import RegisterIcon from '../../assets/register/Register3.png';
import QR from '../../assets/register/QRImg.png';
import BackBtn from './button/BackBtn';
import Loading from '../ocrLoading';
import { useNavigate } from 'react-router';
import { RegisterContext } from '../../context/RegisterContext';
import { submitOcrFile } from '../../service/submitOcrFile';
import { qrCreateService } from '../../service/qr';

const DirectScan: React.FC = () => {
  const navigate = useNavigate();
  const { setOCRData, imgURL, setImgURL } = useContext(RegisterContext); // 상태관리에서 필요한 부분만 추출
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 업로드(input 태그에 hidden 적용 후 안 보이게 한 후 간접적으로 이용)를 위해 사용
  const [loading, setLoading] = useState<boolean>(false);
  const [qrURL, setQrURL] = useState<string>('');

  const Base64Img = (base64: string) => {
    return `data:image/png;base64,${base64}`;
  };

  const toggleLoading = () => {
    setLoading((prev) => !prev); // 로딩 상태를 토글
  };

  const preventDragOver = (e: React.DragEvent) => {
    // 파일 드랍을 하기 전 사진을 위에 올리는 과정에서 기본 이벤트가 생기는 현상 방지용
    e.preventDefault();
    e.stopPropagation();
  };

  const dropFile = async (e: React.DragEvent) => {
    // 파일 드랍 시 이미지 업로드 로직
    e.preventDefault();
    e.stopPropagation(); // 기본적인 동작 억제
    const OCRImgFile = e.dataTransfer.files; // 드랍된 파일 받기
    console.log('asd');
    if (OCRImgFile.length > 0) {
      if (fileInputRef.current) {
        fileInputRef.current.files = OCRImgFile; // 위에 설정한 hidden 처리한 input에 있는 current에 이미지 삽입
        const formData = new FormData(); // 백엔드에서 요청 데이터 형식
        console.log(OCRImgFile[0]);
        formData.append('file', OCRImgFile[0]);
        // console.log(formData.get('file'));
        // console.log('asd');
        // formData.append('file', OCRImgFile[0]);
        // formData.append('member_id', '12345');
        toggleLoading(); // 로딩 시작
        try {
          const data = await submitOcrFile(formData); // OCR 사진을 서버로 보낸 후 리턴 값 기다리기
          setOCRData({
            drugName: data.drugName,
            intakeStart: data.intakeStart,
            intakeEnd: data.intakeEnd,
            intakeCycle: data.intakeCycle,
            hospital: data.hospital[0],
            disease: data.disease,
          });

          const reader = new FileReader(); // URL 생성을 위한 FileReader 생성
          reader.onload = async function (event) {
            const imageUrl = event.target?.result as string;
            console.log(imageUrl);
            await setImgURL(imageUrl);
          };
          reader.readAsDataURL(fileInputRef.current.files[0]);

          // 로딩 종료는 imageUrl 설정 후에 해야 합니다
          await new Promise<void>((resolve) => {
            reader.onloadend = () => resolve();
          });
        } catch (error) {
          console.error('Error:', error);
        } finally {
          toggleLoading(); // 로딩 종료
        }
      }
    }
  };

  const handleCreateQr = async () => {
    const response = await qrCreateService();
    console.log(response.data.qrCode);
  };
  useEffect(() => {
    // imgURL 상태가 변경될 때마다 리다이렉트
    if (imgURL) {
      console.log('Data response OK, redirecting...');
      navigate('/scan-confirm');
    }
  }, [imgURL, navigate]);

  useEffect(() => {
    // qrCreateService가 비동기 함수라고 가정
    const fetchUrl = async () => {
      const base64Url = await qrCreateService(); // 비동기 호출
      const data = Base64Img(base64Url);
      console.log(data);
      setQrURL(data);
    };
    fetchUrl();
  }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }
  return (
    <div className="relative">
      <BackBtn text="약봉투 등록하기" />
      <div className="min-h-[83vh] flex flex-col justify-center items-center overflow-hidden text-center">
        {/* 최상단 < 약봉투 등록하기 */}
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

        <CustomHr />
        <div
          className="w-full flex justify-center items-center h-[32vh] text-[0.9rem] flex-col"
          onClick={handleCreateQr}
        >
          <img src={qrURL} className="w-[50vh] h-[30vh]" />
          <div className="w-[80%] text-center bg-[#D9D9D9] rounded-[20px] text-[0.9rem] p-[0.2rem]">
            휴대폰으로 QR 코드를 인식한 후 약 봉투를 스캔해주세요
          </div>
        </div>
      </div>
      {!loading ? null : <Loading></Loading>};
    </div>
  );
};

export default DirectScan;
