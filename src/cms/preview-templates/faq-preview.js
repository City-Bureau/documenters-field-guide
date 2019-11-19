import React from "react"
import PropTypes from "prop-types"
import { FaqTemplate } from "../../templates/faq-template"

const FaqPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {
    return <FaqTemplate siteTitle="Field Guide" questions={data.questions} />
  } else {
    return <div>Loading...</div>
  }
}

FaqPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
}

export default FaqPreview
