import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { activateCheckboxes, setupDatabase } from "../utils/checkboxes"
import Header from "./header"
import Footer from "./footer"
import "../styles/style.scss"

const Layout = ({ title, children }) => {
  useEffect(() => {
    activateCheckboxes()
    setupDatabase()
  }, [])
  return (
    <div className="site">
      <Header title={title} />
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
