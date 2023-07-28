//Props
// SetState1 = SetState to trigger
// State1 = State to trigger

import React from "react";

function DropdownBusinessType(props) {
  return (
    <select
      onChange={(e) => props.SetState1(e.target.value)}
      required
      className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
      defaultValue={props.State1}
    >
      <option value="CORPORATION">Corporation</option>
      <option value="SOLE_PROPRIETOR">Sole Proprietor</option>
      <option value="COOPERATIVE">Cooperative</option>
      <option value="TRUST">Trust</option>
      <option value="NON_PROFIT">Non Profit</option>
      <option value="GOVERNMENT">Government</option>
    </select>
  );
}

export default DropdownBusinessType;
