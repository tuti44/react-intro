'use strict';
require.config({
    baseUrl: './',
    paths: {
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars',
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom',
        //Draggable: './bower_components/react-drag/dist/react-drag'
        Draggable: './node_modules/react-draggable/dist/react-draggable'
    },
    map: {'*': {'react-dom': 'ReactDOM', 'react': 'React'}}
});

define(['React', 'ReactDOM', 'lodash', 'Draggable'], function (React, ReactDOM, _, Draggable) {

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

            return {
                boxes: []
            }
        },
        addToList: function () {
            var curBox = [{
                key: Math.random(),
            }].concat(this.state.boxes);
        },
        handleStart: function (event, ui) {
            if (event.target.classList.contains("small-box")) {
                return false;
            }
        },

        handleDrag: function (event, ui) {
        },

        handleStop: function (event, ui) {
            //console.log(event.target);
            //console.log(event.currentTarget);
            //console.log('Event: ', event);
            //console.log('Position: ', ui.position);

        },
        getRandomColor: function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        renderSmallBoxes: function (n) {
            var children = [];
            var color;
            for (var i=0; i < n; i++) {
                color = this.getRandomColor();
                children.push(<SmallBox color={color} key={Math.random()}/>)
            }
            return children;
        },
        render: function () {
            return (
                <Draggable
                    //axis="x"
                    handle=".handle"
                    grid={[25, 25]}
                    start={{x: 25, y: 25}}
                    bound={{left: 20, top: 20, bottom: 80, right: 80 }}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                        <div className="container handle">
                            {this.renderSmallBoxes(this.props.numberOfBoxes)}
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
                    //axis="x"
                    handle=".handle"
                    //grid={[25, 25]}
                    //start={{x: 25, y: 25}}
                    bounds={'parent'}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div className="small-box handle" style={{backgroundColor: this.props.color}}></div>
                </Draggable>
            )
        }
    });

    //var App = React.createClass({
    //    handleStart: function (event, ui) {
    //        console.log('Event: ', event);
    //        console.log('Position: ', ui.position);
    //    },
    //
    //    handleDrag: function (event, ui) {
    //        console.log('Event: ', event);
    //        console.log('Position: ', ui.position);
    //    },
    //
    //    handleStop: function (event, ui) {
    //        console.log('Event: ', event);
    //        console.log('Position: ', ui.position);
    //    },
    //
    //    render: function () {
    //        return (
    //            <Draggable
    //                axis="x"
    //                handle=".handle"
    //                start={{x: 0, y: 0}}
    //                grid={[25, 25]}
    //                zIndex={100}
    //                onStart={this.handleStart}
    //                onDrag={this.handleDrag}
    //                onStop={this.handleStop}>
    //                <div>
    //                    <div className="handle">Drag from here</div>
    //                    <div>This readme is really dragging on...</div>
    //                </div>
    //            </Draggable>
    //        );
    //    }
    //});

    ReactDOM.render(<App/>, document.getElementById("app"));
});


