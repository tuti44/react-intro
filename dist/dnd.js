'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require.config({
    baseUrl: './',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom'
    },
    map: { '*': { 'react-dom': 'ReactDOM', 'react': 'React' } }
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
            return React.createElement(LargeBox, _extends({}, this.props, { numberOfBoxes: 10 }));
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
            };
        },
        changeOrder: function (draggedKey, draggedOnKey) {
            var index1 = _.findIndex(this.state.boxes, { key: draggedKey });
            var index2 = _.findIndex(this.state.boxes, { key: draggedOnKey });
            var newBoxes = this.state.boxes.slice();
            newBoxes[index2] = this.state.boxes[index1];
            newBoxes[index1] = this.state.boxes[index2];
            this.setState({
                boxes: newBoxes
            });
        },
        pushAfter: function (draggedKey, draggedOnKey) {
            var indexDragged = _.findIndex(this.state.boxes, { key: draggedKey });
            var indexDraggedOn = _.findIndex(this.state.boxes, { key: draggedOnKey });
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
                children.push(React.createElement(SmallBox, { changeOrder: this.changeOrder, pushAfter: this.pushAfter,
                    color: boxes[i].color, key: boxes[i].key, dataId: boxes[i].key }));
            }
            return children;
        },
        render: function () {
            return React.createElement(
                'div',
                { className: 'container', onDragStart: this.onDragStart, onDragEnd: this.onDragEnd },
                this.renderSmallBoxes()
            );
        }
    });

    var dragged;
    var draggedOver;

    var SmallBox = React.createClass({
        onDragStart: function (event) {
            dragged = event.currentTarget;
            event.dataTransfer.effectAllowed = 'move';
            this.dragClass = 'dragged';
        },
        onDragOver: function (event) {
            event.preventDefault();
            draggedOver = event.target;
            this.props.pushAfter(dragged.getAttribute('id'), draggedOver.getAttribute('id'));
        },
        onDragEnd: function (event) {
            this.dragClass = '';
            this.props.pushAfter(dragged.getAttribute('id'), draggedOver.getAttribute('id'));
        },
        render: function () {
            this.dragClass = this.dragClass || '';
            return React.createElement(
                'div',
                { draggable: 'true', onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, onDragOver: this.onDragOver,
                    className: 'small-box ' + this.dragClass, style: { backgroundColor: this.props.color },
                    key: this.props.dataId, id: this.props.dataId },
                this.props.dataId
            );
        }
    });

    ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
});
//# sourceMappingURL=dnd.js.map
