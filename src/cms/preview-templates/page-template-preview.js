import React from "react"
import PropTypes from "prop-types"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"
import { PageTemplate } from "../../templates/page-template"

const processor = remark()
  .use(recommended)
  .use(html)

const PageTemplatePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {
    return (
      <PageTemplate
        siteTitle="Field Guide"
        html={processor.processSync(data.body)}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

PageTemplatePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default PageTemplatePreview
