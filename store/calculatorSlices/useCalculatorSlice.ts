import { setBuyingValue } from "./buying";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import React from "react";
import { setRentingValue } from "./renting.ts";
import { setFuturePredictionsValue } from "./futurePreditions.ts";

export default function useCalculatorSlice<T extends keyof RootState>(
  sliceName: T,
) {
  const stateSlice: RootState[T] = useSelector(
    (state: RootState) => state[sliceName],
  );
  const dispatch = useDispatch();
  
  const createAction = {
    buying: setBuyingValue,
    renting: setRentingValue,
    futurePredictions: setFuturePredictionsValue,
  };
  
  const createStateUpdateFc =
    (fieldName: keyof RootState[T]) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const action = createAction[sliceName];
        const value = e.target.value || ""
        dispatch(
          action({
            key: fieldName as keyof RootState[T],
            value,
          }),
        );
      };
  
  return { stateSlice, createStateUpdateFc, dispatch };
}
