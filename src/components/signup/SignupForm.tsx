import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const fakeData = {
        id: data.id,
        password: data.password,
      };

      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        fakeData,
      );

      console.log(response.data);

      navigate('/signup2');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[2vh] mb-2"
          htmlFor="id"
        >
          아이디
        </label>

        <div className="flex justify-center">
          <input
            id="id"
            type="text"
            {...register('id')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[2vh] mb-2"
          htmlFor="password"
        >
          비밀번호
        </label>
        <div className="flex justify-center">
          <input
            id="password"
            type="text"
            {...register('password')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-black text-sm font-bold pl-[2vh] mb-2"
          htmlFor="password"
        >
          비밀번호 확인
        </label>
        <div className="flex justify-center">
          <input
            id="password"
            type="text"
            {...register('password')}
            className="w-[85%] h-[3vh] shadow appearance-none border border-black rounded py-2 mb-6"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-5">
        <button
          type="submit"
          className="w-[85%] h-[3vh] justify-center bg-[#C4DDF7] hover:bg-blue-200 text-black font-extrabold py-2.5 px-4 rounded-lg"
        >
          다음
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
