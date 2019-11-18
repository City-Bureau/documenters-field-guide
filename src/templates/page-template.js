import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// TODO: refactor to the way preview had it set up with props
const PageTemplate = ({
  data: {
    markdownRemark: {
      html,
      tableOfContents,
      fields: { slug },
      frontmatter: { title, description },
    },
  },
}) => (
  <Layout>
    <SEO title={title} pathname={slug} description={description} />
    <div
      className="table-of-contents"
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export const pageQuery = graphql`
  query PageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
  }
`

export default PageTemplate
