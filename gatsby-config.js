/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Betsmart`,
    siteUrl: `https://betsmart.com.ng`,
    description: `Do you want to make more money on sports betting and lose wayyyyy less? With Betsmart, you get a low cost membership service that provides you with daily betting tips of over 5 odds.`,
    author: `Betsmart Inc.`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `betslips`,
        path: `${__dirname}/src/images/betslips/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || "none"
      }
    },
    {
      resolve: `gatsby-plugin-facebook-multi-pixels`,
      options: [
        {
          dev: false,
          alias: 'pucpredictMakeDo',
          pixelId: process.env.FACEBOOK_PIXEL_ID_PP,
          viewContent: true,
          pageView: true,
        },
        {
          dev: false,
          alias: 'betSmart',
          pixelId: process.env.FACEBOOK_PIXEL_ID_BS,
          viewContent: true,
          pageView: true,
        }
      ]
    }
  ],
}
