import {InputAdornment} from "@mui/material"

type getAdornmentProps = {
  position: 'start' | 'end'
  adornmentString: string
}

export function getAdornment ({position, adornmentString}: getAdornmentProps): {
  endAdornment?: JSX.Element;
  startAdornment?: JSX.Element;
} {
  return {
    [position + "Adornment"]: (
      <InputAdornment position={position}>
        {adornmentString}
      </InputAdornment>
    ),
  }
}

export function getPercentageAdornment(){
  return getAdornment({
  position: "end",
  adornmentString: '%',
})
}