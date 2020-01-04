import React from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from 'gatsby'
import "../../styles/sidebar.css"

const DocsSidebar = ({ docs, heading, parentlink }) => (

    <StaticQuery
        query={graphql`
            query{
                allFile(sort: {fields: birthTime}) {
                    edges {
                        node {
                            sourceInstanceName
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
        `}
        render={data => {
            return <ul>
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
                        </li>
                    )

                })}
            </ul>
        }}

    />
)

export default DocsSidebar