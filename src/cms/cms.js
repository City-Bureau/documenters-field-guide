import CMS from "netlify-cms-app"
import "../styles/style.scss"

import IndexPagePreview from "./preview-templates/index-page-preview"

CMS.registerPreviewTemplate("index", IndexPagePreview)
