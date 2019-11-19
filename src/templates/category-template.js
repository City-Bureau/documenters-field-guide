import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const CategoryTemplate = ({ siteTitle, html, links }) => (
  <Layout title={siteTitle}>
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    <div className="table-of-contents">
      <ul>
        {links.map(({ title, slug }) => (
          <li key={slug}>
            <a href={slug}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

CategoryTemplate.propTypes = {
  siteTitle: PropTypes.string,
  html: PropTypes.node,
  links: PropTypes.array,
}

const CategoryPage = ({
  data: {
    markdownRemark: {
      html,
      fields: { slug },
      frontmatter: { title, description },
    },
    allMarkdownRemark: { edges },
    site: { siteMetadata },
    socialImage,
  },
}) => (
  <>
    <SEO
      title={title}
      pathname={slug}
      description={description}
      siteMetadata={siteMetadata}
      socialImage={socialImage}
    />
    <CategoryTemplate
      siteTitle={siteMetadata.title}
      html={html}
      links={edges.map(
        ({
          node: {
            fields: { slug },
            frontmatter: { title },
          },
        }) => ({ title, slug })
      )}
    />
  </>
)

CategoryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.node,
      fields: PropTypes.object,
      frontmatter: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    site: PropTypes.object,
    socialImage: PropTypes.object,
  }),
}

export default CategoryPage

export const pageQuery = graphql`
  query CategoryPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $slug, ne: $slug } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
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
