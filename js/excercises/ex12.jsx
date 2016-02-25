'use strict';
require.config({
    baseUrl: './',
    paths: {
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars',
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom',
        ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter'
    }
});

define(['react', 'ReactDOM', 'lodash', 'ReactRouter'], function (React, ReactDOM, _, ReactRouter) {
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var Navigation = ReactRouter.Navigation;
    var History = ReactRouter.History;

    var Login = React.createClass({
        /*
         Error Codes -
         0 - no error
         1 - invalid username or password
         */
        mixins: [History],
        getInitialState: function () {
            return {
                errorMsg: 0
            }
        },
        onLogin: function () {
            var userName = this.refs.userName.value;
            var password = this.refs.password.value;
            if (localStorage.getItem(userName) !== password) {
                this.setState({
                    errorMsg: 1
                })
            } else {
                this.history.push('/home');
            }
        },
        onSignUp: function() {
            this.history.push('/sign-up');
        },
        render: function () {
            var errorMsg = '';
            if (this.state.errorMsg === 1) {
                errorMsg = (<div>
                                <span>Invalid username or password!</span><br/>
                            </div>)
            }
            return (
                <form onSubmit={this.onLogin}>
                    {errorMsg}
                    <input type="text" ref="userName" placeholder="Email" required/><br/>
                    <input type="password" ref="password" placeholder="Password" required/><br/>
                    <button type="submit"><span>Login</span></button>
                    <br/>
                    <span>Don't have an account? </span>
                    <button onClick={this.onSignUp}><span>Sign up</span></button>
                </form>
            )
        }
    });

    var Signup = React.createClass({
        /*
         Error Codes -
         0 - no error
         1 - username is taken
         2 - passwords don't match
         */
        mixins: [History],
        getInitialState: function () {
            return {
                errorMsg: 0
            }
        },
        validateForm: function (event) {
            event.preventDefault();

            var userName = this.refs.userName.value;
            var password = this.refs.pass.value;
            var repeatedPass = this.refs.repeatedPass.value;

            if (password === repeatedPass) {
                if (!localStorage.getItem(userName)) {
                    localStorage.setItem(userName, password);
                    this.setState({
                        errorMsg: 0
                    })
                    this.history.push('/home');
                } else {
                    this.setState({
                        errorMsg: 1
                    })
                }
            } else {
                this.setState({
                    errorMsg: 2
                })
            }
        },
        onLogin: function() {
            this.history.push('/');
        },
        render: function () {
            var errorMsg = '';
            if (this.state.errorMsg === 1) {
                errorMsg = (<div>
                               <span>username is taken!</span><br/>
                            </div>)
            }
            if (this.state.errorMsg === 2) {
                errorMsg = (<div>
                    <span>passwords don't match!</span><br/>
                </div>)
            }
            return (
                <form onSubmit={this.validateForm}>
                    {errorMsg}
                    <input type="text" ref="userName" placeholder="Enter your email" required/><br/>
                    <input type="password" ref="pass" placeholder="Choose your Password"
                           pattern="(?=^.{6,}$)(?=.*\d)(?=.*[a-z]).*$" required/><br/>
                    <input type="password" ref="repeatedPass" placeholder="Repeat Password"
                           pattern="(?=^.{6,}$)(?=.*\d)(?=.*[a-z]).*$" required/><br/>
                    <button type="submit"><span>Create Account</span></button>
                    <br/>
                    <span>Have an account? </span>
                    <button onClick={this.onLogin}><span>Log in</span></button>
                </form>
            )
        }
    });


    var Home = React.createClass({
        mixins: [History],
        onLogOut: function () {
            this.history.push('/');
        },
        render: function () {
            return <button onClick={this.onLogOut}><span>Log out</span></button>
        }
    });

    var routes = (
        <Router>
            <Route path="/" component={Login}/>
            <Route path="/sign-up" component={Signup}/>
            <Route path="/home" component={Home}/>
        </Router>
    );

    ReactDOM.render(routes, document.getElementById("app"));
});


