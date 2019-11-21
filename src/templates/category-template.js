import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const CategoryTemplate = ({ html, links }) => (
  <main>
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    <div className="table-of-contents">
      <ul>
        {links.map(({ title, slug }) => (
          <li key={slug}>
            <Link to={slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </main>
)

CategoryTemplate.propTypes = {
  html: PropTypes.node,
  links: PropTypes.array,
}

const CategoryPage = ({
  data: {
    markdownRemark: {
      html,
      fields: { slug },
      frontmatter,
    },
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout title={frontmatter.title}>
    <SEO
      title={frontmatter.title}
      pathname={slug}
      description={frontmatter.description}
    />
    <CategoryTemplate
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
  </Layout>
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
  }
`
