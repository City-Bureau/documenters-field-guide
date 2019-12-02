import React from "react"

const Arrow = ({ style, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 13"
    className={className || ``}
    style={{ shapeRendering: "geometricprecision", ...(style || {}) }}
  >
    <path
      fillRule="nonzero"
      fill="currentColor"
      d="M7.473 11.822l-.644.644a.693.693 0 0 1-.984 0L.205 6.83a.693.693 0 0 1 0-.984l5.64-5.64a.693.693 0 0 1 .984 0l.644.644a.697.697 0 0 1-.012.995l-3.496 3.33h8.339c.386 0 .696.311.696.697V6.8c0 .385-.31.696-.696.696h-8.34l3.497 3.33c.284.27.29.72.012.996z"
    ></path>
  </svg>
)

export default Arrow
