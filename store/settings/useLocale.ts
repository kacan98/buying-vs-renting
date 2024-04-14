import { useSelector } from "react-redux";
import { RootState } from "../index.ts";

export function useLocaleCurrencyFormatter(): (value: number) => string {
  const locale = useSelector((state: RootState) => state.settings.locale);
  const currency = useSelector((state: RootState) => state.settings.currency);

  return (value: number) => {
    return value.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  };
}
