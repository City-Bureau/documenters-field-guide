import React from "react"
import PropTypes from "prop-types"
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
  title,
  description,
  introlist,
  html,
  cards,
}) => (
  <div className="site is-home">
    <Header siteTitle="Field Guide" />
    <main>
      <section className="intro-list">
        <ol>
          {introlist.map((item, idx) => (
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
          {cards.map(({ title, slug }) => (
            <Card key={title} title={title} slug={slug} />
          ))}
        </div>
      </section>
      <AddToHomeScreen />
      <section className="content" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
    <Footer />
  </div>
)

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  introlist: PropTypes.array,
  html: PropTypes.node,
  cards: PropTypes.array,
}

const IndexPage = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, description, introlist },
    },
    allMarkdownRemark: { edges },
    site: { siteMetadata },
    socialImage,
  },
}) => {
  const cards = edges.map(
    ({
      node: {
        frontmatter: { title },
        fields: { slug },
      },
    }) => ({ title, slug })
  )

  return (
    <>
      <SEO
        title={title}
        pathname="/"
        description={description}
        siteMetadata={siteMetadata}
        socialImage={socialImage}
      />
      <IndexPageTemplate
        title={title}
        description={description}
        introlist={introlist}
        html={html}
        cards={cards}
      />
    </>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.node,
      frontmatter: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.array,
    site: PropTypes.object,
    socialImage: PropTypes.object,
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        description
        introlist
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
