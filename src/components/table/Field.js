import React, { Component } from "react"
import FieldCell from "./FieldCell"
import '../../sass/Field.sass'
import PropTypes from 'prop-types'

class Field extends Component {
  render() {
    return(
      <div className="field">   
        {this.props.verticalNodes.map(v_node => {
          return(
            <div className="field__row" key={v_node}>
              {this.props.horizontalNodes.map(h_node =>
                <FieldCell
                  key={`${v_node}
                  ${h_node}`}
                  vNode={v_node}
                  hNode={h_node}
                />
              )}
            </div>)
                
        })}             
      </div>
    )
  }

}

Field.propTypes = {
  verticalNodes: PropTypes.arrayOf(PropTypes.string),
  horizontalNodes: PropTypes.arrayOf(PropTypes.string)
}

export default Field;