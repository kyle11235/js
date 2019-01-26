var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      // xxx

      return React.createElement(
        'div',
        null,
        React.createElement(LikeButton, null),
        React.createElement('br', null),
        React.createElement(LikeButton, null),
        React.createElement('br', null),
        React.createElement(LikeButton, null),
        React.createElement('br', null)
      );
    }
  }]);

  return App;
}(React.Component);

var LikeButton = function (_React$Component2) {
  _inherits(LikeButton, _React$Component2);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this2 = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this2.state = { liked: false };
    return _this2;
  }

  _createClass(LikeButton, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.liked) {
        return 'You liked this.';
      }

      return React.createElement(
        'button',
        { onClick: function onClick() {
            return _this3.setState({ liked: true });
          } },
        'Like'
      );
    }
  }]);

  return LikeButton;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));