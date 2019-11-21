import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const PageTemplate = ({ tableOfContents, html }) => (
  <main>
    <div
      className="table-of-contents"
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
  </main>
)

PageTemplate.propTypes = {
  tableOfContents: PropTypes.node,
  html: PropTypes.node,
}

const Page = ({
  data: {
    markdownRemark: {
      html,
      tableOfContents,
      fields: { slug },
      frontmatter: { title, description },
    },
  },
}) => (
  <Layout title={title}>
    <SEO title={title} pathname={slug} description={description || ``} />
    <PageTemplate tableOfContents={tableOfContents} html={html} />
  </Layout>
)

Page.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.node,
      tableOfContents: PropTypes.node,
      fields: PropTypes.object,
      frontmatter: PropTypes.object,
    }),
  }),
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents(maxDepth: 3)
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
