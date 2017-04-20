const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const Records = require('spike-records')
const locals = {}

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  reshape: htmlStandards({
    locals: (ctx) => Object.assign(locals, { pageId: pageId(ctx) })
  }),
  postcss: cssStandards(),
  babel: jsStandards,
  plugins: [
    // pull in carrot staff data and split into pages via a reduce function
    new Records({
      addDataTo: locals,
      pages: {
        url: 'https://xn--digilr-fua.se/wp-json/wp/v2/pages?per_page=10&parent=112',
        template: {
          path: '/views/templates/single.sgr',
          output: (post) => { return `posts/${post.slug}.html` }
        }
      },
      sitemeta: { file: 'data.json' },
    })
  ]
}
