import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Accordion from "../components/accordion"

const processor = remark()
  .use(recommended)
  .use(html)

export const FaqTemplate = ({ siteTitle, questions }) => (
  // TODO: Split header from layout so that siteTitle doesn't need to be passed here
  <Layout title={siteTitle}>
    <div className="content">
      <h1>Frequently Asked Questions</h1>
      {questions.map(({ question, answer }, idx) => (
        <Accordion id={idx} question={question}>
          <div
            dangerouslySetInnerHTML={{
              __html: processor.processSync(answer),
            }}
          />
        </Accordion>
      ))}
    </div>
  </Layout>
)

FaqTemplate.propTypes = {
  siteTitle: PropTypes.string,
  questions: PropTypes.array,
}

const FaqPage = ({
  data: {
    markdownRemark: {
      frontmatter: { title, description, questions },
    },
    site: { siteMetadata },
    socialImage,
  },
}) => (
  <>
    <SEO
      title={title}
      pathname="/"
      description={description}
      siteMetadata={siteMetadata}
      socialImage={socialImage}
    />
    <FaqTemplate siteTitle={siteMetadata.title} questions={questions} />
  </>
)

FaqPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.node,
      frontmatter: PropTypes.object,
    }),
    site: PropTypes.object,
    socialImage: PropTypes.object,
  }),
}

export default FaqPage

export const pageQuery = graphql`
  query FaqTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-template" } }) {
      html
      frontmatter {
        title
        description
        questions {
          question
          answer
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
