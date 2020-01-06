---
title: "How these docs were created"
---

Since I wanted to document my journey through learning **Gatsby**... I decided to create a section to do just that. I have created two different documentation sections for fun, **Gatsby Docs**, and **WordPress Docs**. Both are dynamic based on markdown files. This is how I did that.

Install the following plugins
```shell
npm install gatsby-remark-source-name
npm install gatsby-source-filesystem
```

<br>
<br>

I added the following plugin config to **gatsby-config.js**.

**name:** is used to to filter by sourceInstanceName. I used it later as a filter to get all markdown files from this directory. Which I then use to dynamically create this sidebar menu.
<br>
**path:** is where I am putting the markdown files for each documentation section.
<br>
<br>
The **gatsby-remark-source-name** plugin allows me to get the sourceInstanceName from GraphQl later on which I use to dynamically populate some data from the single docs template... more on that later.
<br>
`gatsby-config.js`
```js
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
```

<br>
<br>

I added the following to **gatsby-node.js** to create pages from markdown files found in **/src/pages/docs/gatsby/**, and **/src/pages/docs/wordpress/** and assign the template they would use, in this case **/src/templates/docs.js**, this also creates the url permalink structure for both the gatsby docs and wordpress docs "post types" as shown on line 35 and 60

Also notice the onCreateNode [art which is used to create a slug field if node.internal.type === 'MarkdownRemark' which would be a markdown file .md, which is then able to be used in graphiql to query for unique markdown files based on the slug which is used for the urls for the single docs.

<br>

`gatsby-node.js`
```js
const path = require('path')
module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const docsTemplate = path.resolve('./src/templates/docs.js')
    const docs = await graphql(`
        query {
            allMarkdownRemark{
                edges{
                    node{
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `)
    docs.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: docsTemplate,
            path: `/docs/gatsby/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })


    const wordpressTemplate = path.resolve('./src/templates/docs.js')
    const wordpress = await graphql(`
        query {
            allMarkdownRemark{
                edges{
                    node{
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `)
    wordpress.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: wordpressTemplate,
            path: `/docs/wordpress/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })
}
```

<br>
<br>

Then for the main docs page, this is an example of the template for the root of docs/gatsby notice the path. The wordpress one is similar... will post below this example.
Here I have created a couple custom components (layout, sidebar, and footer) as I have styled the docs pages a little different, and it also has a fixed sidebar and wanted to work on creating components anyway and this was a good use case for that.
<br>
<br>
This main root page is not using a markdown file, I just added html and the code snippets for the main page, but have removed it to keep the code example short... it was just random html.
<br>
<br>
**Line 3-5** is importing the custom components I created
<br>
**Line 15-19** is used for a click handler to toggle the sidebar nav.
<br>
**Line 22** I use the DocsLayout component
<br>
**Line 32** is assigning active class to the sidebar when sidebar hamburger menu is clicked etc. I then can target that active class to show the sidebar on mobile.
<br>
**Line 42** I use the Footer component
<br>
**Line 36** I use the DocsSidebar component notice the values... docs="" heading="" parentlink="" docs is used to dynamically get the sidebar links for the correct documentation, in this case the gatsbydocs is the name we created above in gatsby-config.js, heading is used for the sidebar heading, and parentlink is used to link the heading. This component is mostly for the single docs.js template so both gatsby docs, and wordpress docs can share the same template, but load the correct sidebar menu dynamically, set the sidebar heading, and link it correctly. So since it needed to be created, it's also used here.
<br>
**Line 44** is assigning active class to the hamburger menu is clicked. I then can change the style of the hamburger menu when the sidebar is open on mobile.
<br>
<br>

`/src/pages/docs/gatsby.js`

```js
import React from "react"
import SEO from "../../components/seo"
import DocsLayout from "../../components/docs/docs-layout"
import DocsSidebar from "../../components/docs/docs-sidebar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import Prism from "prismjs"

const GatsbyDocsPage = ({ location }) => {

    useEffect(() => {
        Prism.highlightAll()
    })

    const { useState } = React;
    const [open, setOpen] = useState(false);
    const clickHandler = () => {
        setOpen(!open);
    };

    return (
        <DocsLayout>
            <SEO
                title="Gatsby Docs"
                description="Documenting Gatsby through my journey!"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                pathname={location.pathname}
            />
            <section className="full has-sidebar">
                <div className="container">
                    <div className="row">
                        <div className={'sidebar' + (open ? ' active' : '')} style={{
                            background: `#f7f7f8`,
                            marginBottom: `0`,
                        }}>
                            <DocsSidebar docs="gatsbydocs" heading="Gatsby Docs" parentlink="/docs/gatsby/" />
                        </div>
                        <div className="docs">
                            <div className="container">
                                <h1>Gatsby Docs!</h1>

                                <Footer />
                            </div>
                            <div className={'sidebar-toggle' + (open ? ' active' : '')} onClick={clickHandler} onKeyPress={clickHandler} tabIndex={0} role="button">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DocsLayout >
    )
}

