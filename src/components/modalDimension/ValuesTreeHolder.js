import React from 'react';
import ValuesTree from './ValuesTree';
import PropTypes from 'prop-types';


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

ValuesTreeHolder.propTypes = {
  tree: PropTypes.arrayOf(PropTypes.object),
  onNodeDownClick: PropTypes.func
}

export default ValuesTreeHolder;