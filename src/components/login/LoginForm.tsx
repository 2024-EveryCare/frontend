import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface LoginData {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/members/login',
        data,
      );
      console.log(response.data);

      // 로그인 성공 시 토큰 저장 (예: localStorage 사용)
      // localStorage.setItem('token', response.data.token);

      login({ name: response.data.name }, response.data.token);

      navigate('/calendar');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message || '로그인에 실패했습니다.',
        );
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다.');
      }
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
        <div className="flex justify-center">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2 mb-6 p-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
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
