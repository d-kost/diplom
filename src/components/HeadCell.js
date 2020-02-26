import React, { PureComponent } from "react";
import '../sass/HeadCell.sass'
import OpenBtn from "./OpenBtn";

class HeadCell extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            node: props.node,
            isOpened: props.isOpened,
            wasClosed: false,
            isSubnode: props.isSubnode,
            isVertical: props.isVertical
        }
        
        this.openClickHandler = this.openClickHandler.bind(this);
    }

    openClickHandler() {        
        this.setState(prevState => {
            return {
                isOpened: !prevState.isOpened,
                wasClosed: prevState.isOpened ? true : false
            }
        })
    }

    pushNode = (node) => {        
        this.props.pushNode(node, this.state.wasClosed)
    }

    componentDidUpdate() {
        
        if (!this.state.isOpened) { //this.state.isVertical || 
            this.pushNode(this.state.node.text); 
        }

        if (this.state.isVertical) {
            this.props.resizeEmptyBlock();
        }
       
    }

    componentDidMount() {    
        if (!this.state.isOpened) { //this.state.isVertical || 
            this.pushNode(this.state.node.text); 
        }

    }

    render(){
        // console.log(this.state.node.text);
        const openSign = this.state.isOpened ? "-" : "+";
        let nodeClass = this.state.isSubnode ? "node node__subnode" : "node";
        nodeClass += this.state.isSubnode&&this.state.isVertical ? " node__subnode--vertical" : "";
        nodeClass += !this.state.isSubnode&&this.state.isVertical ? " node--vertical" : "";
        
        let wrapperClass = "node__wrapper";
        wrapperClass += this.state.isVertical ? " node__wrapper--vertical" : " node__wrapper--horizontal";
        let node_container = "node__container";
        node_container += this.state.isVertical ? " node__container--vertical" : " node__container--horizontal";

        nodeClass += !this.state.isOpened&&!this.state.isVertical ? " cell-width" : "";
        nodeClass += !this.state.isOpened&&this.state.isVertical ? " cell-height" : "";
        
        const hasChildren = this.state.node.children && this.state.node.children.length > 0;
  

        return(
            <div className={nodeClass} data-cell={this.state.node.text}>
                <div className={node_container}>
                {hasChildren &&
                <OpenBtn
                    openSign={openSign}
                    openClickHandler={this.openClickHandler}
                /> }
                
                <p className="node__text">{this.state.node.text}</p>
                </div>

                {/* {hasChildren && this.pushNode(this.state.node.text)} */}

                {this.state.isOpened && hasChildren && <div className={wrapperClass}>
                    {this.state.node.children.map(n =>
                    <HeadCell
                    key={n.id}
                    node={n}
                    isSubnode={true}
                    isOpened={false}
                    isVertical={this.state.isVertical}
                    pushNode={this.props.pushNode}
                    resizeEmptyBlock = {this.props.resizeEmptyBlock}
                    />)}
                </div>
                }
            </div>
        )
    }

}

export default HeadCell;