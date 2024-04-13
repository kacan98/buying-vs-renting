import { LineChart } from "@mui/x-charts";
import {BuyingDetails} from "../../helpers/buying/buying.model.ts"

function BuyingChart({graphData}: {graphData: BuyingDetails['monthValueChanges'] }) {
  const keyToLabel: { [key: string]: string } = {
    interestPaidThisMonth: "Interest Paid This Month",
    principalPaidThisMonth: "Principal Paid This Month",
    increaseInPropertyValue: "Increase In Property Value",
    monthlyOwnershipCost: "Monthly Ownership Cost",
    buyingCosts: "Buying Costs",
    sellingCosts: "Selling Costs",
  };

  const stackStrategy = {
    // stack: 'total',
    // area: true,
    stackOffset: "none", // To stack 0 on top of others
  } as const;

  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: "descending",
  };

  return (
    <LineChart
      xAxis={[
        {
          dataKey: "month",
          valueFormatter: (value) => value.toString(),
          min: 0,
          max: graphData.length,
        },
      ]}
      series={Object.keys(keyToLabel).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        showMark: false,
        ...stackStrategy,
      }))}
      dataset={graphData.map((data, index) => ({
        ...data,
        month: index + 1,
      }))}
      {...customize}
    />
  );
}

export default BuyingChart;
