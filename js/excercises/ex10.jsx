'use strict';
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

    var App = React.createClass({
        getInitialState: function () {
            return {
                items: [],
                title: ''
            }
        },
        changeTitle: function() {
            var title = this.refs.filter.getValue();
            this.setState({
               title: title
            });
        },
        addToList: function () {
            var curItems = [{
                key: Math.random(),
                title: this.state.title
            }].concat(this.state.items);
            this.setState({
                items: curItems,
                title: ''
            });
        },
        deleteItem: function(key) {
            var item = _.find(this.state.items, ['key', key]);
            var curItems = _.without(this.state.items, item);
            this.setState({
                items: curItems
            });
        },
        render: function () {
            return (
                <div>
                    <Filter title={this.state.title} changeTitle={this.changeTitle} ref="filter"/>
                    <AddButton addToList={this.addToList}/>
                    <FilteredList items={this.state.items} deleteItem={this.deleteItem} filterBy={this.state.title}/>
                </div>
            )
        }
    });

    var Filter = React.createClass({
        getValue: function() {
            return this.refs.itemInput.value;
        },
        render: function () {

            return (
                <label><span>Filter:</span><input type="text" ref="itemInput" value={this.props.title} onChange={this.props.changeTitle}/></label>
            )
        }
    });

    var AddButton = React.createClass({
        addItem: function (event) {
            event.preventDefault();
            this.props.addToList();
        },
        render: function () {
            return (
                <button onClick={this.addItem}><span>Add</span></button>
            )
        }
    });

    var FilteredList = React.createClass({
        renderItems: function(item) {
            return <Item item={item} key={item.key} deleteItem={this.props.deleteItem}/>
        },
        filterItems: function(item) {
            return _.startsWith(item.title, this.props.filterBy);
        },
        render: function () {
            return <ul>
                {_.chain(this.props.items).filter(this.filterItems).map(this.renderItems).value()}
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
                <li style={{textDecoration: this.state.isMarked ? "line-through" : "none"}} onClick={this.markItem}>{this.props.item.title}<br/>
                    <DeleteButton deleteItem={this.props.deleteItem} index={this.props.item.key}/>
                </li>
            );
        }
    });

    var DeleteButton = React.createClass({
        onDeleteClick: function() {
            this.props.deleteItem(this.props.index);
        },
        render: function() {
            return <button onClick={this.onDeleteClick}><span>Delete</span></button>
        }
    });

    ReactDOM.render(<App/>, document.getElementById("app"));
});