export default GatsbyDocsPage
```
<br>

`/src/pages/docs/wordpress.js`

```js
import React from "react"
import SEO from "../../components/seo"
import DocsLayout from "../../components/docs/docs-layout"
import DocsSidebar from "../../components/docs/docs-sidebar"
import Footer from "../../components/footer"
import { useEffect } from "react"
import Prism from "prismjs"

const WordPressDocsPage = ({ location }) => {

    useEffect(() => {
        Prism.highlightAll()
    })

    const { useState } = React;
    const [open, setOpen] = useState(false);
    const clickHandler = () => {
        setOpen(!open);
    };

    return (
        <DocsLayout>
            <SEO
                title="WordPress Docs"
                description="WordPress Documentation for myself"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                pathname={location.pathname}
            />
            <section className="full has-sidebar">
                <div className="container">
                    <div className="row">
                        <div className={'sidebar' + (open ? ' active' : '')} style={{
                            background: `#f7f7f8`,
                            marginBottom: `0`,
                        }}>
                            <DocsSidebar docs="wordpressdocs" heading="WordPress Docs" parentlink="/docs/wordpress/" />
                        </div>
                        <div className="docs">
                            <div class="container">
                                <h1>WordPress Docs!</h1>
                                <h3>Not much to put here... Just an example of a separate docs section.</h3>
                                <p>Will probably change these docs to integrating WordPress in gatsby so it has it's own section of docs. Just random code examples for testing currently...</p>
                                <Footer />
                            </div>
                            <div className={'sidebar-toggle' + (open ? ' active' : '')} onClick={clickHandler} onKeyPress={clickHandler} tabIndex={0} role="button">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DocsLayout >
    )
}

export default WordPressDocsPage
```

<br>
<br>

Then we need to create the template we specified would be used for the markdown content. Similiar to the main documentation page, I am using the same custom components for the single docs pages DocsLayout, DocsSidebar, Footer.
<br>
<br>
**Line 5-7** is importing the custom components I created
<br>
**Line 11-23** graphql query to get all the content from the markdown file, as well as **sourceName** on **line 13**. This is from the plugin gatsby-remark-source-name and allows me to check what kind of docs we are currently viewing...
<br>
**Line 31-35** is used for a click handler to toggle the sidebar nav.
<br>
**Line 37-46** is where I'm checking the **sourceName**. I've set a variable called doctype to be the value of the sourceName from the graphql query. I then check if that variable equals 'gatsbydocs', if so, I know I'm viewing a doc for Gatsby docs. I then set the heading, and the parentlink. Otherwise I set it for WordPress docs etc. This allows me to have have a single docs.js template for all single docs pages.
<br>
**Line 49** I use the DocsLayout component and close it on line 73
<br>
**Line 59** is assigning active class to the sidebar when sidebar hamburger menu is clicked etc. I then can target that active class to show the sidebar on mobile.
<br>
**Line 63** I use the DocsSidebar component notice the values (docs="" heading="" parentlink="") are now using the variables we set based on the sourceName... Like the main docs page, docs is used to dynamically get the sidebar links for the correct documentation, heading is used for the sidebar heading, and parentlink is used to link the heading.
<br>
**Line 71** I use the Footer component
<br>
**Line 73** is assigning active class to the hamburger menu is clicked. I then can change the style of the hamburger menu when the sidebar is open on mobile.
<br>
<br>

`/src/templates/docs.js`

```js
import React from 'react'
import { graphql } from 'gatsby'
import { useEffect } from "react"
import Prism from "prismjs"
import DocsLayout from "../components/docs/docs-layout"
import DocsSidebar from "../components/docs/docs-sidebar"
import Footer from "../components/footer"
import SEO from "../components/seo"

