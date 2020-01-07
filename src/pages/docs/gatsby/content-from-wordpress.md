---
title: "Content From Wordpress"
---

## Barebones theme on my repo ##

I created a barebones theme that will not render anything on the WordPress front end...
<br>
https://github.com/bowenac/gatsby-wp-theme

We first need to install gatsby-source-wordpress and add to gatsby-config.js

```shell
npm install --save gatsby-source-wordpress
```

```js
{
    resolve: `gatsby-source-wordpress`,
    options: {
        /*
            * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
            * Example : 'dev-gatbsyjswp.pantheonsite.io' or 'www.example-site.com'
            */
        baseUrl: `gatsbywp.adamcbowen.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
    },
},
```

<br>
<br>

Then create urls for single posts like we have done for other types in gatsby-node.js in createpages.

```js
/* Create WordPress Single Post URLs */
const wordpress_single_post_template = path.resolve('./src/templates/wordpress-post.js')
const wordpress_blog_post = await graphql(`
    query{
        allWordpressPost {
            edges{
                node {
                    id
                    slug
                }
            }
        }
    }
`)
wordpress_blog_post.data.allWordpressPost.edges.forEach((edge) => {
    createPage({
        component: wordpress_single_post_template,
        path: `/wordpress-content/${edge.node.slug}`,
        context: {
            id: edge.node.id
        }
    })
})
```

<br>
<br>

**An example of custom post type recipes**

```js
/* Create WordPress Recipe Post URLs */
const wordpress_single_recipe_template = path.resolve('./src/templates/wordpress-recipe-post.js')
const wordpress_recipe_post = await graphql(`
    query{
        allWordpressWpRecipes {
            edges{
                node {
                    id
                    slug
                }
            }
        }
    }
`)
wordpress_recipe_post.data.allWordpressWpRecipes.edges.forEach((edge) => {
    createPage({
        component: wordpress_single_recipe_template,
        path: `/wordpress-content/recipe/${edge.node.slug}`,
        context: {
            id: edge.node.id
        }
    })
})
```

## Advanced Custom Fields ##

Install the following plugin on WordPress, this will allow us to see ACF fields in GraphQL. There is also wp-graphql but this worked fine for me.
https://github.com/airesvsg/acf-to-rest-api

<br>
<br>

**Note we need to add a custom function as a plugin or in a themes functions.php**

We need this function to return null for fields that are empty, otherwise GraphQl will fail as it can't find the field.
<br>
This is added to my theme on github linked in the beginning.

```php
/*
* We need to set ACF fields that are empty to null
* to prevent GraphQl from breaking for posts without values in fields
*/
if (!function_exists('acf_nullify_empty')) {
    function acf_nullify_empty($value, $post_id, $field) {
        if (empty($value)) {
            return null;
        }
        return $value;
    }
}
add_filter('acf/format_value', 'acf_nullify_empty', 100, 3);
```


## Example Page Showing Regular WP Posts, and the custom recipes post type ##

```js
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/strapi.css"
import Image from "../components/image"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"

export const query = graphql`
    query{
        allWordpressPost {
            nodes {
                id
                slug
                title
                excerpt
                content
                author {
                    name
                }
                featured_media {
                    alt_text
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 350, maxHeight: 350) {
                                ...GatsbyImageSharpFluid_withWebp
                                src
                            }
                        }
                    }
                }
                date(formatString: "MMM DD, Y")
            }
        }
        allWordpressWpRecipes {
            nodes {
                id
                slug
                title
                excerpt
                content
                author {
                    name
                }
                featured_media {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 350, maxHeight: 350) {
                                ...GatsbyImageSharpFluid_withWebp
                                src
                            }
                        }
                    }
                }
                date(formatString: "MMM DD, Y")
                acf{
                    photo_credit
                }
            }
        }
    }
`

