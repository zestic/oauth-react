# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

This project is a React web library for OAuth authentication. It contains the following:

- The library package in the root directory.
- Example apps in the `examples/` directory (Next.js, React Router, Vite).

To get started with the project, run `npm install` in the root directory to install the required dependencies:

```sh
npm install
```

The [example apps](/examples/) demonstrate usage of the library. You can run them to test any changes you make.

They are configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example apps after rebuilding.

### Building the library

To build the library:

```sh
npm run build
```

To build in watch mode during development:

```sh
npm run dev
```

### Running examples

To run the Vite example:

```sh
cd examples/vite
npm install
npm run dev
```

To run the Next.js example:

```sh
cd examples/nextjs
npm install
npm run dev
```

To run the React Router example:

```sh
cd examples/react-router
npm install
npm run dev
```

### Code quality

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
npm run type-check
npm run lint
```

To fix formatting errors, run the following:

```sh
npm run lint:fix
npm run format
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
npm test
```

To run tests in watch mode:

```sh
npm run test:watch
```

To run tests with coverage:

```sh
npm run test:coverage
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module.
- `test`: adding or updating tests, e.g. add integration tests.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Vitest](https://vitest.dev/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) for version management and GitHub Actions for automated publishing.

### Release Process

1. **Create a version bump and tag**:
   ```sh
   npm run release
   ```

2. **Push the tag to trigger automated publishing**:
   ```sh
   git push --follow-tags
   ```

3. **GitHub Actions automatically**:
   - Runs tests and linting
   - Builds the package
   - Publishes to npm
   - Creates GitHub release

### Scripts

The `package.json` file contains various scripts for common tasks:

- `npm install`: setup project by installing dependencies.
- `npm run build`: build the library for production.
- `npm run dev`: build the library in watch mode.
- `npm run type-check`: type-check files with TypeScript.
- `npm run lint`: lint files with ESLint.
- `npm run test`: run unit tests with Vitest.
- `npm run test:watch`: run tests in watch mode.
- `npm run test:coverage`: run tests with coverage report.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
