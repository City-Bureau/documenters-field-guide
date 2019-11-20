import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "../styles/style.scss"

// TODO: Set up service worker/indexeddb checkbox functionality
const Layout = ({ title, children }) => {
  return (
    <div className="site">
      <Header siteTitle={title} />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
