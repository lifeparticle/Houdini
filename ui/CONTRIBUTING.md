## Before you contribute

-   Is it necessary?
-   Does it make developing BinaryTree easier?
-   Does it fix a bug? -> Create an [issue](https://github.com/lifeparticle/binarytree/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=) with the steps to reproduce
-   Does it break anything? -> Build locally, Run the tests
-   Does it stick to the original goal of BinaryTree -> Developer Productivity Tools Designed to Help You Save Time
-   Does it reduce the build size?
-   Does it improve the user experience?
-   Does it improve the performance?

## Installation

### Prerequisites

Ensure these dependencies are installed before proceeding:

```shell
node -v
# 18.16.1

yarn -v
# 3.6.1
```

If you don't have these installed, please visit [Node.js](https://nodejs.org/en) official website and [Yarn](https://yarnpkg.com/) Package Manager to download and install them.

### Installing Project Dependencies

Install project dependencies using Yarn with the `--immutable` flag to ensure consistent package versions:

```shell
yarn install --immutable
```

## Running the Project Locally

To run the project locally, execute the following command:

```shell
yarn dev
```

## Running Linters

Run the following command to execute the linter:

```shell
yarn lint
```

## Running Tests

You can also run tests to ensure the project's functionality:

```shell
yarn test
```

## How to contribute

### Git workflow

1.  Fork the repo
2.  Clone your fork
3.  Sync your local main

    3.1.

    ```shell
    git remote add upstream git@github.com:lifeparticle/binarytree.git
    ```

    3.2.

    ```shell
    git fetch upstream
    ```

    3.3.

    ```shell
    git branch --set-upstream-to=upstream/main main
    ```

    3.4.

    ```shell
    git pull
    ```

4.  Run locally

    4.1 Move to the project directory and install dependencies

    ```shell
    cd ui
    yarn install --immutable
    yarn start
    ```

5.  Create a branch

    ```shell
    git branch issue-2 # use issue_number, replace issue-2 with appropriate branch name
    git checkout issue-2
    ```

6. Update the [CHANGELOG](./CHANGELOG.md) file  with the changes you have made.

7.  Push your changes to your fork with git push
    ```shell
    git add .
    git commit -m"Write a meaningfull commit message"
    git push
    ```
8.  Create a pull request

    8.1 Use the url from the terminal

    ```shell
    remote: Create a pull request for 'issue-2' on GitHub by visiting:
    remote:      https://github.com/........................
    ```

    8.2 If you're having problem finding the url

        a) https://github.com/lifeparticle/binarytree/pulls

        b) Click the button 'New pull request'

        c) Click the link 'compare across forks'

        d) Change head repository to your fork

        e) Change the branch to your branch

        f) Create pull request

9.  Repeat

    ```shell
    git checkout main
    git pull
    ```

### Coding guidelines

#### 1: When do you update the major, minor, and patch versions?

**A:** We follow the Semantic Versioning (SemVer) standard for versioning our project. Here's how we determine version updates:

| Change Description                  | Version Update |
| ----------------------------------- | -------------- |
| UI changes (backwards incompatible) | Major Version  |
| New features or feature changes     | Minor Version  |
| Bug fixes (backwards compatible)    | Patch Version  |

#### 2. How to use absolute paths instead of relative paths?

Using absolute paths instead of relative paths can significantly enhance readability and maintainability.

**Relative Path Example:**

```javascript
import MyComponent from "../../../components/MyComponent";
```

**Absolute Path Example:**

```javascript
import MyComponent from "components/MyComponent";
```

#### 3. How to structure folders and files for a feature?

When structuring folders and files, it's important to ensure they are organized in a way that makes sense for the project. This can help improve efficiency and maintainability. Here is a proposed structure that offers clear organization for pages, components, and utilities, facilitating seamless navigation within the project.

-   Use PascalCase for component files and folders (e.g., `Button.jsx`).

```
PageName/
├── index.tsx
├── PageName.tsx
├── PageName.module.scss # Combines styles for PageName, CompA, and CompB
├── components/
│   ├── CompA.tsx
│   ├── CompB.tsx
├── useHookName.ts # Put this inside a hooks folder if you have more than one hooks
├── someData.ts
├── helper.ts
└── __tests__/
    └── PageName.test.tsx
```

**`PageName/`**: Root directory for a specific page in the React application.

-   **`index.tsx`**: Entry file for the `PageName` directory, typically used to export the main page component.
-   **`PageName.tsx`**: The main React component file for the page, containing JSX and logic for `PageName`.
-   **`PageName.module.scss`**: SCSS module with styles for `PageName` and its child components.
-   **`components/`**: Subdirectory for components part of or used by `PageName`.
    -   **`CompA.tsx`**: React component file for `CompA`.
    -   **`CompB.tsx`**: React component file for `CompB`.
-   **`hooks/`**: Directory for custom hooks relevant to `PageName` or its components.
    -   **`useHookName.ts`**: Custom hook file.
-   **`someData.ts`**: File holding specific data relevant to `PageName`.
-   **`helper.ts`**: File holding helper functions relevant to `PageName`.
-   **`__tests__/`**: Directory for test files related to `PageName`.
    -   **`PageName.test.tsx`**: Test file for the `PageName` component.

Adopting consistent naming conventions helps in understanding and navigating the codebase.

#### 4. How to add a feature?

Adding a new feature may seem daunting at first, but by following these steps and working together can ensure a smooth and efficient process.

4.1 If there is no related issue then create a new one and clearly describe the feature.

4.2 Design a low-fidelity mockup of the feature. This helps in visualizing the user interface and the user experience. Ensure that the design aligns with the project's design guidelines and style.

4.3 Wait for feedback and approval before proceeding. Make any necessary revisions based on the feedback received.

4.4 Once the mockup is approved, you can begin the development process. Remember to write clean, readable, and maintainable code.

4.5. Use scaffdog to create the page folder

```shell
npx scaffdog generate
```

```shell
? Please select a document. page.md
? Please select the output destination directory. src/pages
? Please enter a page name. PageA
```

It will create the following files and folders structure:

```shell
PageA/
|── PageA.module.scss
|── PageA.tsx
|── __tests__/
|   |── PageA.test.tsx
|── index.ts
```

4.6. Update files

- `ui/src/pages/index.ts`

- `ui/src/data/featureData.ts`

- `ui/src/data/helpData.ts`

- `ui/src/data/menuData.ts`

- `ui/src/data/routeData.tsx`

4.7 Add tests for a feature

-   Identify the key functionalities of your feature that need testing.
-   Define test cases for these functionalities, including both positive and negative scenarios.
-   Ensure your test cases cover all critical paths and edge cases.
-   Place your test scripts in the `__tests__` folder within your feature directory (in this case, `PageA/__tests__`).
-   Mock any external dependencies or modules that your feature interacts with. This ensures that your tests are focused solely on the feature's functionality.
-   Use faker to generate fake data for your tests.

4.8 Raise a PR for your feature

