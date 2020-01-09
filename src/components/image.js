import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ imgName, alt }) => {
    const data = useStaticQuery(graphql`
        query theImage {
            allImageSharp {
                edges {
                    node {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid_withWebp
                            originalName
                        }
                    }
                }
            }
        }
    `)

    const image = data.allImageSharp.edges.find(
        edge => edge.node.fluid.originalName === imgName
    )
    if (!image) {
        return null
    }

    console.log(data)

    return (
        <Img fluid={image.node.fluid} alt={alt} />
    )
}