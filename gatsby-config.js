module.exports = {
  siteMetadata: {
    title: `Documenters Field Guide`,
    description: `Field guide for City Bureau's Documenters program`,
    author: `City Bureau`,
    twitterAuthor: `@city_bureau`,
    siteDomain: `fieldguide.documenters.org`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img`,
        name: `uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: `images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-68381272-4`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Documenters Field Guide`,
        short_name: `Field Guide`,
        start_url: `/`,
        background_color: `#ffe222`,
        theme_color: `#ffe222`,
        display: `minimal-ui`,
        icon: `src/img/icon.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: `uploads`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`, // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: [`../styles/style.scss`],
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/**`],
        workboxConfig: {
          navigateFallback: `/offline`,
        },
      },
    },
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
}
