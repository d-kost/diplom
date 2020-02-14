import React, { Component } from 'react'
// import testData from '../test-data.json'
import testData from '../json/horizontal.json'
import HeadCell from './HeadCell.js'
import '../sass/TableHead.sass'

class TableHead extends Component{

    constructor(props) {
        super(props);

        this.state = {
            nodes: testData
        }
    }

    render(){
        return(
            <div className="head">
                {this.state.nodes.map(n => <HeadCell key={n.id} node={n} isSubnode={false} isOpened={true}/>)}
            </div>
            
            
        )
    }

}

export default TableHead;