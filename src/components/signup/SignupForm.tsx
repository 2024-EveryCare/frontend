import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../context/SignupContext';

interface SignupData {
  email: string;
  emailOption: string;
  password: string;
  // password_confirm: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<SignupData>();

  const navigate = useNavigate();
  const { setSignupData } = useSignup();
  const [emailOptions, setEmailOptions] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setValue('email', email);

    if (email.length > 0) {
      const options = [
        `${email}@naver.com`,
        `${email}@gmail.com`,
        `${email}@daum.net`,
        `${email}@hanmail.net`,
      ];
      setEmailOptions(options);
    } else {
      setEmailOptions([]);
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailOptionClick = (option: string) => {
    setValue('email', option);
    setEmailOptions([]);
  };

  const onSubmit = async (data: SignupData) => {
    setErrorMessage(null);

    if (!validatePassword(data.password)) {
      setError('password', {
        type: 'manual',
        message: '비밀번호는 8자 이상, 영어, 숫자, 특수문자를 포함해야 합니다.',
      });
      return;
    }

    /* if (data.password !== data.password_confirm) {
      setError('password_confirm', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    } else {
      clearErrors('password_confirm');
    } */

    setSignupData((prevData) => ({
      ...prevData,
      email: data.email,
      password: data.password,
    }));

    navigate('/signup2');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="email"
        >
          아이디
        </label>

        <div className="flex justify-center relative">
          <input
            id="email"
            type="text"
            {...register('email', { required: '아이디를 입력해주세요.' })}
            placeholder="이메일 형식으로 작성해주세요."
            onChange={handleIdChange}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2 p-1"
          />

          {emailOptions.length > 0 && (
            <ul className="absolute top-full w-[85%] shadow appearance-none border border-black rounded py-2 bg-white z-10">
              {emailOptions.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-blue-200"
                  onClick={() => handleEmailOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="password"
        >
          비밀번호
        </label>
        <div className="relative flex justify-center w-[85%] h-[3vh] shadow appearance-none border border-black rounded mx-auto p-1">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full h-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-3 pl-[3vh]">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[3vh] mb-2"
          htmlFor="password_confirm"
        >
          비밀번호 확인
        </label>
        <div className="relative flex justify-center w-[85%] h-[3vh] shadow appearance-none border border-black rounded mx-auto p-1">
          <input
            id="password_confirm"
            type={showPassword ? 'text' : 'password'}
            {...register('password_confirm')}
            className="w-full h-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password_confirm && (
          <p className="text-red-500 text-xs mt-3 pl-[3vh]">
            {errors.password_confirm.message}
          </p>
        )}
      </div> */}

      <div className="flex items-center justify-center mb-5">
        <button
          type="submit"
          className="w-[85%] h-[3vh] justify-center bg-[#C4DDF7] hover:bg-blue-200 text-black font-extrabold py-2.5 px-4 rounded-lg"
        >
          다음
        </button>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-xs mt-3 pl-[3vh]">{errorMessage}</div>
      )}
    </form>
  );
}

export default SignupForm;
