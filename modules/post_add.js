'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function updateState() {
    var _this = this;

    this.setState(function () {
        return { showPostSwitch: !_this.state.showPostSwitch };
    });
}

var AddPostLink = function (_React$Component) {
    _inherits(AddPostLink, _React$Component);

    function AddPostLink(props) {
        _classCallCheck(this, AddPostLink);

        return _possibleConstructorReturn(this, (AddPostLink.__proto__ || Object.getPrototypeOf(AddPostLink)).call(this, props));
    }

    _createClass(AddPostLink, [{
        key: "showPostForm",
        value: function showPostForm() {
            updateState();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "a",
                    { onClick: this.showPostForm },
                    "New Post"
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            );
        }
    }]);

    return AddPostLink;
}(React.Component);

var NewEntryForm = function (_React$Component2) {
    _inherits(NewEntryForm, _React$Component2);

    function NewEntryForm(props) {
        _classCallCheck(this, NewEntryForm);

        var _this3 = _possibleConstructorReturn(this, (NewEntryForm.__proto__ || Object.getPrototypeOf(NewEntryForm)).call(this, props));

        _this3.setDateTime();

        _this3.state = {
            showPostSwitch: false
        };

        updateState = updateState.bind(_this3);
        return _this3;
    }

    _createClass(NewEntryForm, [{
        key: "setDateTime",
        value: function setDateTime() {
            var d = new Date(Date.now());
            d.setMonth(d.getMonth() + 1);

            this.props.date = d.getFullYear() + "-" + ("0" + d.getMonth()).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.showPostSwitch) {
                return React.createElement(
                    "form",
                    { action: "/post/create", method: "post" },
                    React.createElement(
                        "div",
                        { "class": "form-group" },
                        React.createElement(
                            "label",
                            { "for": "createDateLabel" },
                            "Date"
                        ),
                        React.createElement("br", null),
                        React.createElement("input", { type: "datetime", "class": "form-control", name: "createDate", defaultValue: this.props.date })
                    ),
                    React.createElement(
                        "div",
                        { "class": "form-group" },
                        React.createElement(
                            "label",
                            { "for": "PostTitleLabel" },
                            "Title"
                        ),
                        React.createElement("input", { type: "text", "class": "form-control", id: "PostTitle", name: "title" })
                    ),
                    React.createElement(
                        "div",
                        { "class": "form-group" },
                        React.createElement(
                            "label",
                            { "for": "PostContentLabel" },
                            "Content"
                        ),
                        React.createElement("textarea", { "class": "form-control", id: "PostContent", rows: "5", name: "content" })
                    ),
                    React.createElement(
                        "button",
                        { type: "submit", value: "Submit", "class": "btn btn-primary btn-sm" },
                        "Create"
                    ),
                    React.createElement("br", null),
                    React.createElement("br", null)
                );
            } else {
                return null;
            }
        }
    }]);

    return NewEntryForm;
}(React.Component);

var AddPostDiv = function (_React$Component3) {
    _inherits(AddPostDiv, _React$Component3);

    function AddPostDiv() {
        _classCallCheck(this, AddPostDiv);

        return _possibleConstructorReturn(this, (AddPostDiv.__proto__ || Object.getPrototypeOf(AddPostDiv)).apply(this, arguments));
    }

    _createClass(AddPostDiv, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(AddPostLink, null),
                React.createElement(NewEntryForm, null)
            );
        }
    }]);

    return AddPostDiv;
}(React.Component);

var domContainer = document.querySelector('#new_entry');

ReactDOM.render(React.createElement(AddPostDiv, null), domContainer);