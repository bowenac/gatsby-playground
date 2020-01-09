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
    const strapiBlogPostTemplate = path.resolve('./src/templates/strapi-post.js')
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
}