import React from "react"
import {
  ToggleContainer,
  Toggle,
  Hidden,
  Slider,
} from "./styles";

const OptionToggle = ({ options, colours, firstOptionSelected, setOption }) => (
  <ToggleContainer>
    {options[0]}
    <Toggle firstOptionSelected={firstOptionSelected}>
      <Hidden
        type="checkbox"
        onChange={e => setOption(e.target.checked)}
      />
      <Slider colours={colours} firstOptionSelected={firstOptionSelected} />
    </Toggle>
    {options[1]}
  </ToggleContainer>
);

export default OptionToggle;