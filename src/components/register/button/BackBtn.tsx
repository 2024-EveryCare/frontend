import React from 'react';
import { useNavigate } from 'react-router';

const BackBtn: React.FC = ({ text }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        paddingLeft: '1rem',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginTop: '3%',
      }}
    >
      <button onClick={handleBackClick} className="p-2">
        {' '}
        &lt;{' '}
      </button>
      <span className="p-1">{text}</span>
    </div>
  );
};

export default BackBtn;
