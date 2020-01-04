# My Gatsby Playground

Just a personal space for me to learn Gatsby and document my journey starting fresh with the default starter theme.

---

## Created dynamic documentation using markdown files. ##
I wanted to document my journey so I have added a documentation section with code highlighting for myself to refer to.

This uses a different layout than the rest of the site so I created a couple custom components "DocsLayout, and DocsSidebar" for the documentation section since we want a sidebar to click through the different documentation files.

DocsSidebar dynamically creates the sidebar menu for each markdown file for the docs value passed to the component. e.g. `<DocsSidebar docs="gatsbydocs" heading="Gatsby Docs" parentlink="/docs/gatsby/" />`. As you can see the docs name is gatsbydocs (we want to show all docs with a sourceInstanceName of gatsbydocs), we use this value to check each node returned from the graphql query in the docs-sidebar.js file. If the nodes sourceInstanceName = gatsbydocs, we go ahead and return the link for that markdown file, otherwise we return null. We also pass the heading which is used as the heading in the sidebar and also links to the main docs starting docs page. The parentlink value is used to create the link e.g. `<Link activeClassName="active" to={`${parentlink}${edge.node.childMarkdownRemark.fields.slug}/`}>`


## Components Created ##
**Image component**

uses `<Image imgName="file-name in src/images here e.g. image.jpg" alt="alt text here" />`

**Hero component**

uses gatsby-background-image
```
<Hero
    imgName="DSC01284.JPG"
    heading="This is the hero"
    subHeading="This is the sub heading"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempore aperiam quis nulla placeat. Molestias dignissimos amet numquam fuga voluptate consequatur qui excepturi recusandae?"
    align="center"
    internalLink="/about"
    externalLink="https://www.gatsbyjs.org/"
    ctaText="Learn More"
    textPosition="center"
/>
```