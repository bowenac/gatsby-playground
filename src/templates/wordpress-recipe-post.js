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
            date(formatString: "MMM DD, Y")
            author {
                name
            }
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
                photo_credit
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

                        <div style={{ display: 'block', marginBottom: `20px` }}>
                            <small>By {data.wordpressWpRecipes.author.name} | {data.wordpressWpRecipes.date}</small>
                            {data.wordpressWpRecipes.acf.photo_credit && <small dangerouslySetInnerHTML={{ __html: data.wordpressWpRecipes.acf.photo_credit }}></small>}
                        </div>

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