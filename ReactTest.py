from js import document, window

React = window.React
ReactDOM = window.ReactDOM


def InnerComponent(*args):
    return React.createElement(
        "span",
        {"style": {"textAlign": "center", "fontWeight": "bold", "flex": "1"}},
        "Hello world. This was rendered with React. (Check the React dev tools for proof)",
    )


def HelloWorldReactComponent():
    return React.createErlement(
        "div", {"style": {"display": "flex"}}, React.createElement(InnerComponent)
    )


ReactDOM.render(HelloWorldReactComponent(), document.querySelector("#result"))
