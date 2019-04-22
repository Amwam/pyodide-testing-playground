var codeEditor;
languagePluginLoader.then(() => {
  // pyodide is now ready to use...
  console.log(pyodide.runPython('import sys\nsys.version'));
  codeEditor = CodeMirror(document.getElementById('code'), {
    value: VANILLA_CODE,
    lineNumbers: true,
    mode: {
      name: 'python',
      version: 3,
    },
    indentUnit: 4,
    matchBrackets: true,
  });

  document.styleSheets.item(1).deleteRule('.hide-or-show');
});

function runCode() {
  const code = codeEditor.getValue();
  const resultElement = document.getElementById('result');
  const result = pyodide.runPython(code);
  console.log(result);
}

const VANILLA_CODE = `from js import document, window
def main():
    return "Hello, world!"

result = main()
document.querySelector("#result").innerText = result
`;
const REACT_CODE = `from js import document, window

React = window.React
ReactDOM = window.ReactDOM


def InnerComponent(*args):
    return React.createElement(
        "span",
        {"style": {"textAlign": "center", "fontWeight": "bold", "flex": "1"}},
        "Hello world. This was rendered with React. (Check the React dev tools for proof)",
    )


def HelloWorldReactComponent():
    return React.createElement(
        "div", {"style": {"display": "flex"}}, React.createElement(InnerComponent)
    )


ReactDOM.render(HelloWorldReactComponent(), document.querySelector("#result"))
`;

document.querySelectorAll('input[name=code]').forEach(input => {
  input.addEventListener('change', event => {
    if (input.value == 'react') {
      codeEditor.setValue(REACT_CODE);
    } else {
      codeEditor.setValue(VANILLA_CODE);
    }
  });
});
