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
      'from js import document, window\ndef main():\n    return "Hello, world!"\n\nresult = main()\ndocument.querySelector("#result").innerText = result',

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
  const result = pyodide.runPython(code);
  console.log(result);
}