export const query = graphql`
    query ($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            fields {
                sourceName
                slug
            }
            frontmatter {
                title
                date
            }
            html
        }
    }
`

const Docs = (props) => {
    useEffect(() => {
        Prism.highlightAll()
    })

    const { useState } = React;
    const [open, setOpen] = useState(false);
    const clickHandler = () => {
        setOpen(!open);
    };

    const doctype = props.data.markdownRemark.fields.sourceName
    var heading = ""
    var parentlink = ""
    if (doctype === 'gatsbydocs') {
        heading = "Gatsby Docs"
        parentlink = "/docs/gatsby/"
    } else {
        heading = "WordPress Docs"
        parentlink = "/docs/wordpress/"
    }

    return (
        <DocsLayout>
            <SEO
                title={props.data.markdownRemark.frontmatter.title}
                description={props.data.markdownRemark.frontmatter.description}
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                pathname={`${parentlink}${props.data.markdownRemark.fields.slug}`}
            />
            <section className="full has-sidebar">
                <div className="container">
                    <div className="row">
                        <div className={'sidebar' + (open ? ' active' : '')} style={{
                            background: `#f7f7f8`,
                            marginBottom: `0`,
                        }}>
                            <DocsSidebar docs={`${props.data.markdownRemark.fields.sourceName}`} heading={`${heading}`} parentlink={`${parentlink}`} />
                        </div>
                        <div className="docs">
                            <div className="container">
                                <h1>{props.data.markdownRemark.frontmatter.title}</h1>
                                {props.data.markdownRemark.frontmatter.date && <small style={{ display: 'block', marginBottom: `1.45rem` }}>Date Added: {props.data.markdownRemark.frontmatter.date}</small>}
                                <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
                            </div>
                            <Footer />
                        </div>
                        <div className={'sidebar-toggle' + (open ? ' active' : '')} onClick={clickHandler} onKeyPress={clickHandler} tabIndex={0} role="button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </section>
        </DocsLayout>
    )
}



export default Docs
```
<br>
<br>

##Components##

`src/components/docs/docs-layout.js`

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
import Header from "../header"
import "../../styles/layout.css"
import "../../styles/menu.css"
import Helmet from "react-helmet"

const DocsLayout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query DocsLayoutSiteTitleQuery {
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
        </>
    )
}

DocsLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DocsLayout
```
<br>
<br>

`src/components/docs/docs-sidebar.js`

```js
import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from 'gatsby'
import "../../styles/components/sidebar.css"
import { kebabCase } from 'lodash';

const DocsSidebar = ({ location, docs, heading, parentlink }) => (

    <StaticQuery
        query={graphql`
            query{
                allFile(sort: {fields: childMarkdownRemark___frontmatter___order}) {
                    edges {
                        node {
                            sourceInstanceName
                            childMarkdownRemark{
                                fields{
                                    slug
                                }
                                headings {
                                    value
                                }
                                frontmatter {
                                    title
                                    date
                                }
                                rawMarkdownBody
                            }
                        }
                    }
                }
            }
        `}
        render={data => {
            return (
                <ul>
                    <li><h3><Link activeClassName="active" to={`${parentlink}/`}>{heading}</Link></h3></li>
                    {data.allFile.edges.map((edge) => {

                        if (docs !== edge.node.sourceInstanceName) {
                            return null
                        }

                        let parentClass = ''
                        if (typeof window !== `undefined`) {
                            if (window.location.pathname === `${parentlink}${edge.node.childMarkdownRemark.fields.slug}/`) {
                                parentClass = 'active'
                            }
                        }

                        return (
                            <li className={parentClass}>
                                <Link activeClassName="active" to={`${parentlink}${edge.node.childMarkdownRemark.fields.slug}/`}>
                                    {edge.node.childMarkdownRemark.frontmatter.title}
                                </Link>
                                {/* Check if we have headings, if so create sub menu */}
                                {edge.node.childMarkdownRemark.headings.length > 0 &&
                                    <ul className="sub-menu" style={{ padding: `0` }}>
                                        {edge.node.childMarkdownRemark.headings.map((heading) => {

                                            let childClass = ''
                                            if (typeof window !== `undefined`) {
                                                if (window.location.hash === `#${kebabCase(heading.value)}`) {
                                                    childClass = 'active'
                                                }
                                            }
                                            return (
                                                <li>
                                                    <Link className={childClass} to={`${parentlink}${edge.node.childMarkdownRemark.fields.slug}/#${kebabCase(heading.value)}`}>
                                                        {heading.value}
                                                    </Link>
                                                </li>
                                            )

                                        })}
                                    </ul>
                                }
                            </li>
                        )

                    })}
                </ul>
            )
        }}

    />
)

