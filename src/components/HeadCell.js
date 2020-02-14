import React, { Component } from "react";
import '../sass/HeadCell.sass'
import OpenBtn from "./OpenBtn";

class HeadCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            node: props.node,
            isOpened: props.isOpened,
            isSubnode: props.isSubnode
        }
        
        this.openClickHandler = this.openClickHandler.bind(this);
    }

    openClickHandler() {
        this.setState(prevState => {
            return {
                isOpened: !prevState.isOpened
            }
        })
      }

    render(){

        const openSign = this.state.isOpened ? "-" : "+";
        const nodeClass = this.state.isSubnode ? "node node__subnode" : "node";
        const hasChildren = this.state.node.children && this.state.node.children.length > 0;

        return(
            <div className={nodeClass}>
                {hasChildren &&
                <OpenBtn
                    openSign={openSign}
                    openClickHandler={this.openClickHandler}
                /> }
                
                <p className="node__text">{this.state.node.text}</p>

                {this.state.isOpened && hasChildren && <div className="node__wrapper">
                    {this.state.node.children.map(n =>
                    <HeadCell
                    key={n.id}
                    node={n}
                    isSubnode={true}
                    isOpened={false}
                    />)}
                </div>
                }
            </div>
        )
    }

}

export default HeadCell;