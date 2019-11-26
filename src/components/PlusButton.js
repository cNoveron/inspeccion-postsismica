import React, { PureComponent } from 'react'
import MdAddCircle from 'react-icons/md'
import { fetchForms, clearForm } from '../actions/form'

export default class PlusButton {
    constructor(props) {
        this.props = props
    }

    render() {
        <button type="button" style={{ display: "inline-flex", flexDirection: "row" }} className="btn btn-success" onClick={() => {
            this.props.clearForm()
            this.props.history.push("/new")
        }}>
            <MdAddCircle size="1.5em" />{this.props.text}
        </button>
    }
}