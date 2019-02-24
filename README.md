# Styleguide

This sample project serves as a starting point for styleguides and module libraries.

_For example, go and visit [chlorophyllkid.com/styleguide](https://www.chlorophyllkid.com/styleguide)._


## Setup

1.  make sure your system runs Node 7.6 or higher (`node -v`)
2.  clone this repository
3.  rename project and edit git remote
4.  run `npm install` in project root
5.  start developing :smile:

_An up-to-date version for [create-styleguide](https://github.com/chlorophyllkid/create-styleguide) is comming soon._


## Project structure

| Path    | Description                                  |
| ------- | -------------------------------------------- |
| `app`   | contains the styleguide *(in .gitignore)*    |
| `dist`  | contains compiled and reusable modules       |
| `docs`  | contains the styleguide example for github   |
| `src`   | contains sourcecode, media and static assets |
| `tasks` | contains build and watch scripts             |


## NPM scripts

| Script       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `start`      | runs build and watch task (for development)                  |
| `build`      | builds `app` directory (for styleguide)                      |
| `docs`       | builds `docs` directory (for github)                         |
| `test`       | runs linting and tape tests                                  |
| `lint`       | runs linting                                                 |
| `dist-patch` | builds `dist` directory and increments package version 0.0.x |
| `dist-minor` | builds `dist` directory and increments package version 0.x.0 |
| `dist-major` | builds `dist` directory and increments package version x.0.0 |

_Actually, there are some more scripts. If you're interested, go look them up in our [package.json](https://github.com/chlorophyllkid/styleguide/blob/master/package.json). :wink:_

## Contributing

If you found a bug, have an idea for a feature or simply want to get involved, please follow our [contribution guidelines](https://github.com/chlorophyllkid/styleguide/blob/master/.github/CONTRIBUTING.md) and respect the [code of conduct](https://github.com/chlorophyllkid/styleguide/blob/master/.github/CODE_OF_CONDUCT.md).


## License

This project is licensed under [MIT](https://github.com/chlorophyllkid/styleguide/blob/master/LICENSE).
