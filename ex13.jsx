'use strict';
require.config({
    baseUrl: './',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom',
        Draggable: './node_modules/react-draggable/dist/react-draggable'
    },
    map: {'*': {'react-dom': 'ReactDOM', 'react': 'React'}}
});

define(['React', 'ReactDOM', 'lodash', 'Draggable'], function (React, ReactDOM, _, Draggable) {

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
        handleStart: function (event, ui) {
            if (event.target.classList.contains("small-box")) {
                return false;
            }
        },
        renderSmallBoxes: function () {
            var children = [];
            var boxes = this.state.boxes;
            for (var i = 0, length = boxes.length; i < length; i++) {
                children.push(<SmallBox color={boxes[i].color} key={boxes[i].key}/>)
            }
            return children;
        },
        render: function () {
            return (
                <Draggable
                    handle=".handle"
                    grid={[25, 25]}
                    start={{x: 25, y: 50}}
                    bound={{left: 20, top: 20, bottom: 80, right: 80 }}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div className="container handle">
                        {this.renderSmallBoxes()}
                    </div>
                </Draggable>
            )
        }
    });

    var SmallBox = React.createClass({
        handleStart: function (event, ui) {
            console.log(event.clientX);
            console.log(event.clientY);
        },

        handleDrag: function (event, ui) {
            event.target.classList.add("dragging");
        },

        handleStop: function (event, ui) {
            event.target.classList.remove("dragging");
        },
        render: function () {
            return (
                <Draggable
                    handle=".handle"
                    bounds={'parent'}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div className="small-box handle" style={{backgroundColor: this.props.color}}></div>
                </Draggable>
            )
        }
    });

    ReactDOM.render(<App/>, document.getElementById("app"));
});


