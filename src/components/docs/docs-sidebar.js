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
                                                    <a className={childClass} href={`#${(heading.value).replace(/[,.?]/g, '').replace(/[ ]/g, '-').toLowerCase()}`}>
                                                        {heading.value}
                                                    </a>
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