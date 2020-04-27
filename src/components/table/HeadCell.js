import React, { PureComponent } from "react"
import '../../sass/HeadCell.sass'
import OpenBtn from "./OpenBtn"
import PropTypes from 'prop-types'

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

    generateNodeClass() {
        const nodeClass = ["node"];
        if (this.state.isSubnode) nodeClass.push("node__subnode");
        if (this.state.isSubnode && this.state.isVertical) nodeClass.push("node__subnode--vertical");
        if (!this.state.isSubnode && this.state.isVertical) nodeClass.push("node--vertical");

        if (!this.state.isOpened && !this.state.isVertical) nodeClass.push("cell-width");
        if (!this.state.isOpened && this.state.isVertical) nodeClass.push("cell-height");

        return nodeClass;
    }

    generateClass(sourceClass) {
        const resultClass = [sourceClass];
        if (this.state.isVertical) {
            resultClass.push(`${sourceClass}--vertical`);
        } else {
            resultClass.push(`${sourceClass}--horizontal`);
        }
        return resultClass;
    }

    render(){
        // console.log(this.state.node.text);
        const openSign = this.state.isOpened ? "-" : "+";

        const nodeClass = this.generateNodeClass();
        const wrapperClass = this.generateClass("node__wrapper");
        const node_container = this.generateClass("node__container");
    
        const hasChildren = this.state.node.children && this.state.node.children.length > 0;
  

        return(
            <div className={nodeClass.join(' ')} data-cell={this.state.node.text}>
                <div className={node_container.join(' ')}>
                    {hasChildren &&
                    <OpenBtn
                        openSign={openSign}
                        openClickHandler={this.openClickHandler}
                    /> }
                    
                    <p className="node__text">{this.state.node.text}</p>
                </div>

                {/* {hasChildren && this.pushNode(this.state.node.text)} */}

                {this.state.isOpened && hasChildren &&
                <div className={wrapperClass.join(' ')}>
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

HeadCell.propTypes = {
    node: PropTypes.object,
    isSubnode: PropTypes.bool,
    isOpened: PropTypes.bool,
    isVertical: PropTypes.bool,
    pushNode: PropTypes.func,
    resizeEmptyBlock: PropTypes.func
}

export default HeadCell;