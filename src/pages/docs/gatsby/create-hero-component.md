---
title: "Create Hero Component"
order: 4
---

Create Hero Component in src/components

This uses gatsby-background-image to use the same features as gatsby-image sources, lazy loading, svg tracing, etc...

## Background Images ##

```shell
npm install --save gatsby-background-image
```

<br>
<br>

Add to plugin config in gatsby-config.js

```js
{
    resolve: 'gatsby-background-image',
    options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
    },
},
```

<br>
<br>

Hero component I created
```js
import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import "../styles/components/hero.css"
import BackgroundImage from 'gatsby-background-image'

const Hero = ({ imgName, heading, subheading, content, align, internalLink, externalLink, ctatext, position }) => (
    <StaticQuery
        query={graphql`
            query {
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
        `}
        render={data => {
            const image = data.allImageSharp.edges.find(
                edge => edge.node.fluid.originalName === imgName
            )

            return <BackgroundImage
                Tag="section"
                className={`fluid hero t-${align}`}
                fluid={image.node.fluid}
                backgroundColor={`#040e18`}
            >
                <div className="container">
                    <div className="inner">
                        {heading && <h1>{heading}</h1>}
                        {subheading && <h2>{subheading}</h2>}
                        {content && <p>{content}</p>}
                        {internalLink && <Link className="btn" to={internalLink}>{ctatext}</Link>}
                        {externalLink && <a className="btn" href={externalLink} target="_blank" rel="noopener noreferrer">{ctatext}</a>}
                    </div>
                </div>
            </BackgroundImage>
        }}
    />
)

export default Hero
```

<br>
<br>

Then on a page I set the following to use a hero

```js
<Hero
    imgName="DSC01284.JPG"
    heading="This is the hero"
    subHeading="This is the sub heading"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempore aperiam quis nulla placeat. Molestias dignissimos amet numquam fuga voluptate consequatur qui excepturi recusandae?"
    align="center"
    internalLink="/docs/gatsby"
    externalLink="https://google.com"
    ctaText="Learn More"
    textPosition="center"
/>
```