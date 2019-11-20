import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Card = ({ title, slug }) => (
  <div className="card">
    <div className="feature-block" />
    <Link to={slug}>{title}</Link>
  </div>
)

Card.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Card
