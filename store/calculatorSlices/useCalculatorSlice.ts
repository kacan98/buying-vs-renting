import { useDispatch, useSelector } from "react-redux";
import { CalculatorState, RootState } from "../index";
import { setBuyingValue } from "./buying.ts";
import { setRentingValue } from "./renting.ts";
import { setFuturePredictionsValue } from "./futurePreditions.ts";

const createAction = {
  buying: setBuyingValue,
  renting: setRentingValue,
  futurePredictions: setFuturePredictionsValue,
};

export default function useCalculatorSlice<T extends keyof CalculatorState>(
  sliceName: T,
) {
  const stateSlice: CalculatorState[T] = useSelector(
    (state: RootState) => state.calculator[sliceName],
  );

  const createFloatStateUpdateFc = (fieldName: keyof CalculatorState[T]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      // @ts-expect-error - this is a hack to get around the fact that the type of the action is not known at compile time
      const action = createAction[sliceName];
      const value = parseFloat(e.target.value || "0");
      dispatch(
        action({
          key: fieldName,
          value: value,
        } as never),
      );
    };
  };
  const dispatch = useDispatch();

  return {
    stateSlice,
    createStateUpdateFc: createFloatStateUpdateFc,
    dispatch,
  };
}
