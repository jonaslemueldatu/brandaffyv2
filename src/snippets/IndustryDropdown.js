import React from "react";

function IndustryDropdown(props) {
  return (
    <select
      onChange={(e) => props.SetIndustry(e.target.value)}
      required
      className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
      placeholder={props.Industry}
      defaultValue={props.Industry}
    >
      <option value="Food Industry">Food Industry</option>
      <option value="Agriculture">Agriculture</option>
      <option value="Construction">Construction</option>
      <option value="Production">Production</option>
      <option value="Mining">Mining</option>
      <option value="Technology">Technology</option>
      <option value="Education">Education</option>
      <option value="Retail">Retail</option>
      <option value="Trade">Trade</option>
      <option value="Distribution">Distribution</option>
      <option value="Transport">Transport</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
      <option value="Advertising">Advertising</option>
      <option value="Foodservice">Foodservice</option>
      <option value="Financial Services">Financial Services</option>
      <option value="Insurance">Insurance</option>
      <option value="Health Care">Health Care</option>
      <option value="Information Industry">Information Industry</option>
      <option value="Investment">Investment</option>
      <option value="Fishery">Fishery</option>
      <option value="Rail Transport">Rail Transport</option>
      <option value="Conglomerate">Conglomerate</option>
      <option value="Computers and Information Technology">
        Computers and Information Technology
      </option>
      <option value="Business-to-business">Business-to-business</option>
      <option value="Lobbying">Lobbying</option>
      <option value="Telecommunications">Telecommunications</option>
      <option value="Machine Industry">Machine Industry</option>
      <option value="Electronics">Electronics</option>
      <option value="Software">Software</option>
      <option value="Real Estate">Real Estate</option>
      <option value="Pharmaceutics">Pharmaceutics</option>
      <option value="Research">Research</option>
      <option value="Automation">Automation</option>
      <option value="Computer Hardware">Computer Hardware</option>
      <option value="Market Research">Market Research</option>
      <option value="Forestry">Forestry</option>
      <option value="Medical Service">Medical Service</option>
      <option value="Shipbuilding">Shipbuilding</option>
      <option value="International Trade">International Trade</option>
      <option value="Management Consulting">Management Consulting</option>
      <option value="Capital Market">Capital Market</option>
      <option value="Investment Banking">Investment Banking</option>
      <option value="Semiconductor">Semiconductor</option>
      <option value="Dairy">Dairy</option>
      <option value="Hospitality">Hospitality</option>
      <option value="Maritime Transport">Maritime Transport</option>
      <option value="Software Development">Software Development</option>
      <option value="Biotechnology">Biotechnology</option>
      <option value="Human Resources">Human Resources</option>
      <option value="Entertainment">Entertainment</option>
    </select>
  );
}

export default IndustryDropdown;
