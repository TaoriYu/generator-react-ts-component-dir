"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs-extra");

const PATH = path.join(__dirname, "../generators/app");

function capitalize(str) {
  const [firstLetter, ...rest] = str;
  return [firstLetter.toUpperCase(), ...rest].join("");
}

describe("generator's componentName arg", () => {
  test.each`
    componentName | expected
    ${undefined}  | ${"component"}
    ${"some"}     | ${"some"}
  `(
    "creates $expected name component when $componentName provided",
    ({ componentName, expected }) => {
      return helpers
        .run(PATH)
        .withArguments(componentName ? [`${componentName}`] : [])
        .then(() => {
          assert.file([
            `${capitalize(expected)}/${capitalize(expected)}.tsx`,
            `${capitalize(expected)}/${expected.toLowerCase()}.css`,
            `${capitalize(expected)}/index.ts`
          ]);
        });
    }
  );
});

describe("generator's path param", () => {
  test("creates component's dir in current directory", () => {
    return helpers
      .run(PATH)
      .inTmpDir(dir => {
        fs.copySync(path.join(__dirname, "./test-template"), dir);
      })
      .withArguments("testHeader")
      .then(() => {
        assert.file([
          "TestHeader/TestHeader.tsx",
          "TestHeader/testHeader.css",
          "TestHeader/index.ts"
        ]);
      });
  });

  /**
   * Path argument should be the same as the dir name
   * stored into test-template directory
   */
  test("creates component's dir in 'components' directory", () => {
    return helpers
      .run(PATH)
      .inTmpDir(dir => {
        fs.copySync(path.join(__dirname, "./test-template"), dir);
      })
      .withArguments("testHeader ./components")
      .then(() => {
        assert.file([
          "components/TestHeader/TestHeader.tsx",
          "components/TestHeader/testHeader.css",
          "components/TestHeader/index.ts"
        ]);
      });
  });
});

describe("--styles option tests", () => {
  test("stylesheet is generated when omitted", () => {
    return helpers.run(PATH).then(() => {
      assert.file([
        "Component/Component.tsx",
        "Component/component.css",
        "Component/index.ts"
      ]);
    });
  });

  test("stylesheet is not generated when set in false", () => {
    return helpers
      .run(PATH)
      .withOptions({ styles: false })
      .then(() => {
        assert.file(["Component/Component.tsx", "Component/index.ts"]);
      });
  });
});

describe("generator's --less and --sass options tests", () => {
  test.each`
    less     | sass     | expected
    ${false} | ${false} | ${"css"}
    ${true}  | ${false} | ${"less"}
    ${false} | ${true}  | ${"sass"}
  `(
    ".$expected file is generating when --less=$less and --sass=$sass",
    ({ less, sass, expected }) => {
      return helpers
        .run(PATH)
        .withOptions({ less, sass })
        .then(() => {
          assert.file([`Component/component.${expected}`]);
        });
    }
  );
});
