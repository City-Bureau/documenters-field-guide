import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const {
    markdownRemark: { html },
  } = useStaticQuery(graphql`
    query {
      markdownRemark(fields: { slug: { eq: "/contact/" } }) {
        html
      }
    }
  `)
  return (
    <footer>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </footer>
  )
}

export default Footer
