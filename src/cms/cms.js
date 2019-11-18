import CMS from "netlify-cms-app"

import IndexPagePreview from "./preview-templates/index-page-preview"
import PageTemplatePreview from "./preview-templates/page-template-preview"

CMS.registerPreviewTemplate("index", IndexPagePreview)
CMS.registerPreviewTemplate("page", PageTemplatePreview)
