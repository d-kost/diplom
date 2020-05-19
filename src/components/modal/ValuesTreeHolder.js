import React from 'react';
import ValuesTree from './ValuesTree';


const ValuesTreeHolder = (props) => {

  return (
    <div className='modal-tree'>

      {props.tree.map(node => {
        return (<ValuesTree
          key={node.ID}
          node={node}
          onNodeDownClick={props.onNodeDownClick}
        />)
      })}

    </div>
  )
}

export default ValuesTreeHolder;