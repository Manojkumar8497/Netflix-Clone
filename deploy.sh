#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd build

git init
git add -A
git commit -m 'deploy'
# Github Remote file
git push -f git@github.com:Manojkumar8497/Netflix-Clone.git master:gh-pages

cd -