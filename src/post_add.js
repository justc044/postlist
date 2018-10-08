'use strict';

function updateState(){
    this.setState( () => {return {showPostSwitch: !this.state.showPostSwitch};} );
}

class AddPostLink extends React.Component {
  constructor(props) {
    super(props);
  }

  showPostForm(){
    updateState();
  }

  render() {
    return (
        <div>
            <a onClick={this.showPostForm}>New Post</a>
            <br /><br />
        </div>
    );
  }
}

class NewEntryForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.setDateTime();

        this.state = {
            showPostSwitch: false
        };
        
        updateState = updateState.bind(this);
    }

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
        if (this.state.showPostSwitch){
            return (
                <form action="/post/create" method="post">
                    <div class="form-group">
                        <label for="createDateLabel">Date</label><br />
                        <input type="datetime" class="form-control" name="createDate" defaultValue={this.props.date}></input>
                    </div>
                    <div class="form-group">
                        <label for="PostTitleLabel">Title</label>
                        <input type="text" class="form-control" id="PostTitle" name="title" />
                    </div>
                    <div class="form-group">
                        <label for="PostContentLabel">Content</label>
                        <textarea class="form-control" id="PostContent" rows="5" name="content"></textarea>
                    </div>
                    <button type="submit" value="Submit" class="btn btn-primary btn-sm">Create</button>
                    <br /><br />
                </form>
            );
        }
        else {
            return null;
        }
    }
}

class AddPostDiv extends React.Component {
    render(){
        return (
            <div>
                <AddPostLink />
                <NewEntryForm />
            </div>
        )
    }
}

const domContainer = document.querySelector('#new_entry');

ReactDOM.render(<AddPostDiv />, domContainer);