import React, { PureComponent } from 'react'
import MdAddCircle from 'react-icons/md'

export default class PlusButton {
    constructor(props) {
        this.text = 
    }

    render() {
        <button type="button" style={{ display: "inline-flex", flexDirection: "row" }} className="btn btn-success" onClick={() => {
            this.props.clearForm()
            this.props.history.push("/new")
        }}>
            <MdAddCircle size="1.5em" />{this.text}
        </button>
    }
}