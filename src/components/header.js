import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Arrow from "./arrow"

// TODO: If generalizing to a navigation, pull this from static query
const Header = ({ title }) => (
  <header>
    <div className="home-navigation">
      <div className="home-navigation-link-container">
        <Link to="/">
          <Arrow />
          Documenters Field Guide
        </Link>
      </div>
    </div>
    <div className="header-container">
      <div>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
