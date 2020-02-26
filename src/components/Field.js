import React, { Component } from "react";
import FieldCell from "./FieldCell";
import '../sass/Field.sass'

class Field extends Component {
    render() {
        return(
            <div className="field">   
            {this.props.verticalNodes.map(v_node => {
                return(
                    <div className="field__row" key={v_node}>
                        {this.props.horizontalNodes.map(h_node =>
                        <FieldCell key={`${v_node} ${h_node}`} vNode={v_node} hNode={h_node}/>)}
                </div>)
                
            })}             
                {/* {this.props.horizontalNodes.map( n =><FieldCell /> )} */}
            </div>
        )
    }

}

export default Field;