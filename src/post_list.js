'use strict';

const API = 'https://jayjeon.herokuapp.com/post/';

function loadList(inc){
    this.setState({ posts: this.state.posts + inc });
}

function deletePost(id){
    fetch(API + 'delete/' + id, {
        method: 'DELETE'
    })
    .then (res => {
        if (res.status == 200){
            this.fetchList();
        }
    })
    .catch(err => err);
}


class PostDivs extends React.Component {
    constructor(props) {
        super(props);

        this.setDateTime();

        this.state = {
            data: [],
            posts: 5,
            loading: true,
            editingId: null
        };

        loadList = loadList.bind(this);
        deletePost = deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchList();
    }

    fetchList(){
        fetch(API + 'read', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            })
        })
        .then(response => response.json())
        .then(d => {
            this.setState({ data: d, loading: false });
        });
    }

    editPost(id){
        this.setState({ editingId: id });
    }

    handleSubmit(e, b){
        e.preventDefault();

        if (this.state.contentChanged){
            var post = {
                createDate: b.createDate,
                title: b.title,
                content: b.content
            }
    
            fetch(API + 'update/' + b._id, {
                method: 'PUT',
                body: JSON.stringify(post),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(this.setState({ contentChanged: false, isEditing: false }))
            .catch(err => err);
        } else {
            this.setState({ isEditing: false });
        }
    }

    // utils
    setDateTime(){
        var d = new Date(Date.now());
        d.setMonth(d.getMonth() + 1);

        this.props.date = d.getFullYear() 
            + "-" + ("0" + d.getMonth()).slice(-2) 
            + "-" + ("0" + d.getDate()).slice(-2) 
            + " " + ("0" + d.getHours()).slice(-2) 
            + ":" + ("0" + d.getMinutes()).slice(-2);
    }
    
    render() {
        const data = this.state.data;
        const dataItems =
            data
                .sort((a, b) => b.createDate > a.createDate)
                .map((postData) =>
                    <div>
                        <h3>{postData.title}</h3>
                        <p>{postData.createDate}</p>
                        <p>{postData.content}</p>
                        <button type="button" class="btn btn-light" onClick={() => this.editPost(postData._id)}>Edit</button>
                        <button type="button" class="btn btn-dark" 
                            data-id={postData._id} data-toggle="modal" data-target="#deleteModal"
                            onClick={() => passDeleteId($(this).attr("data-id"))}>Delete</button>
                        <br /><br />

                        <PostDeleteModal />
                    </div>
                )
                .slice(0, this.state.posts);

        if (this.state.loading){
            return (
                <div><p>Loading Data...</p></div>
            );
        } else {
            return (
                <div>{dataItems}</div>
            );
        }
            // blockquote, em, strong, a, h2, h3, pre, code, ul, li, ol
    }
}

function passDeleteId(identification){
    this.setState({id: identification});
}

class PostDeleteModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            id: null
        }

        passDeleteId = passDeleteId.bind(this);
    }

    render(){
        return (
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{this.state.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Delete this?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" 
                            data-dismiss="modal"
                            onClick={() => deletePost(this.state.id)}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostNavBtn extends React.Component {
    constructor(props){
        super(props);
    }

    morePosts(){
        loadList(5);
    }

    render() {
        return (
            <nav class="blog-pagination">
                <button type="button" class="btn btn-info" onClick={this.morePosts}>More</button>
            </nav>
        );
    }
}

class PostListDiv extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <PostDivs />
                <PostNavBtn />
            </div>
        );
    }
}

const domContainer = document.querySelector('#post_list');

ReactDOM.render(<PostListDiv />, domContainer);