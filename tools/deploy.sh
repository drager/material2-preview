#!/usr/bin/env sh

set -e

npm run build
cd build
git init
git remote add origin git@github.com:drager/material2-preview.git
git checkout -b gh-pages
git add -A
git commit -am 'Deploy'
git push origin gh-pages --force
