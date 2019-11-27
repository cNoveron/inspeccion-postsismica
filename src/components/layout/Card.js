import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import FieldText from '../fields/Text'
import _ from 'lodash'
import {
    CHANGE_QUESTION,
    CHANGE_PLACEHOLDER,
    CHANGE_TYPE,
    ADD_OPTION,
    CHANGE_OPTION,
    REMOVE_OPTION
} from '../../actions/types'
import store from '../../store'
import { MdCheckBoxOutlineBlank, MdRadioButtonUnchecked, MdExpandMore, MdDelete } from 'react-icons/md'

class Card extends Component {
    constructor(props) {
        super(props)
        const initData = this.props.data
        this.state = {
            fieldType: initData.type,
            value: initData.placeholder,
            question: initData.title,
            options: initData.options
        }

        this.onTitleUpdate = this.onTitleUpdate.bind(this)
        this.onFieldsUpdate = this.onFieldsUpdate.bind(this)
        this.onPlaceholderUpdate = this.onPlaceholderUpdate.bind(this)

        // Options
        this.onUpdateOptions = this.onUpdateOptions.bind(this)
        this.addOption = this.addOption.bind(this)
    }    

    onTitleUpdate(e) {
        let data = this.props.data
        data.title = e.target.value

        this.setState({ question: data.title })

        store.dispatch({
            type: CHANGE_QUESTION,
            payload: data,
            id: this.props.id
        })
    }

    onPlaceholderUpdate(e) {
        let data = this.props.data

        data.placeholder = e.target.value

        store.dispatch({
            type: CHANGE_PLACEHOLDER,
            payload: data,
            id: this.props.id
        })

    }

    onFieldsUpdate(e) {
        if (e.target.value == '') {
            return
        }

        let data = this.props.data

        data.type = e.target.value

        store.dispatch({
            type: CHANGE_TYPE,
            payload: data,
            id: this.props.id
        })

        this.setState({ fieldType: e.target.value })
    }

    addOption(e) {
        e.preventDefault()

        this.setState({ options: [...this.state.options, ""] })

        let data = this.props.data

        data.options.push("")

        store.dispatch({
            type: ADD_OPTION,
            payload: data,
            id: this.props.id
        })
    }

    onUpdateOptions(id, e) {
        if (e.target.value == '') {
            return
        }

        let data = this.props.data
        const resData = _.fill(this.state.options, e.target.value, id, id)

        data.options = resData

        store.dispatch({
            type: CHANGE_OPTION,
            payload: data,
            id: this.props.id
        })
    }

    removeOption(ind, e) {
        e.preventDefault()
        let data = this.props.data

        data.options.splice(ind, 1)

        store.dispatch({
            type: REMOVE_OPTION,
            payload: data,
            id: this.props.id
        })
    }

    render() {
        const type = this.state.fieldType
        const id = this.props.id
        const value = this.state.value


        return (
            <div id={id} className="panel" style={{ padding: 0 }}>
                <div className="panel-body" style={{ padding: 0 }}>

                    <div className="row">
                        <div className="col-12">
                            <div style={{ textAlign: "left", fontSize: "17px" }}>
                                Seleccione el aspecto a evaluar
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <select
                                className="form-control" 
                                name="title"
                                id="fields"
                                onChange={this.onTitleUpdate}
                                style={{ fontSize: "17px" }}
                                value={this.state.question}
                            >
                                <option value="Derrumbe total">Derrumbe total</option>
                                <option value="Derrumbe parcial">Derrumbe parcial</option>
                                <option value="Edificación separada de su cimentación">Edificación separada de su cimentación</option>
                                <option value="Asentamiento diferencial o hundimiento">Asentamiento diferencial o hundimiento</option>
                                <option value="Inclinación notoria de la edificación o de algún entrepiso">Inclinación notoria de la edificación o de algún entrepiso</option>
                                <option value="Daños en elementos estructurales (columnas, vigas, muros)">Daños en elementos estructurales (columnas, vigas, muros)</option>
                                <option value="Daños en elementos no estructurales">Daños en elementos no estructurales</option>
                                <option value="Daños en instalaciones eléctricas">Daños en instalaciones eléctricas</option>
                                <option value="Daños en instalaciones hidrosanitarias">Daños en instalaciones hidrosanitarias</option>
                                <option value="Daños en instalaciones de gas">Daños en instalaciones de gas</option>
                                <option value="Grietas, movimiento del suelo">Grietas, movimiento del suelo</option>
                                <option value="Deslizamiento de talud o corte">Deslizamiento de talud o corte</option>
                                <option value="Pretiles, balcones u otros objetos en peligro de caer">Pretiles, balcones u otros objetos en peligro de caer</option>
                                <option value="Otros peligros (líneas o ductos rotos, derrames tóxicos, etc.">Otros peligros (líneas o ductos rotos, derrames tóxicos, etc.</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {(
                                this.props.data.type == 'text' ||
                                this.props.data.type == 'textarea' ||
                                this.props.data.type == 'image_upload'
                            ) &&
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder={this.props.data.type == 'image_upload' ? "Enter description" : "Enter placeholder"}
                                    name={id + "_placeholder"} 
                                    value={this.state.value}
                                    onChange={(e) => { this.setState({ value: e.target.value }) }}
                                    onBlur={this.onPlaceholderUpdate}
                                    id={id + "_placeholder"} />}

                            {(this.props.data.type == 'radio' || this.props.data.type == 'checkbox' || this.props.data.type == 'dropdown') && (
                                <div className="row">
                                    <div className="text-left col-4">
                                        {!_.isEmpty(this.state.options) && this.state.options.map((val, index) => (
                                            <div key={index} className="row">
                                                <div className="col-1" style={{ lineHeight: "50px" }}>

                                                    <a href="#" style={{ color: "#999" }} onClick={this.removeOption.bind(this, index)}>
                                                        <MdDelete size="1.2em" />
                                                    </a>
                                                </div>
                                                <div className="col-10">
                                                    <FieldText
                                                        type="text"
                                                        style={{ marginBottom: "10px" }}
                                                        placeholder="Enter Option"
                                                        name={id + "_placeholder"}
                                                        value={val}
                                                        onBlur={this.onUpdateOptions.bind(this, index)}
                                                        onChange={(e) => {
                                                            this.state.options[index] = e.target.value
                                                            this.forceUpdate()
                                                        }}
                                                        id={id + "_placeholder"} />
                                                </div>
                                            </div>
                                        ))}
                                        <a href="#"
                                            style={{ display: "block", marginTop: "10px", paddingBottom: "20px" }}
                                            onClick={this.addOption}>Add option</a>

                                        <div className="clear"></div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export default Card

