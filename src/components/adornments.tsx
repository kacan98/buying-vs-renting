import {InputAdornment} from "@mui/material"

type getAdornmentProps = {
  startAdornment: string
  endAdornment: string
}

export function getInputProps ({startAdornment, endAdornment}: getAdornmentProps): {
  endAdornment?: JSX.Element;
  startAdornment?: JSX.Element;
} {
  const getAdornment = (adornment: string, position: 'end' | 'start') => (<InputAdornment position={position}>
    {adornment}
  </InputAdornment>)
  
  return {
    startAdornment: startAdornment ? getAdornment(startAdornment, 'start') : undefined,
    endAdornment: endAdornment ? getAdornment(endAdornment, 'end') : undefined,
  }
}

export function getPercentageAdornment(perYear=false){
  return getInputProps({
  endAdornment: `%${perYear? ' per year': ''}`,
})
}