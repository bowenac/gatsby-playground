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