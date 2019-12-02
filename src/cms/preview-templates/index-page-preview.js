import React from "react"
import PropTypes from "prop-types"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"
import { IndexPageTemplate } from "../../templates/index-page"

const processor = remark()
  .use(recommended)
  .use(html)

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {
    return (
      <div className="site is-home">
        <IndexPageTemplate
          beforeyoubegin={data.beforeyoubegin || []}
          onassignment={data.onassignment || []}
          html={processor.processSync(data.body)}
          cards={[
            {
              title: "Test 1",
              slug: "#",
              image: { childImageSharp: { fixed: {} } },
            },
            {
              title: "Test 2",
              slug: "#",
              image: { childImageSharp: { fixed: {} } },
            },
          ]}
          payment={data.payment || []}
          questions={data.questions || []}
        />
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default IndexPagePreview
