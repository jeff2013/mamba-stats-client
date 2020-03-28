import React from "react";

class AddPlayer extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            name: '',
            position: ''
        }
    }
    
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.props.onAddUser(this.state);
        }
        this.props.onComplete();
        this.handleReset();
    }

    isValid = () => {
        // TODO: Write proper validation
        return this.state.name !== '';
    }

    handleReset = () => {
        this.setState({
            name: ''
        });
    }


    render() {
        return (
            <div className="add-player-container">
                <p className="title">ADD PLAYER</p>
                <form onSubmit={this.submit}>
                    <div className="input-container name">
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="input-container position">
                        <input type="text" name="position" value={this.state.position} onChange={this.handleInputChange}></input>
                    </div>
                    <button type="submit">DONE</button>
                </form>
            </div>
        )
    }

}

export default AddPlayer;