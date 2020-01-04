---
title: "Include third party scripts"
order: 0
---

Include third party scripts inside helmet in layout.js

```js
<Helmet>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-grid.min.css" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
</Helmet>
```

Full Code
```js
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "../styles/layout.css"
import "../styles/menu.css"
import Helmet from "react-helmet"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
   `)

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-grid.min.css" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Helmet>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
            <footer>
                <div class="container">
                    © {new Date().getFullYear()}, Built with {` `}
                    <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">Gatsby</a>
                </div>
            </footer>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
```