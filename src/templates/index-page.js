import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"

import Footer from "../components/footer"
import SEO from "../components/seo"
import Card from "../components/card"
import Accordion from "../components/accordion"
import AddToHomeScreenImage from "../components/add-to-home-screen-image"

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
      <AddToHomeScreenImage />
      <Link
        className="is-button"
        to="/before-you-begin/add-the-field-guide-as-an-app-on-your-mobile-device/"
      >
        Learn how
      </Link>
    </div>
  </section>
)

export const IndexPageTemplate = ({
  beforeyoubegin,
  onassignment,
  cards,
  payment,
  questions,
}) => (
  <main>
    <section className="intro-list">
      <h2>Before you begin</h2>
      <ol>
        {beforeyoubegin.map((item, idx) => (
          <li
            key={idx}
            dangerouslySetInnerHTML={{
              __html: processor.processSync(item),
            }}
          />
        ))}
      </ol>
    </section>
    <section className="intro-list">
      <h2>On Assignment</h2>
      <ol>
        {onassignment.map((item, idx) => (
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
        {cards.map(({ title, slug, image }) => (
          <Card key={title} title={title} image={image} slug={slug} />
        ))}
      </div>
    </section>
    {payment.length > 0 ? (
      <section className="faq-section">
        <h2 id="payment">Payment</h2>
        {payment.map(({ question, answer }, idx) => (
          <Accordion key={idx} id={`${idx}`} question={question}>
            <div
              dangerouslySetInnerHTML={{
                __html: processor.processSync(answer),
              }}
            />
          </Accordion>
        ))}
      </section>
    ) : (
      ``
    )}
    {questions.length > 0 ? (
      <section className="faq-section">
        <h2>FAQ</h2>
        {questions.map(({ question, answer }, idx) => (
          <Accordion key={idx} id={`${idx}`} question={question}>
            <div
              dangerouslySetInnerHTML={{
                __html: processor.processSync(answer),
              }}
            />
          </Accordion>
        ))}
      </section>
    ) : (
      ``
    )}
    <AddToHomeScreen />
  </main>
)

IndexPageTemplate.propTypes = {
  beforeyoubegin: PropTypes.array,
  onassignment: PropTypes.array,
  cards: PropTypes.array,
  payment: PropTypes.array,
  questions: PropTypes.array,
}

const IndexPage = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        description,
        beforeyoubegin,
        onassignment,
        payment,
        questions,
      },
    },
    allMarkdownRemark: { edges },
  },
}) => {
  const cards = edges.map(
    ({
      node: {
        frontmatter: { title, image },
        fields: { slug },
      },
    }) => ({ title, image, slug })
  )
  return (
    <div className="site is-home">
      <SEO title={title} pathname="/" description={description} />
      <header>
        <div className="header-container">
          <div>
            <h1>
              <Link to="/">{title}</Link>
            </h1>
          </div>
        </div>
      </header>
      <IndexPageTemplate
        beforeyoubegin={beforeyoubegin}
        onassignment={onassignment}
        html={html}
        cards={cards}
        payment={payment}
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
        beforeyoubegin
        onassignment
        payment {
          question
          answer
        }
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
            image {
              childImageSharp {
                fixed(width: 128, height: 156) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
