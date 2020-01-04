---
title: "PrysmJs via Markdown Files"
date: "12-29-2019"
order: 2
---

Install the following
```js
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs gatsby-remark-autolink-headers gatsby-remark-source-name
```
<br>
<br>

Include gatsby styles in gatsby-browser.js
```js
//in gatsby-browser.js
require("prismjs/themes/prism-okaidia.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
```

<br>
<br>

## Adding Syntax Highlighting to markdown files

Add the following plugins config to `gatsby-config.js`
```js
{
    resolve: `gatsby-transformer-remark`,
    options: {
        plugins: [
            `gatsby-remark-autolink-headers`,
            {
                resolve: `gatsby-remark-prismjs`,
                options: {
                    showLineNumbers: true,
                },
            },
        ],
    },
},
```

<br>
<br>

Add this CSS to fix Line Numbers, adjust if needed desired
```css
/**
 * CSS for line numbers
 */
pre.line-numbers code {
    padding: 0px;
}
.line-numbers .line-numbers-rows {
    left: 0;
    padding: 1em;
    width: 3em !important;
}
```

<br>
<br>

## Example of dynamic markdown template
This is an example from the markdown template file located in /src/pages/docs/docs.js

Note the lines 4, 5, 21-23, 31

`import { useEffect } from "react"`

`import Prism from "prismjs"`

`useEffect(() => { Prism.highlightAll()})`

`<div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>`

```js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../../components/layout"
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
<br>
<br>

## Example Markdown Code
```text
---
title: "Some Cool Title"
date: "12-29-19"
---

Use backticks not single quotes, only used single quotes so it did not render...

'''html
<h1>This is an H1</h1>
'''

'''css
/**
 * CSS for line numbers
 */
pre.line-numbers code {
    padding: 0px;
}
.line-numbers .line-numbers-rows {
    left: 0;
    padding: 1em;
    width: 3em !important;
}
'''

```