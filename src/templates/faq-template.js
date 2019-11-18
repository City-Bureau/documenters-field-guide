import React from "react"
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

export const FaqTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: { title, description, questions },
    },
  },
}) => (
  <Layout>
    <SEO title={title} pathname="/" description={description} />
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

export default FaqTemplate

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
  }
`
