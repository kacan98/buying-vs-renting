import { setBuyingValue } from "./buying";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../index";
import React from "react";
import { setRentingValue } from "./renting.ts";
import { setFuturePredictionsValue } from "./futurePreditions.ts";

const createAction = {
  buying: setBuyingValue,
  renting: setRentingValue,
  futurePredictions: setFuturePredictionsValue,
};

export default function useCalculatorSlice<T extends keyof RootState>(
  sliceName: T,
) {
  const stateSlice: RootState[T] = useSelector(
    (state: RootState) => state[sliceName],
  );
  const dispatch = useDispatch();

  /**
   * Only works for floats for now
   * */
  const createFloatStateUpdateFc = (fieldName: keyof RootState[T]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const action = createAction[sliceName];
      const value = parseFloat(e.target.value || "");
      dispatch(
        action({
          key: fieldName,
          value: value,
        } as never),
      );
    };
  };

  return {
    stateSlice,
    createStateUpdateFc: createFloatStateUpdateFc,
    dispatch,
  };
}
