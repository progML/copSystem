'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Loader from "components/Loader";
import { STORAGE_KEYS } from "constants/storage";
import Api from "services/api";
import { useMutation } from "@tanstack/react-query";

export interface ContextValues {
  headerText: string;
  isEntitled: boolean;
  setIsEntitled: (flag: boolean) => void;
  setHeaderText: (value: string) => void;
}

export const initialState: ContextValues = {
  headerText: "Тест",
  isEntitled: false,
  setIsEntitled: () => undefined,
  setHeaderText: () => undefined,
};

const AppContext = createContext<ContextValues>(initialState);
export const useAppContext = () => useContext(AppContext);

const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [isEntitled, setIsEntitled] = useState(initialState.isEntitled);
  const [headerText, setHeaderText] = useState(initialState.headerText);

  function handleVerificationSuccess() {
    setIsEntitled(true);
  }

  function handleVerificationError() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  const { mutate: verifyToken, isSuccess, isError } = useMutation({
    mutationKey: ['verifyToken'],
    mutationFn: Api.verifyToken,
    onError: handleVerificationError,
    onSuccess: handleVerificationSuccess,
  });

  useEffect(() => {
    Api.init();
    if (token) verifyToken();
  }, []);

  const contextValue = useMemo(
    () => ({
      isEntitled,
      setIsEntitled,
      headerText,
      setHeaderText
    }),
    [isEntitled, headerText]
  );

  return isSuccess || isError || !token ? (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  ) : (
    <Loader isCentered />
  );
}
