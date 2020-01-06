import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/strapi.css"
import Image from "../components/image"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import { kebabCase } from 'lodash';

export const query = graphql`
    query{
        allStrapiBlogPosts{
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
                <p>Strapi is an Open Source Headless CMS which is a great way to add content to Gatsby. Check out <a href="https://strapi.io/" target="_blank" rel="noopener noreferrer">Strapi</a></p>
                <articles className="strapi-posts">
                    {/* Strapi Posts Here */}
                    {data.allStrapiBlogPosts.nodes.map(post => {

                        //Lets set a default image to be used if our post doesn't have one...
                        //Otherwise the front end will fail if our graphql query returns Featured as null...
                        //This is because it wouldn't be able to find childImageSharp because it wouldn't exist for that post, which causes it to throw an error on the front end.
                        let defaultImage = <Image imgName="gatsby-astronaut.png" />
                        if (post.Featured) {
                            defaultImage = <Img fluid={post.Featured.childImageSharp.fluid} />
                        }

                        //Here is another scenario where we might want to show posts without a featured image as a full column row, and posts with a featured would be in a two column row etc.
                        //We would just replace <div class="col-sm-4">{ defaultImage }</div> with {defaultImage} and
                        //We would just replace the col-sm-8 class with the variable defaultClass to set the class
                        /*let defaultImage = ""
                        let defaultClass = "col-sm-12"
                        if (post.Featured) {
                            defaultImage = <div class="col-sm-4"><Img fluid={post.Featured.childImageSharp.fluid} /></div>
                            defaultClass = "col-sm-8"
                        }*/

                        return (
                            <article>
                                <div className="row">
                                    <div class="col-sm-4">
                                        <Link to={`/strapi-content/${kebabCase(post.Title)}`}>{defaultImage}</Link>
                                    </div>
                                    <div className="col-sm-8">
                                        <Link to={`/strapi-content/${kebabCase(post.Title)}`}><h2>{post.Title}</h2></Link>
                                        <small style={{ display: 'block', marginBottom: `20px` }}>By {post.author.username} | {post.created_at}</small>
                                        <p>{post.Excerpt}</p>
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

export default StrapiPage