const WordPressPage = ({ data, location }) => (
    <Layout>
        <SEO
            title="WordPress Content Source for Gatsby"
            description="Gatsby using WordPress CMS"
            keywords={[`gatsby`, `wordpress`, `javascript`, `react`]}
            pathname={location.pathname}
        />

        <section className="">
            <div className="container">
                <h1>Content from WordPress as CMS</h1>
                <h2>Below is some mockup content from WordPress hosted on cheap shared hosting.</h2>
                <p>Default posts from WordPress, no custom fields. Just title, content, and featured image.</p>
                <articles className="strapi-posts">
                    {/* wprdpress Posts Here */}
                    {data.allWordpressPost.nodes.map(post => {

                        //Lets set a default image to be used if our post doesn't have one...
                        //Otherwise the front end will fail if our graphql query returns Featured as null...
                        //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
                        let defaultImage = <Image imgName="gatsby-astronaut.png" />
                        if (post.featured_media) {
                            defaultImage = <Img fluid={post.featured_media.localFile.childImageSharp.fluid} />
                        }
                        return (
                            <article>
                                <div className="row">
                                    <div class="col-sm-4">
                                        <Link to={`/wordpress-content/${post.slug}`}>{defaultImage}</Link>
                                    </div>
                                    <div className="col-sm-8">
                                        <Link to={`/wordpress-content/${post.slug}`}><h2>{post.title}</h2></Link>
                                        <small style={{ display: 'block', marginBottom: `20px` }}>By {post.author.name} | {post.date}</small>
                                        <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </articles>

                <h2>Below posts using a custom post type called recipes from WordPress.</h2>
                <p>Recipe posts from WordPress, with advanced custom fields and nested repeaters.</p>
                <articles className="strapi-posts">
                    {/* wprdpress Posts Here */}
                    {data.allWordpressWpRecipes.nodes.map(post => {

                        //Lets set a default image to be used if our post doesn't have one...
                        //Otherwise the front end will fail if our graphql query returns Featured as null...
                        //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
                        let defaultImage = <Image imgName="gatsby-astronaut.png" />
                        if (post.featured_media) {
                            defaultImage = <Img fluid={post.featured_media.localFile.childImageSharp.fluid} />
                        }
                        return (
                            <article>
                                <div className="row">
                                    <div class="col-sm-4">
                                        <Link to={`/wordpress-content/recipe/${post.slug}`}>{defaultImage}</Link>
                                    </div>
                                    <div className="col-sm-8">
                                        <Link to={`/wordpress-content/recipe/${post.slug}`}><h2 dangerouslySetInnerHTML={{ __html: post.title }} /></Link>
                                        <div style={{ display: 'block', marginBottom: `20px` }}>
                                            <small>By {post.author.name} | {post.date}</small>
                                            <small dangerouslySetInnerHTML={{ __html: post.acf.photo_credit }}></small>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </articles>

            </div>
        </section>

    </Layout >
)

export default WordPressPage
```

## Single Post Template ##

```js
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import { graphql } from "gatsby"

export const query = graphql`
    query($id: String!){
        wordpressPost(id: {eq: $id}) {
            title
            content
            featured_media {
                alt_text
                localFile {
                    childImageSharp {
                        fluid(duotone: {highlight: "#000000", shadow: "#000000", opacity: 35}){
                            ...GatsbyImageSharpFluid_withWebp
                            src
                        }
                    }
                }
            }
            date(formatString: "MMM DD, Y")
        }
    }
`

const WordPressBlogPost = ({ data, location }) => {

    //Lets set a default image to be used if our post doesn't have one...
    //Otherwise the front end will fail if our graphql query returns Featured as null...
    //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
    let heroImage = <section className="fluid hero t-center" style={{ backgroundColor: '#040e18', }}> <div class="container"><div class="inner">{data.wordpressPost.title && <h1>{data.wordpressPost.title}</h1>}</div></div></section >
    if (data.wordpressPost.featured_media) {
        heroImage = <BackgroundImage
            Tag="section"
            className={`fluid hero t-center`}
            fluid={data.wordpressPost.featured_media.localFile.childImageSharp.fluid}
            backgroundColor={`#040e18`}
        >
            <div className="container">
                <div className="inner">
                    {data.wordpressPost.title && <h1>{data.wordpressPost.title}</h1>}
                </div>
            </div>
        </BackgroundImage>
    }

    return (
        <Layout>
            <SEO
                title={data.wordpressPost.title}
                description="Gatsby using Strapi CMS"
                keywords={[`gatsby`, `strapi`, `javascript`, `react`]}
                pathname={location.pathname}
            />

            {heroImage}

            <section className="strapi-post">
                <div className="container">
                    <article>
                        <div dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}></div>
                    </article>
                </div>
            </section>
        </Layout>
    )

}

export default WordPressBlogPost
```

<br>
<br>

## Single Recipes Template with ACF nested repeater fields##

```js
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import { graphql } from "gatsby"

export const query = graphql`
    query($id: String!){
        wordpressWpRecipes(id: {eq: $id}) {
            title
            content
            featured_media {
                alt_text
                localFile {
                    childImageSharp {
                        fluid(duotone: {highlight: "#000000", shadow: "#000000", opacity: 35}){
                            ...GatsbyImageSharpFluid_withWebp
                            src
                        }
                    }
                }
            }
            acf{
                details {
                    servings
                    prep_time
                    cook_time
                }
                ingredients{
                    ingredient_list{
                        label
                        ingredient {
                            ingredient
                        }
                    }
                }
                directions{
                    directions_list{
                        label
                        step{
                            step
                        }
                    }
                }
            }
            date(formatString: "MMM DD, Y")
        }
    }
`

const WordPressRecipePost = ({ data, location }) => {

    //Lets set a default image to be used if our post doesn't have one...
    //Otherwise the front end will fail if our graphql query returns Featured as null...
    //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
    let heroImage = <section className="fluid hero t-center" style={{ backgroundColor: '#040e18', }}> <div class="container"><div class="inner">{data.wordpressWpRecipes.title && <h1 dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipes.title }} />}</div></div></section >
    if (data.wordpressWpRecipes.featured_media) {
        heroImage = <BackgroundImage
            Tag="section"
            className={`fluid hero t-center`}
            fluid={data.wordpressWpRecipes.featured_media.localFile.childImageSharp.fluid}
            backgroundColor={`#040e18`}
        >
            <div className="container">
                <div className="inner">
                    {data.wordpressWpRecipes.title && <h1 dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipes.title }} />}
                </div>
            </div>
        </BackgroundImage>
    }

    return (
        <Layout>
            <SEO
                title={data.wordpressWpRecipes.title}
                description="Gatsby using WordPress CMS with Advanced Custom Fields"
                keywords={[`gatsby`, `WordPress`, `javascript`, `react`]}
                pathname={location.pathname}
            />

            {heroImage}

            <section className="strapi-post">
                <div className="container">
                    <article>
                        <div dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipes.content }}></div>

                        <div className="recipe-content">
                            {data.wordpressWpRecipes.acf.details.servings && <p>Servings: {data.wordpressWpRecipes.acf.details.servings}</p>}
                            {data.wordpressWpRecipes.acf.details.prep_time && <p>Prep Time: {data.wordpressWpRecipes.acf.details.prep_time}</p>}
                            {data.wordpressWpRecipes.acf.details.cook_time && <p>Cook Time: {data.wordpressWpRecipes.acf.details.cook_time}</p>}

                            <div className="row">
                                <div className="col-lg-6">
                                    {data.wordpressWpRecipes.acf.ingredients && data.wordpressWpRecipes.acf.ingredients.map(post => {
                                        return (
                                            <div>
                                                {post.ingredient_list.ingredient && <h2>Ingredients</h2>}
                                                {post.ingredient_list.label && <h3>{post.ingredient_list.label}</h3>}
                                                {post.ingredient_list.ingredient &&
                                                    <ul>
                                                        {post.ingredient_list.ingredient.map(post => {
                                                            return (
                                                                <li>{post.ingredient}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="col-lg-6">
                                    {data.wordpressWpRecipes.acf.directions && data.wordpressWpRecipes.acf.directions.map(post => {
                                        return (
                                            <div>
                                                {post.directions_list.step && <h2>Directions</h2>}
                                                {post.directions_list.label && <h3>{post.directions_list.label}</h3>}
                                                {post.directions_list.step &&
                                                    <ul>
                                                        {post.directions_list.step.map(post => {
                                                            return (
                                                                <li>{post.step}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </article>
                </div>
            </section>
        </Layout>
    )

}

export default WordPressRecipePost
```