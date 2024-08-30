import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { loginUser, LoginData } from '../../service/login';
import { setCookie } from '../../utils/cookie';

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  // 로그인 후 토큰 저장
  const onSubmit = async (data: LoginData) => {
    try {
      const responseData = await loginUser(data);

      // if (responseData.token) {
      //   localStorage.setItem('authToken', responseData.token);
      //   console.log('Token stored:', responseData.token); // 저장된 토큰 확인
      // }

      // if (responseData.status === 'OK' && responseData.data) {
      //   const { name } = responseData.data; // name 속성을 data에서 추출
      //   const token = responseData.token;

      if (responseData.status === 'OK' && responseData.data) {
        setCookie('name', responseData.data.name, 30); //JSESSION 유효시간 30분과 동일 하게 맞춤.
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('로그인 중 오류가 발생했습니다.');
      console.log('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="email"
        >
          아이디
        </label>

        <div className="flex justify-center">
          <input
            id="email"
            type="text"
            {...register('email')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2 p-1"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="password"
        >
          비밀번호
        </label>
        <div className="relative flex justify-center">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2 mb-6 p-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[10%] top-1/3 transform -translate-y-1/2"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mb-5">
        <button
          type="submit"
          className="w-[85%] h-[3vh] justify-center bg-[#C4DDF7] hover:bg-blue-200 text-black font-extrabold py-2.5 px-4 rounded-lg"
        >
          로그인
        </button>
      </div>
      <div className="flex items-center justify-center mb-4">
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="w-[85%] h-[3vh] bg-[#C4DDF7] hover:bg-blue-200 text-black font-bold py-2.5 px-4 rounded-lg"
        >
          회원가입
        </button>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-xs mt-3 pl-[3vh]">{errorMessage}</div>
      )}
    </form>
  );
}

export default LoginForm;
