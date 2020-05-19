import React, { useState } from 'react';
import ValuesTreeNode from './ValuesTreeNode';


const ValuesTree = (props) => {

  const [isOpened, setIsOpened] = useState(false);

  const onSwitchClick = () => {
    setIsOpened(!isOpened);
  }

  return (
    <div>
      {/* {console.log('indicator tree render')} */}
      <ValuesTreeNode
        node={props.node}
        onSwitchClick={onSwitchClick}
        isOpened={isOpened}
        onNodeDownClick={props.onNodeDownClick}
      />

      <div className='modal-tree__children'>
        {isOpened && props.node.Children &&
          props.node.Children.map(subnode => {
            return (<ValuesTree
              key={subnode.ID}
              node={subnode}
              onNodeDownClick={props.onNodeDownClick}
            />)
          })
        }

      </div>

    </div>
  )
}


export default React.memo(ValuesTree);