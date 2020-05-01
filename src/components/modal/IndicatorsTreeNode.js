import React from 'react';

const IndicatorsTreeNode = (props) => {

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
      >
        &#11167;
        </div>
    </div>
  )
}

export default IndicatorsTreeNode;