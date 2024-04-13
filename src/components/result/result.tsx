import {Box, Typography} from "@mui/material"
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FuturePredictionsState } from "../../../store/calculatorSlices/futurePreditions.ts";
import { RentingState } from "../../../store/calculatorSlices/renting.ts";
import { BuyingState } from "../../../store/calculatorSlices/buying.ts";
import ResultBlock, { ResultBlockProps } from "./resultBlock.tsx";
import BuyingChart from "./buyingChart.tsx";
import { calculateRent } from "../../services/renting/renting.service.ts";
import { calculateMortgageDetails } from "../../services/buying/buying.service.ts";
import {toLocaleCurrencyString} from "../../helpers/financialFcs.ts"

function Result() {
  const { monthlyRent, yearlyRentGrowth, initialInvestment }: RentingState =
    useSelector((state: RootState) => state.renting);
  const { yearsStaying, propertyValueGrowth }: FuturePredictionsState =
    useSelector((state: RootState) => state.futurePredictions);

  const {
    propertyPrice,
    deposit,
    yearlyOwnershipCost,
    loanTerm,
    interestRate,
    buyingCostsPercentage,
    sellingCostsPercentage,
  }: BuyingState = useSelector((state: RootState) => state.buying);

  const {
    totalInterestPaid,
    remainingBalance,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    buyingCost,
    sellingCost,
    totalBuying,
  } = calculateMortgageDetails({
    yearsStaying,
    initialPropertyValue: propertyPrice,
    deposit,
    yearlyOwnershipCost,
    loanTerm,
    interestRate,
    propertyValueGrowth: propertyValueGrowth,
    buyingCostsPercentage,
    sellingCostsPercentage,
  });
  
  const rentTotal = calculateRent({
    startingMonthlyRent: monthlyRent,
    increaseRate: yearlyRentGrowth / 100,
    yearsStaying,
  })
  
  const totalRenting = - (rentTotal + initialInvestment) + initialInvestment;
  const rentingRows: ResultBlockProps["rows"] = [
    { label: "Deposit", value: -1 * initialInvestment },
    {
      label: "Rent",
      value:
        -1 * rentTotal
    },
    { label: "Deposit returned", value: initialInvestment },
    'divider',
    { label: "Total", value: totalRenting },
  ];
  
  const mortgageDetails: ResultBlockProps["rows"] = [
    { label: "Remaining debt at the end", value: -1 * remainingBalance },
  ]
  
  const buyingAndSellingDetails: ResultBlockProps["rows"] = [
    { label: "Buying costs", value: -1 * buyingCost },
    { label: "Selling costs", value: -1 * sellingCost },
  ]
  
  const capitalFromSaleDetails: ResultBlockProps["rows"] = [
    { label: "Deposit", value: -1 * deposit },
    { label: "Remaining debt", value: -1 * remainingBalance },
    { label: "Total interest paid", value: -1 * totalInterestPaid },
    { label: "Original property value", value: propertyPrice },
    { label: "Total property value increase", value: totalPropertyValueIncrease },
  ]
  
  //TODO: this should probably be generalized for all tooltips
  const capitalFromSale =  propertyPrice + totalPropertyValueIncrease  - deposit - remainingBalance - totalInterestPaid

  const buyingRows: ResultBlockProps["rows"] = [
    { label: "Interest on mortgage paid", value: - totalInterestPaid, tooltip: <ResultBlock rows={mortgageDetails} heading={'Mortgage details:'}/>},
    { label: "Buying and selling costs", value: -1 * (buyingCost + sellingCost), tooltip: <ResultBlock rows={buyingAndSellingDetails} heading={'Buying and selling details:'}/> },
    { label: "Total ownership costs", value: -1 * totalOwnershipCosts, tooltip: <div>Simply ownership cost over the time of staying</div> },
    { label: "Capital from buying and selling", value: capitalFromSale, tooltip: <ResultBlock heading={'Capital from selling details'} rows={capitalFromSaleDetails} />},
    'divider',
    { label: "Total", value: totalBuying },
  ];

  const makeLabel = (label: "Renting" | "Buying", years: number) => {
    return `${label} for ${years} year${years != 1 ? "s" : ""}`;
  };
  
  const buyingIsBetter = totalBuying > totalRenting;
  const difference = buyingIsBetter ? totalRenting - totalBuying : totalBuying - totalRenting;
  
  const result = <Typography variant={'h3'} gutterBottom>
    {buyingIsBetter ? "Buying is better" : "Renting is better"}
    {` by ${toLocaleCurrencyString(Math.abs(difference))}`}
  </Typography>

  return (
    <Box
      sx={{
        textAlign: "left",
      }}
    >
      {result}
      <ResultBlock
        heading={makeLabel("Renting", yearsStaying)}
        rows={rentingRows}
      />
      <br/>
      <ResultBlock
        heading={makeLabel("Buying", yearsStaying)}
        rows={buyingRows}
      />
      <br/>
      <BuyingChart graphData={monthValueChanges} />
    </Box>
  );
}

export default Result;
