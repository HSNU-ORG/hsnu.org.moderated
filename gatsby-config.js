module.exports = {
  siteMetadata: {
    title: `國立臺灣師範大學附屬高級中學`,
    description: `國立臺灣師範大學附屬高級中學，簡稱台師大附中、師大附中、附中，官方英文簡稱為HSNU，是一所位處台北市中心、位於臺北市大安區信義路上的高級中學，附屬於國立臺灣師範大學。`,
    siteUrl: "https://hsnu.org", // No trailing slash allowed!
    image: "https://i.ytimg.com/vi/2fb-g_V-UT4/hqdefault.jpg",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `師大附中`,
        short_name: `HSNU`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icons/HSNU.png`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/Layout.js`),
      },
    },
    // source from WordPress
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // your WordPress source
        baseUrl: `wordpress.hsnu.org/index.php`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: true,
        // Blacklisted routes using glob patterns
        excludedRoutes: [
          // acf
          "**/acf/v3/posts",
          "**/acf/v3/pages",
          "**/acf/v3/categories",
          "**/acf/v3/tags",
          "**/acf/v3/comments",
          "**/acf/v3/blocks",
          "**/acf/v3/users",
          // wordpress
          "**/wp/v2/blocks",
          "**/wp/v2/statuses",
          "**/wp/v2/taxonomies",
          "**/wp/v2/categories",
          "**/wp/v2/tags",
          "**/wp/v2/posts",
          "**/wp/v2/pages",
          "**/wp/v2/types",
          "**/wp/v2/users",
          "**/wp/v2/settings",
          "**/wp/v2/themes",
          // jetpack
          "**/jetpack/**",
          "**/wpcom/**",
        ],
      },
    },
    // canonical link
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://hsnu.org`,
      },
    },
    // css
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Noto Sans TC`,
            variants: [`300`, `400`, `700`],
          },
          {
            family: `Noto Serif TC`,
            variants: [`700`],
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-offline`,
  ],
}
