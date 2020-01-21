---
title: "Content Using Strapi"
---

Open node and cd to where you want it installed, run the following to install strapi

```shell
npx create-strapi-app name-of-project --quickstart
```

<br>

If you need to start strapi again you can run the folllowing from the strapi directory... cd strapi-directory

```shell
npx strapi develop
```

<br>

### Setting up strapi. ###
When strapi first launches you will setup your admin username and password.

After you create your admin user you will be launched into strapi.

Admin users control content types, fields, users, all admin tasks etc. Admins can create additional admins by clicking the users name dropdown in the top right, and clicking Manage the Administrators.

Setup a new authenticated user... this user is used for creating content. These users would be for example the authors.

**Setting up first Content Type.**

The first thing you will want to do after creating users is to create a content type e.g. Blog Posts.

- Click on Content Type Builder
- Click on Create new content-type
- Enter the display name e.g. Blog Posts
- Create the fields you want to use e.g. Title = Text, Content = Rich Text, Featured Image = Media, add all the fields you want.
- You can assign a user as an "Author" to the post by adding a Relation field, and choosing User on the right side. The left side in this example you would enter Author as the field name under Blog Posts, then you would select the second icon relation type that would say "Blog Post has and belongs to one User"... whatever the relationship type is that you would want to use.

### Gatsby Setup ###

Install gatsby-source-strapi

Open node or VS Code terminal and cd to gatsby project then run the following.

```shell
npm install --save gatsby-source-strapi
```

<br>

Setup the plugin in gatsby-config.js

For each content type you want gatsby to access, be sure to add it to contentTypes. So in the bottom example we want access to the blog post and user data.

```js
  {
    resolve: `gatsby-source-strapi`,
    options: {
      apiURL: `http://localhost:1337`,
      queryLimit: 1000, // Default to 100
      contentTypes: [`blog-posts`, `user`],
      // Possibility to login with a strapi user, when content types are not publically available (optional).
      /* loginData: {
        identifier: "",
        password: "",
      },*/
    },
  },
```

<br>

After you have added this you will want to run a gatsby build to pickup the new changes.

```js
npm run develop
```

<br>

### Possible Error Notes ###

When you run the build after adding the plugin to gatsby-config.js you may notice some errors... these are most likely from the contentTypes and gatsby not being able to access that data.

The part that is commented out allows gatsby to access these content types via the login data even if the roles are not setup as public. This IMO would probably be fine if you're running strapi locally, however if you're running strapi on say a subdomain on a production environement you might not want to include this, especially if this is in a public repo clearly. So to give gatsby access to these content types, you need to set up the roles & permissions in strapi for these content types.

If you're not sure what the contentType name is, login to strapi, click on Roles & Permissions, under Application Permissions you should see your content types. Click on a toggle for the content type you're adding to gatsby, and to the right it should show you the route e.g. clicking on find checkbox for Blog-Posts would show GET /blog-posts... If you were to open http://localhost:1337/blog-posts without find checkbox checked, you would get a forbidden error. If you check the checkbox find and save... you should then be able to see the data if you went to http://localhost:1337/blog-posts this means that gatsby should now be able to access this data as well.

### Graphql ###

Example of a query to get all the Blog Posts we created along with the fields

```js
query{
    allStrapiBlogPosts(sort: {fields: id, order: DESC}) {
        nodes{
            id
            Title
            Content
            Excerpt
            author{
                id
                username
            }
            Featured{
                childImageSharp{
                    fluid(maxWidth: 350, maxHeight: 350){
                        ...GatsbyImageSharpFluid_withWebp
                        src
                    }
                }
            }
            created_at(formatString: "MMM DD, Y")
        }
    }
}
```

<br>

### Render Rich Text from Strapi ###

Since strapi rich text gets returned as markdown you will need to be able to render the markdown as html

For this install

```shell
npm install --save react-markdown
```

<br>
Then you can render it using the following using the data from your query... Example Below

```js
<ReactMarkdown source={post.Content} />
```

<br>

### A Blog Index Page ###

Notice we're using **kebabCase** from lodash line 7, and then using it on line 49 to create a slug from the title in Scrapi. We're also linking from /strapi-content/ as that is the url for the index in this example.

```js
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from 'react-markdown'
import { kebabCase } from 'lodash';

export const query = graphql`
    query{
        allStrapiBlogPosts{
            nodes{
                id
                Title
                Content
                Author{
                    id
                    username
                }
                Featured{
                    childImageSharp{
                        fluid{
                            ...GatsbyImageSharpFluid_withWebp
                            src
                        }
                    }
                }
            }
        }
    }
`

