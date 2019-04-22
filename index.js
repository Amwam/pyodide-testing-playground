var codeEditor;
languagePluginLoader.then(() => {
  // pyodide is now ready to use...
  console.log(pyodide.runPython('import sys\nsys.version'));
  document
    .querySelectorAll('.hide-or-show')
    .forEach(e => (e.style.display = 'inherit'));
  const editor = document.querySelector('#python-code');
  codeEditor = CodeMirror(document.getElementById('code'), {
    value:
      'def main():\n    return "Hello, world!"\n\n# Return value of main will output in the results below\nmain()',

    lineNumbers: true,
    mode: {
      name: 'python',
      version: 3,
    },
    indentUnit: 4,
    matchBrackets: true,
  });
});

function runCode() {
  const code = codeEditor.getValue();
  const resultElement = document.getElementById('result');
  resultElement.innerText = pyodide.runPython(code);
}
