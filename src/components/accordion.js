import React, { useState } from "react"
import PropTypes from "prop-types"
import Chevron from "./chevron"

const Accordion = ({ id, question, children }) => {
  const [active, setActive] = useState("")
  const toggleActive = () => setActive(active === "" ? "active" : "")
  const onKeyPress = event => {
    if (event.key === "Enter") {
      toggleActive()
    }
  }

  return (
    <>
      <div
        className="accordion-label"
        role="button"
        tabIndex="0"
        onClick={toggleActive}
        onKeyPress={onKeyPress}
        aria-controls={`accordion-${id}`}
        aria-expanded={!!active.toString()}
      >
        <Chevron
          className="accordion-icon"
          style={{ transform: active ? `rotate(270deg)` : `rotate(90deg)` }}
        />
        <span>{question}</span>
      </div>
      <div
        id={`toggle-${id}`}
        className="accordion-content"
        style={{ display: active ? `` : `none` }}
        aria-hidden={!active.toString()}
      >
        {children}
      </div>
    </>
  )
}

Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Accordion
