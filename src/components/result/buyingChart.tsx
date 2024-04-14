import { LineChart } from "@mui/x-charts";
import { PeriodValueChange } from "../../services/buying/buying.model.ts";

function BuyingChart({ graphData }: { graphData: PeriodValueChange[] }) {
  if (graphData.length === 0) return <></>;
  const labelObjects = (
    Object.keys(graphData[0]) as (keyof PeriodValueChange)[]
  ).reduce(
    (sum, key) => {
      if (!isNegativeFc(key)) return sum;

      const label = {
        id: key,
        label: labelNameMap[key],
        data: graphData.map((data) => {
          return data[key];
        }),
        stack: "total",
        area: true,
        showMark: false,
      };
      sum.push(label);
      return sum;
    },
    [] as {
      id: string;
      label: string;
      data: number[];
      stack: string;
      area: boolean;
      showMark: boolean;
    }[],
  );

  const customize = {
    height: 250,
    legend: { hidden: true },
    margin: { top: 5 },
  };

  const years: number[] = graphData.map((_, index) => {
    const year = new Date(
      new Date().setFullYear(new Date().getFullYear() + index),
    );
    return year.getFullYear();
  });

  if (graphData.length === 0) return <></>;
  return (
    <LineChart
      xAxis={[
        {
          valueFormatter: (value) => value.toString(),
          data: years,
        },
      ]}
      series={labelObjects}
      {...customize}
    />
  );
}

export default BuyingChart;

const isNegativeFc = (key: keyof PeriodValueChange) => {
  switch (key) {
    case "interestPaid":
    case "ownershipCost":
    case "buyingCosts":
    case "sellingCosts":
    case "principalPaid":
      return true;
    case "increaseInPropertyValue":
      return false;
    default:
      throw new Error("Invalid key");
  }
};

const labelNameMap = {
  interestPaid: "Interest paid",
  principalPaid: "Principal paid",
  increaseInPropertyValue: "Increase in property value",
  ownershipCost: "Ownership cost",
  buyingCosts: "Buying costs",
  sellingCosts: "Selling costs",
};
