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
                boxes: boxes,
                dragged: null,
                draggedOver: null
            }
        },
        changeOrder: function (draggedKey, draggedOnKey) {
            var index1 = _.findIndex(this.state.boxes, {key: draggedKey});
            var index2 = _.findIndex(this.state.boxes, {key: draggedOnKey});
            var newBoxes = this.state.boxes.slice();
            newBoxes[index2] = this.state.boxes[index1];
            newBoxes[index1] = this.state.boxes[index2];
            this.setState({
                boxes: newBoxes
            });
        },
        pushAfter: function (draggedOverId) {
            var indexDragged = _.findIndex(this.state.boxes, {key: this.state.dragged});
            var indexDraggedOn = _.findIndex(this.state.boxes, {key: draggedOverId});
            var newBoxes = this.state.boxes.slice();
            newBoxes.splice(indexDraggedOn, 0, newBoxes.splice(indexDragged, 1)[0]);
            this.setState({
                boxes: newBoxes
            });
        },
        renderSmallBoxes: function () {
            var children = [];
            var boxes = this.state.boxes;
            for (var i = 0, length = boxes.length; i < length; i++) {
                var dragged = false;
                if (boxes[i].key === this.state.dragged) {
                    dragged = true;
                }
                children.push(<SmallBox dragged={dragged}
                                        setDragged={this.setDragged} onSmallBoxDraggedOver={this.onSmallBoxDraggedOver}
                                        color={boxes[i].color} key={boxes[i].key} dataId={boxes[i].key}/>)
            }
            return children;
        },
        setDragged: function (dragged) {
            if (this.state.dragged !== dragged) {
                this.setState({dragged: dragged});
            }
        },
        onSmallBoxDraggedOver: function (draggedOverId) {
            if (!this.state.dragged || this.state.dragged === draggedOverId) {
                return;
            }
            this.pushAfter(draggedOverId);
        },
        render: function () {
            return (
                <div draggable='true' className="container" onDragStart={this.onDragStart} onDragOver={this.onDragOver}>
                    {this.renderSmallBoxes()}
                </div>
            )
        }
    });



    var SmallBox = React.createClass({
        mixins: [React.addons.PureRenderMixin],
        onDragStart: function (event) {
            event.dataTransfer.effectAllowed = 'move';
            setTimeout(function() {
                this.props.setDragged(this.props.dataId);
            }.bind(this), 50);
        },
        onDragOver: function (event) {
            event.preventDefault();
            this.props.onSmallBoxDraggedOver(this.props.dataId);
        },
        onDragEnd: function () {
            this.props.setDragged(null);
        },
        render: function () {
            var dragClass = this.props.dragged ? 'dragged' : '';
            return (
                <div draggable='true' onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}
                     onDragOver={this.onDragOver}
                     className={'small-box ' + dragClass} style={{backgroundColor: this.props.color}}
                     key={this.props.dataId} id={this.props.dataId}>{this.props.dataId}</div>
            )
        }
    });

    ReactDOM.render(<App/>, document.getElementById("app"));
});


