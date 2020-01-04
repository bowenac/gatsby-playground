---
title: "Create image component"
order: 3
---

Create Image component in src/components

## Easy Images ##

```shell
npm install --save gatsby-source-filesystem gatsby-transformer-sharp gatsby-plugin-sharp
```

<br>
<br>

Add to plugin config in gatsby-config.js

```js
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `images`,
        path: `${__dirname}/src/images`,
    },
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
```

<br>
<br>

Image component I created

```js
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ imgName, alt }) => (
    <StaticQuery
        query={graphql`
            query {
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
        `}
        render={data => {
            const image = data.allImageSharp.edges.find(
                edge => edge.node.fluid.originalName === imgName
            )
            if (!image) {
                return null
            }

            return <Img fluid={image.node.fluid} alt={alt} title={image.node.fluid.originalName} />
        }}
    />
)

export default Image
```

<br>
<br>

Then use the following wherever you want to use an image. This will look for an image named DSC00091.JPG from src/images. The alt is assigned by adding alt text like normal. The title tag is automatically added from the image component above

```html
<Image imgName="DSC00091.JPG" alt="Wood Texture" />
```