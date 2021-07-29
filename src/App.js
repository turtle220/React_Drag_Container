import React from 'react';
import DragDrop from './DragDrop/DragDrop'

export default function App() {
  const containersArray = [
    {
      id: 1,
      content: 'container 1',
      type: 'container',
      children: [{
          content: 'item 1',
          width: 2
        }
      ]
    },
    {
      id: 2,
      content: 'container 2',
      type: 'container',
      children: [{
          content: 'item 2',
          width: 2
        }
      ]
    },
    {
      id: 3,
      content: 'container 3',
      type: 'container',
      children: [{
          content: 'item 3',
          width: 2
        }
      ]
    }
  ]
  const itemsArray = [
    {
      id: 4,
      content: 'item 4',
      type: 'Item',
      children: [
        {
          id: 5,
          content: 'item 5',
          width: 2,
          type: 'text',
        },
        {
          id: 6,
          content: 'item 6',
          width: 2,
          type: 'text',
        }
      ]
    },
    {
      id: 7,
      content: 'item 7',
      type: 'Item',
      children: [
        {
          id: 7,
          content: 'item 7',
          width: 2,
          type: 'text',
        },
        {
          id: 8,
          content: 'item 8',
          width: 2,
          type: 'text',
        }
      ]
    }
  ]
  return (
    <div>
      <DragDrop containersArray={containersArray} itemsArray={itemsArray} />
    </div>
  );
}