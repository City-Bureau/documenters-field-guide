import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const PageTemplate = ({ siteTitle, tableOfContents, html }) => (
  <Layout title={siteTitle}>
    <div
      className="table-of-contents"
      dangerouslySetInnerHTML={{ __html: tableOfContents }}
    />
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

PageTemplate.propTypes = {
  siteTitle: PropTypes.string,
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
  <>
    <SEO
      title={frontmatter.title}
      pathname={slug}
      description={frontmatter.description || ``}
      siteMetadata={siteMetadata}
      socialImage={socialImage}
    />
    <PageTemplate
      siteTitle={siteMetadata.title}
      tableOfContents={tableOfContents}
      html={html}
    />
  </>
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
