import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/components/hero.css"
import BackgroundImage from 'gatsby-background-image'

export default ({ imgName, heading, subHeading, content, align, internalLink, externalLink, ctaText }) => {
    const data = useStaticQuery(graphql`
        query heroImage {
                allImageSharp {
                    edges {
                        node {
                            fluid(quality: 90, maxWidth: 1920) {
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

    return (
        <BackgroundImage
            Tag="section"
            className={`fluid hero t-${align}`}
            fluid={image.node.fluid}
            backgroundColor={`#040e18`}
        >
            <div className="container">
                <div className="inner">
                    {heading && <h1>{heading}</h1>}
                    {subHeading && <h2>{subHeading}</h2>}
                    {content && <p>{content}</p>}
                    {internalLink && <Link className="btn" to={internalLink}>{ctaText}</Link>}
                    {externalLink && <a className="btn" href={externalLink} target="_blank" rel="noopener noreferrer">{ctaText}</a>}
                </div>
            </div>
        </BackgroundImage>
    )
}