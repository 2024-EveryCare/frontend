import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SignupData {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  birthdate: string;
}

interface SignupContextProps {
  signupData: SignupData;
  setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
}

const SignupContext = createContext<SignupContextProps | undefined>(undefined);

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
    password_confirm: '',
    name: '',
    birthdate: '',
  });

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};
