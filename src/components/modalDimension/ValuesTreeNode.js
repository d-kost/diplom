import React from 'react';
import PropTypes from 'prop-types';

const ValuesTreeNode = (props) => {

  return (
    <div className='modal-tree__node'>

      {/* {console.log('dimension tree node render')} */}
      {props.node.Children &&
        <button
          className='modal-tree__switch tree-button'
          onClick={props.onSwitchClick}
        >
          {props.isOpened ? '\u2796' : '\u2795'}
        </button>
      }

      <div className='modal-tree__name'>
        {props.node.ID} {props.node.Name}
      </div>

      <button
        className='modal-tree__button-down tree-button'
        onClick={() => props.onNodeDownClick(props.node)}
      >
        &#11167;
        </button>
    </div>
  )
}

ValuesTreeNode.propTypes = {
  node: PropTypes.object,
  onSwitchClick: PropTypes.func,
  isOpened: PropTypes.bool,
  onNodeDownClick: PropTypes.func
}

export default ValuesTreeNode;