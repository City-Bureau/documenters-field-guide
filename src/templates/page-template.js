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
      frontmatter,
    },
    site: { siteMetadata },
    socialImage,
  },
}) => (
  <Layout title={siteMetadata.title}>
    <SEO
      title={frontmatter.title}
      pathname={slug}
      description={frontmatter.description || ``}
      siteMetadata={siteMetadata}
      socialImage={socialImage}
    />
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
    site: PropTypes.object,
    socialImage: PropTypes.object,
  }),
}

export default Page

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
    site {
      siteMetadata {
        title
        description
        author
        twitterAuthor
        siteDomain
      }
    }
    socialImage: file(relativePath: { eq: "social-media.jpg" }) {
      childImageSharp {
        fixed(width: 1024) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
