import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"

import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import Card from "../components/card"
import Accordion from "../components/accordion"

import "../styles/style.scss"

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
      <Link className="is-button" to="/">
        Learn how
      </Link>
    </div>
  </section>
)

export const IndexPageTemplate = ({ introlist, cards, questions }) => (
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
    <section className="faq-section">
      <h2>FAQ</h2>
      {questions.map(({ question, answer }, idx) => (
        <Accordion id={idx} question={question}>
          <div
            dangerouslySetInnerHTML={{
              __html: processor.processSync(answer),
            }}
          />
        </Accordion>
      ))}
    </section>
    <AddToHomeScreen />
  </main>
)

IndexPageTemplate.propTypes = {
  introlist: PropTypes.array,
  cards: PropTypes.array,
  questions: PropTypes.array,
}

const IndexPage = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, description, introlist, questions },
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
    <div className="site is-home">
      <SEO
        title={siteMetadata.title}
        pathname="/"
        description={description}
        siteMetadata={siteMetadata}
        socialImage={socialImage}
      />
      <Header siteTitle={title} />
      <IndexPageTemplate
        introlist={introlist}
        html={html}
        cards={cards}
        questions={questions}
      />
      <Footer />
    </div>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.node,
      frontmatter: PropTypes.object,
    }),
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
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
        questions {
          question
          answer
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { glob: "/on-assignment/*" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            order
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
