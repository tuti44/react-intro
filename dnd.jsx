'use strict';
require.config({
    baseUrl: './',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom',
    },
    map: {'*': {'react-dom': 'ReactDOM', 'react': 'React'}}
});

define(['React', 'ReactDOM', 'lodash'], function (React, ReactDOM, _) {

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    var App = React.createClass({
        render: function () {
            return (
                <LargeBox {...this.props} numberOfBoxes={10}/>
            )
        }
    });

    var LargeBox = React.createClass({
        mixins: [React.addons.PureRenderMixin],
        getInitialState: function () {
            var boxes = [];
            _.times(this.props.numberOfBoxes, function () {
                var box = {
                    color: getRandomColor(),
                    key: _.uniqueId('box_')
                };
                boxes.push(box);
            });

            return {
                boxes: boxes
            }
        },
        onDragStart: function(event) {
            //event.dataTransfer.setData('text/plain', null);

            this.dragged = event.currentTarget;
            event.dataTransfer.effectAllowed = 'move';

            // Firefox
            event.dataTransfer.setData("text/html", event.currentTarget);
        },
        onDragEnd: function(event) {

        },
        changeOrder: function(draggedKey, draggedOnKey) {
            var index1 = _.findIndex(this.state.boxes, {key: draggedKey});
            var index2 = _.findIndex(this.state.boxes, {key: draggedOnKey});
            var newBoxes = this.state.boxes.slice();
            newBoxes[index2] = this.state.boxes[index1];
            newBoxes[index1] = this.state.boxes[index2];
            this.setState({
                boxes: newBoxes
            });
        },
        pushAfter: function (draggedKey, draggedOnKey) {
            var indexDragged = _.findIndex(this.state.boxes, {key: draggedKey});
            var indexDraggedOn = _.findIndex(this.state.boxes, {key: draggedOnKey});
            var newBoxes = this.state.boxes.slice();
            newBoxes.splice(indexDraggedOn, 0, newBoxes.splice(indexDragged, 1)[0]);
            this.setState({
                boxes: newBoxes
            });
        },
        handleStart: function (event, ui) {
            if (event.target.classList.contains("small-box")) {
                return false;
            }
        },
        renderSmallBoxes: function () {
            var children = [];
            var boxes = this.state.boxes;
            for (var i = 0, length = boxes.length; i < length; i++) {
                children.push(<SmallBox changeOrder={this.changeOrder} pushAfter={this.pushAfter}
                                        color={boxes[i].color} key={boxes[i].key} dataId={boxes[i].key}/>)
            }
            return children;
        },
        render: function () {
            return (
                <div className="container"
                     draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    {this.renderSmallBoxes()}
                </div>
            )
        }
    });

    var dragged;
    var draggedOver;

    var SmallBox = React.createClass({
        onDragStart: function(event) {
            dragged = event.currentTarget;
        },
        onDragOver: function(event) {
            event.preventDefault();
            draggedOver = event.target;
            this.props.pushAfter(dragged.getAttribute('id'), draggedOver.getAttribute('id'));

        },
        onDragEnd: function(event) {
            this.props.pushAfter(dragged.getAttribute('id'), draggedOver.getAttribute('id'));
        },
        render: function () {
            return (
                <div draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragOver={this.onDragOver}
                     className='small-box' style={{backgroundColor: this.props.color}}
                     key={this.props.dataId} id={this.props.dataId}>{this.props.dataId}</div>
            )
        }
    });

    ReactDOM.render(<App/>, document.getElementById("app"));
});


