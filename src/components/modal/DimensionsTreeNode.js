import React from 'react';

const DimensionsTreeNode = (props) => {

  return (
    <div className='modal-tree__node'>
      {console.log('dimension tree node render')}
      {props.node.Children &&
        <span
          className='modal-tree__switch'
          onClick={props.onSwitchClick}
        >
          {props.isOpened ? '-' : '+'}
        </span>
      }

      <span>
        {props.node.ID} {props.node.Name}
      </span>
    </div>
  )
}

export default DimensionsTreeNode;