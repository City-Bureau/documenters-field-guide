import React from "react"
import PropTypes from "prop-types"

const Card = ({ title, slug }) => (
  <div className="card">
    <div className="feature-block" />
    <a href={slug}>{title}</a>
  </div>
)

Card.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Card
