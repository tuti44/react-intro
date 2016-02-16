'use strict';
'use strict';
require.config({
    baseUrl: './',
    paths: {
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars',
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom',
    }
});

define(['react', 'ReactDOM', 'lodash'], function (React, ReactDOM, _) {

    var App = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        getInitialState: function () {
            return {
                title: ''
            }
        },
        render: function () {
            var number = parseInt(this.state.title * 2) || '';
            return (
                <div>
                    <Input title={this.state.title} linkState={this.linkState}/><br/>
                    <span>{number}</span>
                </div>
            )
        }
    });

    var Input = React.createClass({
        render: function () {
            var linkState = this.props.linkState;
            return (
                <input type="text" valueLink={linkState('title')}/>
            )
        }
    });


    ReactDOM.render(<App/>, document.getElementById("app"));
});


