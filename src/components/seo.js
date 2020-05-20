import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"

const SEO = ({
  description,
  lang,
  meta,
  pathname,
  title,
  overrideTitle,
  imageData,
}) => {
  const {
    site: { siteMetadata },
    socialImage: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          twitterAuthor
          siteDomain
        }
      }
      socialImage: file(relativePath: { eq: "social-media.png" }) {
        childImageSharp {
          fixed(width: 1024) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={overrideTitle ? `%s` : `%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: description || siteMetadata.description,
        },
        {
          name: `author`,
          content: siteMetadata.author,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `https://${siteMetadata.siteDomain}${pathname}`,
        },
        {
          property: `og:site_name`,
          content: siteMetadata.title,
        },
        {
          property: `og:description`,
          content: description || siteMetadata.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `https://${siteMetadata.siteDomain}${imageData.src ||
            fixed.src}`,
        },
        {
          property: `og:image:width`,
          content: imageData.width || fixed.width,
        },
        {
          property: `og:image:height`,
          content: imageData.height || fixed.height,
        },
        {
          property: `og:image:alt`,
          content: `Documenters.org logo`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.twitterAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description || siteMetadata.description,
        },
        {
          name: `twitter:image:src`,
          content: `https://${siteMetadata.siteDomain}${imageData.src ||
            fixed.src}`,
        },
        {
          property: `twitter:image:alt`,
          content: `Documenters.org logo`,
        },
        {
          property: `apple-mobile-web-app-capable`,
          content: `yes`,
        },
        {
          property: `apple-mobile-web-app-status-bar-style`,
          content: `default`,
        },
      ].concat(meta)}
    >
      <link
        rel="canonical"
        href={`https://${siteMetadata.siteDomain}${pathname}`}
      />
      <link rel="stylesheet" href="https://use.typekit.net/xbg0srh.css" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  pathname: ``,
  overrideTitle: false,
  imageData: {},
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  overrideTitle: PropTypes.bool,
  imageData: PropTypes.object,
}

export default SEO
