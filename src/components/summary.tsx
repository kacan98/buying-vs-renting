import {Typography} from "@mui/material"
import {useSelector} from "react-redux"
import {RootState} from "../../store"

function Summary() {
  const rentingState = useSelector((state: RootState) => state.renting);
  
  return (
    <>
    <Typography variant={'h5'}>
      Renting
    </Typography>
    <Typography variant={'body1'}>
      Monthly Rent: {rentingState.monthlyRent || 0}
    </Typography>
    </>
  )
}

export default Summary