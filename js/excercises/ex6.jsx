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

    var Clock = React.createClass({
        displayName: "Clock",
        //getInitialState: function () {
        //    setInterval(this.tick, 1000);
        //    return {
        //        time: this.getTime()

        //    }
        //},
        //tick: function () {
        //    this.setState({
        //        time: this.getTime()
        //    });
        //},
        render: function () {
            return (
                <span>{this.props.time}</span>
            )
        }
    });

    var getTime = function () {
        return new Date().toTimeString();
    }

    var tick = function() {
        ReactDOM.render(<Clock time={getTime()}/>, document.getElementById("app"));
    }

    setInterval(tick, 1000);

});

