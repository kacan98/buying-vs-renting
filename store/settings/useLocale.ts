import { useSelector } from "react-redux";
import { RootState } from "../index.ts";

export function useLocaleCurrencyFormatter(): (value: number) => string {
  const locale = useSelector((state: RootState) => state.settings.locale);
  const currency = useSelector((state: RootState) => state.settings.currency);

  if (!locale || !currency) {
    throw new Error("Locale or currency not set");
  }

  return (value: number) => {
    return value.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  };
}
