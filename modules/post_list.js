'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var API = 'https://jayjeon.herokuapp.com/post/';

function loadList(inc) {
    this.setState({ posts: this.state.posts + inc });
}

function deletePost(id) {
    var _this = this;

    fetch(API + 'delete/' + id, {
        method: 'DELETE'
    }).then(function (res) {
        if (res.status == 200) {
            _this.fetchList();
        }
    }).catch(function (err) {
        return err;
    });
}

var PostDivs = function (_React$Component) {
    _inherits(PostDivs, _React$Component);

    function PostDivs(props) {
        _classCallCheck(this, PostDivs);

        var _this2 = _possibleConstructorReturn(this, (PostDivs.__proto__ || Object.getPrototypeOf(PostDivs)).call(this, props));

        _this2.setDateTime();

        _this2.state = {
            data: [],
            posts: 5,
            loading: true,
            editingId: null
        };

        loadList = loadList.bind(_this2);
        deletePost = deletePost.bind(_this2);
        _this2.editPost = _this2.editPost.bind(_this2);
        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        return _this2;
    }

    _createClass(PostDivs, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchList();
        }
    }, {
        key: 'fetchList',
        value: function fetchList() {
            var _this3 = this;

            fetch(API + 'read', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=utf-8'
                })
            }).then(function (response) {
                return response.json();
            }).then(function (d) {
                _this3.setState({ data: d, loading: false });
            });
        }
    }, {
        key: 'editPost',
        value: function editPost(id) {
            this.setState({ editingId: id });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e, b) {
            e.preventDefault();

            if (this.state.contentChanged) {
                var post = {
                    createDate: b.createDate,
                    title: b.title,
                    content: b.content
                };

                fetch(API + 'update/' + b._id, {
                    method: 'PUT',
                    body: JSON.stringify(post),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(this.setState({ contentChanged: false, isEditing: false })).catch(function (err) {
                    return err;
                });
            } else {
                this.setState({ isEditing: false });
            }
        }

        // utils

    }, {
        key: 'setDateTime',
        value: function setDateTime() {
            var d = new Date(Date.now());
            d.setMonth(d.getMonth() + 1);

            this.props.date = d.getFullYear() + "-" + ("0" + d.getMonth()).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var data = this.state.data;
            var dataItems = data.sort(function (a, b) {
                return b.createDate > a.createDate;
            }).map(function (postData) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h3',
                        null,
                        postData.title
                    ),
                    React.createElement(
                        'p',
                        null,
                        postData.createDate
                    ),
                    React.createElement(
                        'p',
                        null,
                        postData.content
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-light', onClick: function onClick() {
                                return _this4.editPost(postData._id);
                            } },
                        'Edit'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', 'class': 'btn btn-dark',
                            'data-id': postData._id, 'data-toggle': 'modal', 'data-target': '#deleteModal',
                            onClick: function onClick() {
                                return passDeleteId($(_this4).attr("data-id"));
                            } },
                        'Delete'
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(PostDeleteModal, null)
                );
            }).slice(0, this.state.posts);

            if (this.state.loading) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Loading Data...'
                    )
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    dataItems
                );
            }
            // blockquote, em, strong, a, h2, h3, pre, code, ul, li, ol
        }
    }]);

    return PostDivs;
}(React.Component);

function passDeleteId(identification) {
    this.setState({ id: identification });
}

var PostDeleteModal = function (_React$Component2) {
    _inherits(PostDeleteModal, _React$Component2);

    function PostDeleteModal(props) {
        _classCallCheck(this, PostDeleteModal);

        var _this5 = _possibleConstructorReturn(this, (PostDeleteModal.__proto__ || Object.getPrototypeOf(PostDeleteModal)).call(this, props));

        _this5.state = {
            title: "",
            id: null
        };

        passDeleteId = passDeleteId.bind(_this5);
        return _this5;
    }

    _createClass(PostDeleteModal, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            return React.createElement(
                'div',
                { 'class': 'modal fade', id: 'deleteModal', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { 'class': 'modal-dialog', role: 'document' },
                    React.createElement(
                        'div',
                        { 'class': 'modal-content' },
                        React.createElement(
                            'div',
                            { 'class': 'modal-header' },
                            React.createElement(
                                'h5',
                                { 'class': 'modal-title', id: 'exampleModalLabel' },
                                this.state.title
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'modal-body' },
                            'Delete this?'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'modal-footer' },
                            React.createElement(
                                'button',
                                { type: 'button', 'class': 'btn btn-secondary', 'data-dismiss': 'modal' },
                                'Close'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', 'class': 'btn btn-primary',
                                    'data-dismiss': 'modal',
                                    onClick: function onClick() {
                                        return deletePost(_this6.state.id);
                                    } },
                                'Delete'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PostDeleteModal;
}(React.Component);

var PostNavBtn = function (_React$Component3) {
    _inherits(PostNavBtn, _React$Component3);

    function PostNavBtn(props) {
        _classCallCheck(this, PostNavBtn);

        return _possibleConstructorReturn(this, (PostNavBtn.__proto__ || Object.getPrototypeOf(PostNavBtn)).call(this, props));
    }

    _createClass(PostNavBtn, [{
        key: 'morePosts',
        value: function morePosts() {
            loadList(5);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'nav',
                { 'class': 'blog-pagination' },
                React.createElement(
                    'button',
                    { type: 'button', 'class': 'btn btn-info', onClick: this.morePosts },
                    'More'
                )
            );
        }
    }]);

    return PostNavBtn;
}(React.Component);

var PostListDiv = function (_React$Component4) {
    _inherits(PostListDiv, _React$Component4);

    function PostListDiv(props) {
        _classCallCheck(this, PostListDiv);

        return _possibleConstructorReturn(this, (PostListDiv.__proto__ || Object.getPrototypeOf(PostListDiv)).call(this, props));
    }

    _createClass(PostListDiv, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(PostDivs, null),
                React.createElement(PostNavBtn, null)
            );
        }
    }]);

    return PostListDiv;
}(React.Component);

var domContainer = document.querySelector('#post_list');

ReactDOM.render(React.createElement(PostListDiv, null), domContainer);