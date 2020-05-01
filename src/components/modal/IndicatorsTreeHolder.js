import React from 'react';
import IndicatorsTree from './IndicatorsTree';


const IndicatorsTreeHolder = (props) => {

  return (
    <div className='modal-tree'>

      {props.tree.map(node => {
        return (<IndicatorsTree
          key={node.ID}
          node={node}
          onNodeDownClick={props.onNodeDownClick}
        />)
      })}

    </div>
  )
}

export default IndicatorsTreeHolder;