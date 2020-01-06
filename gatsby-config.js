module.exports = {
    siteMetadata: {
        title: `Adam's Gatsby Playground`,
        titleTemplate: "%s · %s",
        url: `https://gatsby.adamcbowen.com`, // No trailing slash allowed!
        description: `My first Gatsby project starting from the default gastby starter, I will be documenting my journey and learning as I go, wish me luck!`,
        image: "/images/gatsby-astronaut.png", // Path to your image you placed in the 'static' folder
        twitterUsername: ``, // Will show meta twitter:creator if used e.g. @gatsbyjs
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        {
            resolve: 'gatsby-background-image',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-autolink-headers`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            showLineNumbers: true,
                        },
                    },
                ],
            },
        },
        `gatsby-remark-source-name`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `gatsbydocs`,
                path: `${__dirname}/src/pages/docs/gatsby/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `wordpressdocs`,
                path: `${__dirname}/src/pages/docs/wordpress/`,
            },
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `http://localhost:1337`,
                queryLimit: 1000, // Default to 100
                contentTypes: [`blog-posts`, `user`],
                // Possibility to login with a strapi user, when content types are not publically available (optional).
                /* loginData: {
                  identifier: "",
                  password: "",
                },*/
            },
        },
    ],
}
