#!/bin/sh

# clear the temp pubic directory
rm -rf dist

# Generate static website. Files will be placed in public folder
npm run build

# Move the files to S3 bucket for hosting
aws s3 sync ./dist s3://transcribe.prabhatsharma.in/ --acl=public-read --profile=personal

# invalidate cloudfront cache so that latest files can be served - 	d3udy0w506oho.cloudfront.net
aws cloudfront create-invalidation --distribution-id E5P576ATE8IST --paths=/* --profile=personal
