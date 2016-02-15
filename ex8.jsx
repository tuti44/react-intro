require.config({
    baseUrl: './',
    paths: {
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars',
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: './node_modules/react/dist/react',
        ReactDOM: './node_modules/react-dom/dist/react-dom'
    }
});

define(['react', 'ReactDOM', 'lodash'], function (React, ReactDOM, _) {

    var App = React.createClass({
        displayName: "App",
        getInitialState: function() {
          return {
              title: "",
              bold: false,
              italic: false
          }
        },
        onInputChange: function(value) {
            this.setState({
                title: value
            });
        },
        changeStyleItalic: function(value) {
            this.setState({
                italic: value
            });
        },
        changeStyleBold: function(value) {
            this.setState({
                bold: value
            });
        },
        render: function () {
            return (
                <div>
                    <Input onInputChange={this.onInputChange} changeStyleItalic={this.changeStyleItalic} changeStyleBold={this.changeStyleBold}/>
                    <Output title={this.state.title} bold={this.state.bold} italic={this.state.italic}/>
                </div>
            )
        }
    });

    var Input = React.createClass({
        onChangeTitle: function (event) {
            var value = this.refs.textInput.value;
            this.props.onInputChange(value);
        },
        onChangeBold: function (event) {
            var isBold = this.refs.boldStyle.checked;
            this.props.changeStyleBold(isBold);
        },
        onChangeItalic: function (event) {
            var isItalic = this.refs.italicStyle.checked;
            this.props.changeStyleItalic(isItalic);
        },
        render: function () {
            return (
                <form>
                    <label><span>Input:</span><input type="text" ref="textInput" onChange={this.onChangeTitle}/></label><br/>
                    <input type="checkbox" name="style" value="Bold" ref="boldStyle" onChange={this.onChangeBold}/><span>Bold</span><br/>
                    <input type="checkbox" name="style" value="Italic" ref="italicStyle" onChange={this.onChangeItalic}/><span>Italic</span><br/>
                </form>
            )
        }
    });

    var Output = React.createClass({

        render: function() {
            return <span style={{fontWeight: this.props.bold ? "bold" : "normal",
            fontStyle: this.props.italic ? "italic" : "normal"}}>{this.props.title}</span>
        }
    });
    //
    //function Output(props) {
    //    return <span>{props.title}</span>
    //}
    //
    //const Output = props => <span>{props.title}</span>;

    ReactDOM.render(<App/>, document.getElementById("app"));
});

