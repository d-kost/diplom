import React from 'react';
import PropTypes from 'prop-types';

const ValuesTreeNode = (props) => {

  const handleClick = (node) => {
    props.onNodeDownClick(node);
  }

  return (
    <div className='modal-tree__node'>

      {/* {console.log('dimension tree node render')} */}
      {props.node.Children &&
        <span
          className='modal-tree__switch tree-button'
          onClick={props.onSwitchClick}
          tabIndex={0}
        >
          {props.isOpened ? '\u2796' : '\u2795'}
        </span>
      }

      <div className='modal-tree__name'>
        {props.node.ID} {props.node.Name}
      </div>

      <div
        className='modal-tree__button-down tree-button'
        onClick={() => handleClick(props.node)}
        tabIndex={0}
      >
        &#11167;
        </div>
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