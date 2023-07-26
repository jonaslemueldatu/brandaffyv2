//Props
//1. Number = Number to Format

import React, { useEffect } from "react";
import { useState } from "react";

function FormatterNumber(props) {
  const [formatterNumber, setFormatterNumber] = useState();

  useEffect(() => {
    const abbreviateNumber = () => {
      const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

      let tier = (Math.log10(Math.abs(props.Number)) / 3) | 0;

      if (tier === 0) setFormatterNumber(props.Number);

      let suffix = SI_SYMBOL[tier];
      let scale = Math.pow(10, tier * 3);
      let scaled = props.Number / scale;

      setFormatterNumber(scaled.toFixed(1) + suffix);
    };

    abbreviateNumber();
  }, [props.Number]);

  return <div>{formatterNumber}</div>;
}

export default FormatterNumber;
