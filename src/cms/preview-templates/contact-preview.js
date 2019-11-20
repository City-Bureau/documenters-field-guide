import React from "react"
import PropTypes from "prop-types"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"

const processor = remark()
  .use(recommended)
  .use(html)

const ContactPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {
    return (
      <footer>
        <div
          dangerouslySetInnerHTML={{ __html: processor.processSync(data.body) }}
        ></div>
      </footer>
    )
  } else {
    return <div>Loading...</div>
  }
}

ContactPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default ContactPreview
