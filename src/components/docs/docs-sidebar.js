import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from 'gatsby'
import "../../styles/components/sidebar.css"
import { kebabCase } from 'lodash';

const DocsSidebar = ({ docs, heading, parentlink }) => (

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
                        return (
                            <li>
                                <Link activeClassName="active" to={`${parentlink}${edge.node.childMarkdownRemark.fields.slug}/`}>
                                    {edge.node.childMarkdownRemark.frontmatter.title}
                                </Link>
                                {/* Check if we have headings, if so create sub menu */}
                                {edge.node.childMarkdownRemark.headings.length > 0 &&
                                    <ul className="sub-menu" style={{ padding: `0` }}>
                                        {edge.node.childMarkdownRemark.headings.map((heading) => {
                                            return (
                                                <li>
                                                    <Link to={`${parentlink}${edge.node.childMarkdownRemark.fields.slug}/#${kebabCase(heading.value)}`}>
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