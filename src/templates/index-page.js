import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"

import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import Card from "../components/card"

const INTRO_LIST = [`Know your rights`, `List item 2`, `list item 3 [link](/)`]

const processor = remark()
  .use(recommended)
  .use(html)

const AddToHomeScreen = () => (
  <section className="add-to-home-screen-section">
    <div>
      <h2>
        Add the documenters field guide to your home screen and access it like
        an app
      </h2>
      {/* TODO: Add image, fill in button */}
      <a className="is-button" href="#">
        Learn how
      </a>
    </div>
  </section>
)

export const IndexPageTemplate = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, description },
    },
    allMarkdownRemark: { edges },
  },
}) => (
  <div className="site is-home">
    <SEO title={title} pathname="/" description={description} />
    <Header siteTitle="Field Guide" />
    <main>
      <section className="intro-list">
        <ol>
          {INTRO_LIST.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{
                __html: processor.processSync(item),
              }}
            />
          ))}
        </ol>
      </section>
      <section className="card-section">
        <h2>Assignment Tips and Information</h2>
        <div className="card-grid">
          {edges.map(
            ({
              node: {
                frontmatter: { title },
                fields: { slug },
              },
            }) => (
              <Card key={title} title={title} slug={slug} />
            )
          )}
        </div>
      </section>
      <AddToHomeScreen />
      <section className="content" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
    <Footer />
  </div>
)

export default IndexPageTemplate

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { glob: "/on-assignment/*" } } }
    ) {
      edges {
        node {
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
