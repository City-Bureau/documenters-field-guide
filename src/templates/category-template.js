import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CategoryTemplate = ({
  data: {
    markdownRemark: {
      html,
      fields: { slug },
      frontmatter: { title, description },
    },
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO title={title} pathname={slug} description={description} />
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
    <div className="table-of-contents">
      <ul>
        {edges.map(({ node: { fields: { slug }, frontmatter: { title } } }) => (
          <li key={slug}>
            <a href={slug}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

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
  }
`

export default CategoryTemplate
