# generator-react-ts-component-dir

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-ts-component-dir using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-ts-component-dir
```

Then generate directory with React component:

```bash
yo react-ts-component-dir
```

## What this generator does

This generator has been made as a convenient way to create React component
inside the directory with all necessary files.

## API

```bash
yo react-ts-component-dir [component_name] [path] [--styles] [--less] [--sass]
```
### component_name
This parameter provides a component name, making it uppercase automatically.
However, be aware of typing names in camelcase:
```bash
yo react-ts-component-dir header // -> ✔ Header dir will be generated
yo react-ts-component-dir anotherHeader // -> ✔ AnotherHeader dir will be generated
yo react-ts-component-dir anotherheader // -> ✖ Anotherheader dir will be generated
```
This parameter is not required, so generator will fallback into "Component" name if not provided%
```bash
yo react-ts-component-dir // -> Component component will be generated
```

### path
This parameter provides a path in which generator should create component's directory.
It's not required, so generator will fallback into './' path if not provided.
```bash
yo react-ts-component-dir header
...
- store
- components
- Header <- will be generated here
- utils
...

yo react-ts-component-dir header ./components/MainLayout

...
- store
- components
  - MainLayout
    - Header <- will be generated here
- utils
...
```

### --styles
- shortcut: --s
- default value: true

Generator will add stylesheet file into the dir. To prevent this behaviour
call generator with --no-styles option.

### --less
- shortcut: --le
- default value: false

Generator will add .less stylesheet into the component's dir if provided.

### --sass
- shortcut: --sa
- default value: false

Generator will add .sass stylesheet into the component's dir if provided.

## License

MIT © Olga Klimonova
