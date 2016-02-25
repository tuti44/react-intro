require.config({
    baseUrl: './',
    paths: {
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars',
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: './../../node_modules/react/dist/react',
        ReactDOM: './../../node_modules/react-dom/dist/react-dom'
    }
});

define(['react', 'ReactDOM', 'lodash'], function (React, ReactDOM, _) {

    var data = ['hello', 'there', 'world'];

    var App = React.createClass({
        displayName: "App",
        render: function () {
            return (
                <div>
                    <Clock/>
                    <List items={this.props.items}/>
                </div>
            )
        }
    });

    var Clock = React.createClass({
        displayName: "Clock",
        getInitialState: function () {
            setInterval(this.tick, 1000);
            return {
                time: this.getTime()
            }
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
            return (
                <span>{this.state.time}</span>
            )
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
            return _.chain(this.props.items)
                .orderBy(_.identity, this.state.sort)
                .map(function (item) {
                    return <Item data={item}/>
                })
                .value()
        },
        render: function () {
            return (
                <div>
                    <SortButton sortClass={this.state.sort} sort={this.sort}/>
                    <ul>{
                        this.renderItems()
                    }</ul>
                </div>
            );
        }
    });

    var SortButton = React.createClass({
        displayName: "SortButton",
        render: function () {
            return (
                <button onClick={this.props.sort}><i className={'fa fa-sort-' + this.props.sortClass}></i><span>&nbsp;
                    Sort</span></button>
            );
        }
    });

    var Item = React.createClass({
        displayName: "Item",
        render: function () {
            return (
                <li>{this.props.data}</li>
            );
        }
    });

    var A = React.createClass({
        render: function () {
            return <B {...this.props} b={13}/>
        }
    });

    var B = React.createClass({
        render: function () {
            return <div a={this.a} b={this.b}></div>
        }
    });


    var elem = <App items={data}/>;
    ReactDOM.render(elem, document.getElementById("app"));

});