export default DocsSidebar
```
<br>
<br>

`src/components/footer.js`

```js
import React from "react"

const Footer = () => (
    <footer>
        <div class="container">
            © {new Date().getFullYear()}, Built with {` `}
            <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">Gatsby</a> by <a target="_blank" rel="noopener noreferrer" href="https://adamcbowen.com">Adam Bowen</a>
        </div>
    </footer>
)

export default Footer
```
<br>
<br>

## Styles ##

`styles/sidebar.css`

```css
section.full.has-sidebar {
    padding: 0px 0px;
}
.sidebar {
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    overflow: auto;
    width: 18rem;
}
.sidebar ul {
    list-style: none;
    padding: 150px 0px
}
.sidebar ul li {
    color: #fff;
    text-decoration: none;
    position: relative;
}
.sidebar ul li a, .sidebar ul li h3 {
    color: rgba(21,9,64,.7);
    text-decoration: none;
    -webkit-transition: all .3s;
}
.sidebar ul li a.active {
    font-weight: 700;
}

.sidebar ul li a:after {
    content: "";
    position: absolute;
    top: 4px;
    top: .25rem;
    height: 0;
    left: -16px;
    left: -1rem;
    width: 4px;
    width: .25rem;
    background-color: rgba(21,9,64,.5);
    border-radius: 2px;
    border-radius: .125rem;
    transition: all .3s;
    -webkit-transition: all .3s;
}
.sidebar ul li a.active:after {
    height: calc(100% - 8px);
    height: calc(100% - .5rem);
}

section.full.has-sidebar .docs {
    padding-left: 18rem;
    width: 100%;
}
section.full .container .docs .container {
    padding-top: 50px;
    max-width: 1140px;
}
section.full .container .docs footer {
    text-align: center;
}


@media screen and (max-width: 1000px){
    .sidebar {
        display: none;
    }
    .sidebar.active {
        display: block;
        z-index: 11;
    }
    section.full.has-sidebar .docs {
        padding-left: 0;
        width: 100%;
    }
    .sidebar-toggle {
        display: block;
        background-color: #663399;
        bottom: 0rem;
        box-shadow: rgba(46, 41, 51, 0.08) 0px 4px 16px, rgba(71, 63, 79, 0.16) 0px 8px 24px;
        cursor: pointer;
        display: flex;
        height: 2.5rem;
        justify-content: space-around;
        position: fixed;
        left: 0px;
        visibility: visible;
        width: 2.5rem;
        z-index: 20;
    }
    .sidebar-toggle span {
        -webkit-transition: all .12s linear;
        transition: all .12s linear;
        position: absolute;
        top: 30%;
        left: 0;
        right: 0;
        display: block;
        background: #000;
        width: 60%;
        height: 1.5px;
        margin: auto;
    }
    .sidebar-toggle span:nth-child(2) {
        top: 50%;
    }
    .sidebar-toggle span:nth-child(3) {
        top: 70%;
    }
    .sidebar-toggle.active span:first-child {
        -webkit-transform: translateY(8px) translateX(0) rotate(-45deg);
        transform: translateY(8px) translateX(0) rotate(-45deg);
        opacity: 1;
        background: #fff;
    }
    .sidebar-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    .sidebar-toggle.active span:nth-child(3) {
        -webkit-transform: translateY(-10px) translateX(0) rotate(45deg);
        transform: translateY(-10px) translateX(0) rotate(45deg);
        opacity: 1;
        background: #fff;
    }

}

@media screen and (max-width: 600px){
    .sidebar ul {
        padding: 125px 0px
    }
}
```
