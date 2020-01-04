---
title: "Content from markdown files"
---

This could be used to create blogs, basically any dynamic content from markdown files. In this example, I used it to create a directory for creating markdown files to be used for documentation (this documentation), not necessarily a blog, but same concept.

Install the following plugins
```shell
npm install gatsby-source-filesystem
```

<br>
<br>

I added the following plugin config to **gatsby-config.js**.

**name:** is used to to filter by sourceInstanceName. I used it later as a filter to get all markdown files from this directory. Which I then use to dynamically create this sidebar menu.
<br>
**path:** is where I am putting the markdown files for these gatsby docs. Also this allows us to have multiple different gatsby-source-filesystem e.g. multiple post types, we can use the name to filter the files in this directory specified being the path.
<br>
`gatsby-config.js`
```js
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `gatsbydocs`,
        path: `${__dirname}/src/pages/docs/gatsby/`,
    },
},
```

<br>
<br>

I added the following to **gatsby-node.js** to create pages from markdown files found in **/src/pages/docs/gatsby/** and assign the template they would use, in this case **/src/templates/docs.js**, this also creates the url permalink structure for this "post type" as shown on line 35
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
}
```

<br>
<br>

Then for the main index of the docs, notice the query is filtering by the **gatsbydocs** name we defined in **gatsby-config.js**
<br>
`/src/pages/docs/gatsby.js`
```js
import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { graphql, useStaticQuery } from 'gatsby'

const GatsbyDocsPage = ({ location }) => {

    const data = useStaticQuery(graphql`
    query {
        allFile(filter: { sourceInstanceName: { eq: "gatsbydocs" } }) {
            edges {
                node {
                    childMarkdownRemark{
                        fields{
                            slug
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
    `)

    return (
        <Layout>
            <SEO
                title="Gatsby Docs"
                description="Gatsby Documentation for myself"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
                pathname={location.pathname}
            />
            <section>
                <div className="container">
                    <h1>Gatsby Docs!</h1>
                    <ul>
                        {data.allFile.edges.map((edge) => {
                            return (
                                <li>
                                    <Link to={`/docs/gatsby/${edge.node.childMarkdownRemark.fields.slug}`}>
                                        {edge.node.childMarkdownRemark.frontmatter.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </Layout >
    )
}

export default GatsbyDocsPage
```

<br>
<br>

Then we need to create the template we specified would be used for the markdown content
<br>
`/src/templates/docs.js`
```js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { useEffect } from "react"
import Prism from "prismjs"


export const query = graphql`
    query ( $slug: String! ){
        markdownRemark(fields: { slug: { eq: $slug } }) {
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

    return (
        <Layout>
            <section>
                <div className="container">
                    <h1>{props.data.markdownRemark.frontmatter.title}</h1>
                    {props.data.markdownRemark.frontmatter.date && <small style={{ display: 'block', marginBottom: `1.45rem` }}>Date Added: {props.data.markdownRemark.frontmatter.date}</small>}
                    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
                </div>
            </section>
        </Layout>
    )
}

export default Docs
```