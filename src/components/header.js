import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

// TODO: If generalizing to a navigation, pull this from static query
const Header = ({ siteTitle }) => (
  <header>
    <div className="header-container">
      <div>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
