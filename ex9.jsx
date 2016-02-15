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
        getInitialState: function () {
            return {
                items: []
            }
        },
        addToList: function (title) {
            var curItems = [{
                key: Math.random(),
                title
            }].concat(this.state.items);
            this.setState({
                items: curItems
            });
        },
        render: function () {
            return (
                <div>
                    <Input addToList={this.addToList}/>
                    <List items={this.state.items}/>
                </div>
            )
        }
    });

    var Input = React.createClass({
        addItem: function (event) {
            event.preventDefault();
            var title = this.refs.itemInput.value;
            this.props.addToList(title);
            this.refs.itemInput.value = "";
        },
        render: function () {
            return (
                <form>
                    <label><span>Task:</span><input type="text" ref="itemInput"/></label>
                    <button onClick={this.addItem}><span>Add</span></button>
                </form>
            )
        }
    });

    var List = React.createClass({
        render: function () {
            return <ul>
                {this.props.items.map(function (item, index) {
                    return <Item data={item.title} key={item.key}/>
                })}
            </ul>
        }
    });

    var Item = React.createClass({
        displayName: "Item",
        getInitialState: function () {
            return {
                isMarked: false
            }
        },
        markItem: function() {
            this.setState({
                isMarked: !this.state.isMarked
            })
        },
        render: function () {
            return (
                <li style={{textDecoration: this.state.isMarked ? "line-through" : "none"}} onClick={this.markItem}>{this.props.data}</li>
            );
        }
    });

    ReactDOM.render(<App/>, document.getElementById("app"));
});


