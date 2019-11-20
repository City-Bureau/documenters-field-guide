import CMS from "netlify-cms-app"
import "../styles/style.scss"

import IndexPagePreview from "./preview-templates/index-page-preview"
import PageTemplatePreview from "./preview-templates/page-template-preview"

CMS.registerPreviewTemplate("index", IndexPagePreview)
CMS.registerPreviewTemplate("page", PageTemplatePreview)
CMS.registerPreviewTemplate("before-you-begin", PageTemplatePreview)
CMS.registerPreviewTemplate("on-assignment", PageTemplatePreview)
CMS.registerPreviewTemplate("resources", PageTemplatePreview)
CMS.registerPreviewTemplate("contact", PageTemplatePreview)
