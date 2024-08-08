import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignup } from '../../context/SignupContext';

interface SignupData {
  name: string;
  birthdate: string;
  gender: string;
}

function SignupForm2() {
  const { register, handleSubmit, setValue } = useForm();
  const { signupData, setSignupData } = useSignup();
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (signupData.id) setValue('id', signupData.id);
    if (signupData.password) setValue('password', signupData.password);
  }, [signupData, setValue]);

  /* const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setSelectedGender(name);
  }; */
  const onClickGender = (gender: string) => {
    setSignupData((prevData) => ({
      ...prevData,
      gender,
    }));
    setSelectedGender(gender);
  };

  const onSubmit = async (data: SignupData) => {
    try {
      const finalSignupData = {
        ...signupData,
        name: data.name,
        gender: signupData.gender,
        birthdate: data.birthdate,
      };

      console.log('Sending data to backend:', finalSignupData);

      const response = await axios.post(
        'http://localhost:8080/api/v1/members/signup',
        finalSignupData,
      );

      console.log(response.data);
      setSignupSuccess(true);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message || '회원가입에 실패했습니다.',
        );
      } else {
        setErrorMessage('회원가입 중 오류가 발생했습니다.');
      }
      console.log('Error:', error); // Log the error for debugging
    }
  };

  const inputBrith = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/-/g, '');
    let formattedValue = input;
    if (input.length > 4) {
      formattedValue = `${input.slice(0, 4)}-${input.slice(4, 6)}`;
    }
    if (input.length > 6) {
      formattedValue = `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6, 8)}`;
    }
    setValue('birthdate', formattedValue);
    console.log(formattedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="name"
        >
          이름
        </label>

        <div className="flex justify-center">
          <input
            id="name"
            type="text"
            {...register('name', { required: '이름을 입력해주세요.' })}
            className="w-[85%] h-[3vh] shadow appearance-none  border border-black rounded py-2 p-1"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="gender"
        >
          성별
        </label>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => onClickGender('M')}
            className={`w-[40%] h-[3vh] border border-black text-black py-2 px-4 rounded ${selectedGender === 'M' ? 'bg-blue-400' : 'hover:bg-blue-200'}`}
          >
            남자
          </button>
          <button
            type="button"
            onClick={() => onClickGender('F')}
            className={`w-[40%] h-[3vh] border border-black text-black py-2 px-4 rounded ${selectedGender === 'F' ? 'bg-pink-400' : 'hover:bg-pink-200'}`}
          >
            여자
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="birthdate"
        >
          생년월일
        </label>
        <div className="flex justify-center">
          <input
            id="birthdate"
            type="text"
            {...register('birthdate', { required: '생년월일을 입력해주세요.' })}
            placeholder="'YYYYMMDD' 8자리로 입력해주세요"
            onChange={inputBrith}
            className="w-[85%] h-[3vh] shadow appearance-none  border border-black rounded py-2 mb-6 p-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-5">
        <button
          type="submit"
          className="w-[85%] h-[3vh] justify-center bg-[#C4DDF7] hover:bg-blue-200 text-black font-extrabold py-2.5 px-4 rounded-lg"
        >
          가입하기
        </button>
      </div>

      {signupSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">회원가입을 완료했습니다!</strong>
        </div>
      )}
    </form>
  );
}

export default SignupForm2;
