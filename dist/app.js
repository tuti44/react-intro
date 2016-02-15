var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

    var data = ['hello', 'there', 'world'];

    var App = React.createClass({
        displayName: "App",
        render: function () {
            return React.createElement(
                'div',
                null,
                React.createElement(Clock, null),
                React.createElement(List, { items: this.props.items })
            );
        }
    });

    var Clock = React.createClass({
        displayName: "Clock",
        getInitialState: function () {
            setInterval(this.tick, 1000);
            return {
                time: this.getTime()
            };
        },
        tick: function () {
            this.setState({
                time: this.getTime()
            });
        },
        getTime: function () {
            return new Date().toTimeString();
        },
        render: function () {
            return React.createElement(
                'span',
                null,
                this.state.time
            );
        }
    });

    var List = React.createClass({
        displayName: "List",
        getInitialState: function () {
            return {
                sort: 'asc'
            };
        },
        sort: function () {
            var str = this.state.sort === 'asc' ? 'desc' : 'asc';
            this.setState({
                sort: str
            });
        },
        renderItems: function () {
            return _.chain(this.props.items).orderBy(_.identity, this.state.sort).map(function (item) {
                return React.createElement(Item, { data: item });
            }).value();
        },
        render: function () {
            return React.createElement(
                'div',
                null,
                React.createElement(SortButton, { sortClass: this.state.sort, sort: this.sort }),
                React.createElement(
                    'ul',
                    null,
                    this.renderItems()
                )
            );
        }
    });

    var SortButton = React.createClass({
        displayName: "SortButton",
        render: function () {
            return React.createElement(
                'button',
                { onClick: this.props.sort },
                React.createElement('i', { className: 'fa fa-sort-' + this.props.sortClass }),
                React.createElement(
                    'span',
                    null,
                    '  Sort'
                )
            );
        }
    });

    var Item = React.createClass({
        displayName: "Item",
        render: function () {
            return React.createElement(
                'li',
                null,
                this.props.data
            );
        }
    });

    var A = React.createClass({
        render: function () {
            return React.createElement(B, _extends({}, this.props, { b: 13 }));
        }
    });

    var B = React.createClass({
        render: function () {
            return React.createElement('div', { a: this.a, b: this.b });
        }
    });

    var elem = React.createElement(App, { items: data });
    ReactDOM.render(elem, document.getElementById("app"));
});
//# sourceMappingURL=app.js.map
