import React from "react";

//Snippet Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

function TablesPagination(props) {
  const totalPages = Math.ceil(props.Total / props.Limit);

  return (
    <div>
      {totalPages > 0 && (
        <div className="flex justify-between items-center my-4 text-lg">
          <button
            className="ctm-font-color-1"
            onClick={() => props.SetState1(1)}
          >
            <FontAwesomeIcon icon={faLeftLong} className="mx-4" />
            First
          </button>
          <div className="flex">
            {props.Page - 2 > 0 && (
              <button
                className="mx-2 ctm-font-color-1"
                onClick={() => props.SetState1(props.Page - 2)}
              >
                {props.Page - 2}
              </button>
            )}
            {props.Page - 1 > 0 && (
              <button
                className="mx-2 ctm-font-color-1"
                onClick={() => props.SetState1(props.Page - 1)}
              >
                {props.Page - 1}
              </button>
            )}
            <button className="mx-2 font-bold">{props.Page}</button>
            {props.Page + 1 <= totalPages && (
              <button
                className="mx-2 ctm-font-color-1"
                onClick={() => props.SetState1(props.Page + 1)}
              >
                {props.Page + 1}
              </button>
            )}
            {props.Page + 2 <= totalPages && (
              <button
                className="mx-2 ctm-font-color-1"
                onClick={() => props.SetState1(props.Page + 2)}
              >
                {props.Page + 2}
              </button>
            )}
          </div>
          <button
            className="ctm-font-color-1"
            onClick={() => props.SetState1(totalPages)}
          >
            Last <FontAwesomeIcon icon={faRightLong} className="mx-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default TablesPagination;
