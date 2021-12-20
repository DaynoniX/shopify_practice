# Setup Local Environment

Follow the steps for installing local environment.

### VSCode

Use [VSCode](https://code.visualstudio.com/) as the main IDE. It is free and well supported.

- Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) formatter for Visual Studio Code, because it works with .editorconfig file.
- Install [SonarLint extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode). It will add code quality hints.

### Tools on the board

- .editorconfig file. It helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [ESlint](https://eslint.org/). Statically analyzes your JavaScript code.
- [Stylelint](https://stylelint.io/). Helps you avoid errors and enforce conventions in your styles.
- [Shopify CLI and Theme Check](https://shopify.dev/themes/tools/theme-check). Linter for the Liquid and JSON inside your theme and theme app extensions.
- Prettier is used to auto format files, ESLint and Stylelint are using the Prettier code conventions.

### Installation process

- Copy package.json.sample and rename it to package.json.
- Install NPM modules with `npm install`
- Install Shopify Theme Check via Shopify CLI [https://shopify.dev/themes/tools/theme-check](https://shopify.dev/themes/tools/theme-check)
  - Mac version:
    - `brew tap shopify/shopify`
    - `brew install shopify-cli`
  - Windows version:
    - `gem install shopify-cli`
- Verify Shopify CLI installation with `shopify version`. The command returns a version number.

### Usage

- JavaScript validation. Run `npm run eslint`
- JavaScript autofixes by ESlint. Run `npm run eslint-fix`. Be aware of what you have fixed by it. It is easy to push something that you was not aware of, if you have used the automated JS fixes. **Use with caution**.
- Stylelint CSS and SCSS validation. Run `npm run stylelint`
- CSS and SCSS autofixes via Stylelint. Run `npm run stylelint-fix`. **Use with caution**.
- Shopify Liquid validation. Run `npm run theme-check`
- Multiple validations at one time. Run `npm run validate`
- Prettier autoformat JavaScript files by running `npm run prettify-js`
- Prettier autoformat CSS/SCSS files by running `npm run prettify-css`

### Styles linting 

Take in consideration, that Stylelint auto fix uses [order-config-standard](https://www.npmjs.com/package/stylelint-order-config-standard) that sorts related property declarations by grouping together following the order:

- Positioning
- Box Model
- Typography
- Visual
- Animation
- Misc

### Output errors to file

Sometimes you need to output errors to the .txt file. It will give the log file that is easy to go through.

- Use this kind of construction to output the log output to the file `npm run eslint > errors.txt`.

### Browserslist

.browserslistrc is a config to share target browsers and Node.js versions between different front-end tools, like Autoprefixer or PostCSS.

[Browserslist docs](https://github.com/browserslist/browserslist#readme)

- Run `npx browserslist` in the project directory to see what browsers are supported according to your .browserslistrc config file. It uses defaults configuration, and sometimes it is useful to know, what browsers versions are considered as defaults at this moment.

### Troubleshooting

If you see that autoformatting is not working as expected (it is not adding proper indent size, etc.), you should check what plugin VSCode uses for formatting this type of file.

Launch `Shift+Command+P` (Mac) or `Shift+Crtl+P` (Windows) and enter `Format Document With`. You will open the default and available plugins to use to autoformat your opened file. Sometimes there will be other plugins associated with this opened file type. Choose Prettier.

If you want to set the default code formatter, go to VSCode settings and enter `Editor: Default Formatter` and choose Prettier.
