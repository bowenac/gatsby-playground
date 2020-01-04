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
}