const StrapiPage = ({ data, location }) => (
    <Layout>
        <SEO
            title="Strapi"
            description="Gatsby using Strapi CMS"
            keywords={[`gatsby`, `strapi`, `javascript`, `react`]}
            pathname={location.pathname}
        />

        <section className="">
            <div className="container">
                <h1>Content from Strapi as headless CMS</h1>
                <articles>
                    {/* Strapi Posts Here */}
                    {data.allStrapiBlogPosts.nodes.map(post => (
                        <article>
                            <Link to={`/strapi-content/${kebabCase(post.Title)}`}><h2>{post.Title}</h2></Link>
                            <Img fluid={post.Featured.childImageSharp.fluid} />
                            <ReactMarkdown source={post.Content} />
                        </article>
                    ))}
                </articles>
            </div>
        </section>

    </Layout>
)

export default StrapiPage
```
<br>

### Handling Single Posts ###

**We first need to create urls based on all of the posts from graphql we do this in gatsby-node.js**

Notice we include **lodash** on line 2 so we can use kebab to create the **pretty url** on line 25 and we're creating the permalinks from /strapi-content/ since that is the main index page for the strapi blog posts. This example is only creating links for strapi posts, but you would do the same thing for other integrations...

I will show my full gatsby-node.js file at the very bottom which shows some other examples but not related specifically to this...

```js
//gatsby-node.js
const _ = require('lodash')
const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    /* Create Strapi Single Post URLs */
    const strapiBlogPostTemplate = path.resolve('./src/templates/strapi-blog-post.js')
    const strapiBlogPost = await graphql(`
        query{
            allStrapiBlogPosts{
                edges{
                    node{
                        id
                        Title
                    }
                }
            }
        }
    `)
    strapiBlogPost.data.allStrapiBlogPosts.edges.forEach((edge) => {
        createPage({
            component: strapiBlogPostTemplate,
            path: `/strapi-content/${_.kebabCase(edge.node.Title)}`,
            context: {
                id: edge.node.id
            }
        })
    })
}
```

<br>

### Single Post Query Example ###

For the single post we want to query for the single post based on the id since that will be unique...

```js
//Example Query
query($id: String!){
    strapiBlogPosts(id:{eq: $id}){
        id
        Title
        Content
        Author{
            id
            username
        }
        Featured{
            childImageSharp{
                fluid{
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
}
```

<br>

**The Single Post Template file should go in /src/templates/whatever-you-named-it.js**

Example

```js
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import ReactMarkdown from 'react-markdown'

export const query = graphql`
    query($id: String!){
        strapiBlogPosts(id:{eq: $id}){
            id
            Title
            Content
            Author{
                id
                username
            }
            Featured{
                childImageSharp{
                    fluid{
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    }
`

const StrapiBlogPost = ({ data, location }) => (
    <Layout>
        <SEO
            title={data.strapiBlogPosts.Title}
            description="Gatsby using Strapi CMS"
            keywords={[`gatsby`, `strapi`, `javascript`, `react`]}
            pathname={location.pathname}
        />

        <section className="">
            <div className="container">
                <article>
                    <h2>{data.strapiBlogPosts.Title}</h2>
                    <Img fluid={data.strapiBlogPosts.Featured.childImageSharp.fluid} />
                    <ReactMarkdown
                        source={data.strapiBlogPosts.Content}
                    />
                </article>
            </div>
        </section>

    </Layout>
)

export default StrapiBlogPost
```

<br>
<br>
<br>


**My full gatsby-node.js example**

Here is my full gatsby-node.js file which shows creating page "urls" for the different single docs sections and using onCreateNode to create a slug field if node.internal.type === 'MarkdownRemark' which would be a markdown file .md, which is then able to be used in graphql to query for unique markdown files based on the slug which is used for the urls for the single docs in the docs sections. Look at "how these docs were created" section for more on that.

```js
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')
const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'MarkdownRemark') {
        const slug = path.basename(node.fileAbsolutePath, '.md')

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    /* Create Gatsby Docs Single Post URLs */
    const docsTemplate = path.resolve('./src/templates/docs.js')
    const docs = await graphql(`
        query {
            allMarkdownRemark(filter: {fields: {sourceName: {eq : "gatsbydocs"}}}) {
                edges{
                    node{
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `)
    docs.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: docsTemplate,
            path: `/docs/gatsby/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })

    /* Create WordPress Single Post URLs */
    const wordpressTemplate = path.resolve('./src/templates/docs.js')
    const wordpress = await graphql(`
        query {
            allMarkdownRemark(filter: {fields: {sourceName: {eq : "wordpressdocs"}}}) {
                edges{
                    node{
                        fields{
                            slug
                        }
                    }
                }
            }
        }
    `)
    wordpress.data.allMarkdownRemark.edges.forEach((edge) => {
        createPage({
            component: wordpressTemplate,
            path: `/docs/wordpress/${edge.node.fields.slug}`,
            context: {
                slug: edge.node.fields.slug
            }
        })
    })

    /* Create Strapi Single Post URLs */
    const strapiBlogPostTemplate = path.resolve('./src/templates/strapi-blog-post.js')
    const strapiBlogPost = await graphql(`
        query{
            allStrapiBlogPosts{
                edges{
                    node{
                        id
                        Title
                    }
                }
            }
        }
    `)
    strapiBlogPost.data.allStrapiBlogPosts.edges.forEach((edge) => {
        createPage({
            component: strapiBlogPostTemplate,
            path: `/strapi-content/${_.kebabCase(edge.node.Title)}`,
            context: {
                id: edge.node.id
            }
        })
    })
}
```

<br>
<br>
<br>

## Setting up Heroku for Strapi ##

To setup Strapi to be accessed from a url a good choice is Heroku. You can use the free plan for this.

First sign up for an account at <a href="https://signup.heroku.com/" target="_blank">Heroku Signup</a>

Once you have created an account you want to install <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank">Heroku CLI</a> and make sure you have GIT installed.

After you have installed Heroku CLI, open node console or terminal of choice and type the following. This will open a browser window to login you in...

```shell
heroku login
```

Next you want to cd to your strapi directory you installed locally then run the following command

```js
//note strapi-subdomain-name will be the url you access strapi on heroku e.g. strapi-subdomain-name.herokuapp.com
heroku create strapi-subdomain-name
```

Next we need to create a postgres database using the hobby-dev plan

```js
heroku addons:create heroku-postgresql:hobby-dev
```

Next run the following to see the heroku config which will show the url for the database config.

```js
heroku config
```

This should print something like this:
(This url is read like so: *postgres:// USERNAME : PASSWORD @ HOST : PORT : DATABASE_NAME*)

```
DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b.
```

You would then configure strapi to use these db variables using the following commands. Replacing each of the values with what was returned in the above url.

```
heroku config:set DATABASE_USERNAME=ebitxebvixeeqd
heroku config:set DATABASE_PASSWORD=dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf
heroku config:set DATABASE_HOST=ec2-50-37-231-192.compute-2.amazonaws.com
heroku config:set DATABASE_PORT=5432
heroku config:set DATABASE_NAME=d516fp1u21ph7b
```

Next we want to update the production database config with the following via code editor.

Path: ./config/environments/production/database.json.

```
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "bookshelf",
      "settings": {
        "client": "postgres",
        "host": "${process.env.DATABASE_HOST}",
        "port": "${process.env.DATABASE_PORT}",
        "database": "${process.env.DATABASE_NAME}",
        "username": "${process.env.DATABASE_USERNAME}",
        "password": "${process.env.DATABASE_PASSWORD}",
        "ssl": true
      },
      "options": {}
    }
  }
}
```

Now we need to install pg node module run the following command

```
npm install pg --save
```

**Open your code editor and edit the .gitignore and add package-lock.json to the bottom of the list**

Now we want to commit these changes
```
git init

git add .

git commit -am "Config for Heroku"

git push heroku master
```

After everything has been commited, we should then be able to type the following and it should open strapi on heroku. You might need to add /admin to get to the admin. You will need to reset the settings on heroku because it's using a database now instead of locally. So just re-create the admin, and users. If you added a content type on local, it should still show up with the fields you configured. However you will need to create the posts though as those will not port over... however you should setup Cloudinary before adding your images in the next step.

```
heroku open
```

## Setting up Cloudinary for Heroku ##

Create a free Cloudinary account https://cloudinary.com/

Open node terminal or temrinal choice, and cd to your strapi/extensions directory e.g.

```
cd C:\xampp\htdocs\react_projects\strapi\extensions
```

Then run the following to install the extension/plugin that strapi will use for cloudinary

```
npm i --save strapi-provider-upload-cloudinary
```

Now cd back to the strapi root and commit the extension/plugin

```
git add .

git commit -am "Installed Cloundinary Plugin"

git push heroku master
```

Now login to your strapi on heroku and go to plugins, click on FILES UPLOAD gear icon for settings and choose cloudninary as the provider and save.
Fill in the API info you receive from Cloudinary, you can get this from your cloudinary dashboard. https://cloudinary.com/console/welcome