# GPT Bookmarklet
Ads Info Bookmarklet for working with Google Publisher Tags API

[![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE)

_Proudly built by:_

<a href="https://technology.condenast.com"><img src="https://user-images.githubusercontent.com/1215971/35070721-3f136cdc-fbac-11e7-81b4-e3aa5cc70a17.png" title="Conde Nast Technology" width=350/></a>

# Development

## Prerequisites

[nvm](https://github.com/nvm-sh/nvm)

[npm](https://www.npmjs.com/)

## Install

```
nvm use
npm install
```

## Usage

```
nvm use
npm run dev
```

## Bookmarklet
Follow the below steps to use this tool as a bookmarklet on any page running GPT
1. Update ./src/top/config.js with the directory path where your dist files will be hosted
2. ```npm run build:prod```
3. Host the generated files from the ./dist directory on your server
4. Create a new bookmark using the below code snippet as the bookmark's page url.

```
javascript:var s=document.createElement('script');s.setAttribute('src', 'https://REPLACE_WITH_PATH_TO_DIST_ASSETS/index.js');document.getElementsByTagName('head')[0].appendChild(s);
```
- - - -

## Features
* Defined Ad Slots
* Response Information
* Ad Unit Paths
* Defined Sizes
* Requestable Sizes from Ad Slot Mapping
* Slot Level Targeting Key/Value pairs
* Service Level Targeting Key/Value pairs
* Parsed Network Requests

## Thanks

Thanks to the Conde Nast Ad Tech Team
Thanks to GPT Developers at Google

## Contributors

See the list of [contributors](https://github.com/CondeNast/gpt-bookmarklet/contributors) who participated in writing this tool.

## Preview

![Screenshot](/images/preview1.png)

![Screenshot](/images/preview2.png)
