import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Card = ({ title, slug, image }) => (
  <div className="card">
    <div className="feature-block">
      <Img fixed={image.childImageSharp.fixed} />
    </div>
    <Link to={slug}>{title}</Link>
  </div>
)

Card.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default Card
