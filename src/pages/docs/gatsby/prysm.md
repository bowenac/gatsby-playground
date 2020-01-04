---
title: "PrysmJs Syntax Highlighter"
date: "12-29-2019"
order: 1
---

Install the following
```js
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
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

## Adding Syntax Highlighting to a page manually

Import useEffect and PrismJs
```js
//import useEffect and Prism on whatever page/template you will use Prism
import { useEffect } from "react"
import Prism from "prismjs"
```

<br>
<br>

Define a const variable with your code example
```js
const code = `<!-- html -->
<div className="container">
    <h1>This is an h1</h1>
    <p>This is a paragraph</p>
</div>`
```

<br>
<br>

Add useEffect before your return which is used for code highlighting
```js
useEffect(() => {
    Prism.highlightAll()
})
```

<br>
<br>

Add your html inside your return using the const variable for the code
```html
<!--HTML-->
<pre className="language-html line-numbers">
    <code>
        {code}<!-- const variable above, or just add code inside curly braces with single backticks -->
    </code>
    <!-- Add line numbers here if you want to show them -->
</pre>
```

<br>
<br>

## Add Line Numbers
To show line numbers, add the following before the closing pre tag. Each empty span tag is a line number
```html
<span className="line-numbers-rows"><span></span></span> <!-- would show 1 line number etc -->
<span className="line-numbers-rows"><span></span><span></span></span> <!-- would show 2 line numbers etc -->
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

## Final Code
Example using this inside a page e.g `/src/pages/index.js`
```js
import React from "react"
import Layout from "../components/layout"

//import the Prism package
import { useEffect } from "react"
import Prism from "prismjs"

// The code snippet you want to highlight, as a string
const codeExample = `< !--html -->
<div className="container">
    <h1>This is an h1</h1>
    <p>This is a paragraph</p>
</div>`

const IndexPage = () => {
    useEffect(() => {
        Prism.highlightAll()
    })

    return (
        <Layout>
            <pre className="language-html line-numbers">
                <code>
                    {codeExample}
                </code>
                <span className="line-numbers-rows"><span></span><span></span><span></span><span></span><span></span></span>
            </pre>
        </Layout>
    )
}

export default IndexPage
```