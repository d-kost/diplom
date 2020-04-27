import React from 'react';
import DimensionsTree from './DimensionsTree';


const DimensionsTreeHolder = (props) => {

  return (
    <div className='modal-tree'>

      {props.tree.map(node => {
        return (<DimensionsTree
          key={node.ID}
          node={node}
        />)
      })}

    </div>
  )
}

export default DimensionsTreeHolder;