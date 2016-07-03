#!/usr/bin/env node

const fs = require('fs')
require('shelljs/global')
const htmlBeauty = require('html')

const docsOutputPath = './output'

main()

/*
 * TODO:
 * We should be able to git clone the material2 repository, copy the
 * documentation, generate html from markdown, move the generated files
 * and then remove the repository.
 */

function main() {
  exec(`generate-md --layout plain --input ./docs --output ./${docsOutputPath}`)

  copyGeneratedDocs()
}

function copyGeneratedDocs() {
  const componentsPath = './src/app/components'
  let dest = ''

  find(docsOutputPath).then(files => {
    files.forEach(file => {
      const name = file.split('/')[2]
      switch (name) {
        case 'button':
          dest = `${componentsPath}/app-md-button/app-md-button.html`
          break
        case 'button-toggle':
          dest = null
          // dest = `${componentsPath}/app-md-button-toggle/app-md-button-toggle.html`
          break
        case 'card':
          dest = `${componentsPath}/app-md-card/app-md-card.html`
          break
        case 'checkbox':
          dest = `${componentsPath}/app-md-checkbox/app-md-checkbox.html`
          break
        case 'grid-list':
          dest = `${componentsPath}/app-md-grid-list/app-md-grid-list.html`
          break
        case 'icon':
          dest = `${componentsPath}/app-md-icon/app-md-icon.html`
          break
        case 'input':
          dest = `${componentsPath}/app-md-input/app-md-input.html`
          break
        case 'list':
          dest = `${componentsPath}/app-md-list/app-md-list.html`
          break
        case 'progress-bar':
          dest = `${componentsPath}/app-md-progress-bar/app-md-progress-bar.html`
          break
        case 'progress-circle':
          dest = `${componentsPath}/app-md-progress-circle/app-md-progress-circle.html`
          break
        case 'radio':
          dest = `${componentsPath}/app-md-radio/app-md-radio.html`
          break
        case 'sidenav':
          dest = `${componentsPath}/app-md-sidenav/app-md-sidenav.html`
          break
        case 'slide-toggle':
          dest = `${componentsPath}/app-md-slide-toggle/app-md-slide-toggle.html`
          break
        case 'tabs':
          dest = `${componentsPath}/app-md-tabs/app-md-tabs.html`
          break
        case 'toolbar':
          dest = `${componentsPath}/app-md-toolbar/app-md-toolbar.html`
          break
      }

      dest && copyDocFile(file, dest)
    })
  }).catch(error => {
    console.error(error)
  })
}

function find(path) {
  if (path === undefined || typeof path !== 'string' ||
      path.length <= 0) {
    throw new Error('The path needs to be a string!')
  }

  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error)
      }

      const promises = files.map((name) => {
        const filePath = `${path}/${name}`
        const stat = fs.statSync(filePath)
        if (stat.isFile()) {
          if (/\README.html$/.test(filePath)) {
            return filePath
          }
        } else if (stat.isDirectory()) {
          return find(filePath)
        }
      })

      Promise.all(promises).then((files) => {
        files = files.reduce((a, b) => a.concat(b), []).filter((a) => a !== undefined)
        resolve(files)
      })
    })
  })
}

function copyDocFile(from, to) {
  const readStream = fs.createReadStream(from)
  const writeStream = fs.createWriteStream(to)
  console.info('Copying doc to:', to)

  const stream = readStream.on('data', (chunk) => {
    // Some documentation are outputting "{{}}" which will make Angular crash...
    // TODO: Should be able to do something nicer here.
    chunk = chunk.toString().replace(/[{]/g, '{')
    chunk = chunk.toString().replace(/[}]/g, '} ')
    writeStream.write(htmlBeauty.prettyPrint(chunk))
  })
}
