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