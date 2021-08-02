import React from 'react'
import DragDrop from './DragDrop/DragDrop'

export default function App() {
  //Props Data Start
  const containersArray = [
    {
      id: 1,
      content: 'container 1',
      type: 'container',
      children: [
        {
          content: 'item 1',
          width: 2
        }
      ]
    },
    {
      id: 2,
      content: 'container 2',
      type: 'container',
      children: [
        {
          content: 'item 2',
          width: 2
        }
      ]
    },
    {
      id: 3,
      content: 'container 3',
      type: 'container',
      children: [
        {
          content: 'item 3',
          width: 2
        }
      ]
    }
  ]
  const itemsArray = [
    {
      id: 1,
      type: 'Item',
      children: [
        {
          id: 4,
          content: 'item 4',
          width: 2,
          type: 'text'
        },
        {
          id: 5,
          content: 'item 5',
          width: 2,
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      type: 'Item',
      children: [
        {
          id: 6,
          content: 'item 6',
          width: 2,
          type: 'text'
        },
        {
          id:7,
          content: 'item 7',
          width: 2,
          type: 'text'
        }
      ]
    }
  ]
  const renderBlockWrapperStyle = {
    position: 'relative',
    background: 'white',
    padding: '20px',
    marginBottom: '10px',
    border: '1px solid lightgray',
    borderRadius: '4px',
    cursor: 'move'
  }

  const renderCardStyle = {
    justifyContent: 'space-around',
    backgroundColor: '#ebecf0',
    borderRadius: '3px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    position: 'relative',
    whiteSpace: 'normal',
    width: '48%',
    padding: '3%',
  }
  const renderContainerStyle = {
    display: 'block', 
    justifyContent: 'space-around'
  }
  
  const onChange = (containArr, itemArr) => {
    console.log(
      '*** You can see the updated containArr and item Arry when change the Drop event',
      containArr,
      itemArr
    )
  }
  //Props Data End

  return (
    <div>
      <DragDrop
        containersArray={containersArray}
        itemsArray={itemsArray}
        renderCardStyle={renderCardStyle}
        renderContainerStyle={renderContainerStyle}
        renderBlockWrapperStyle={renderBlockWrapperStyle}
        onChange={onChange}
      />
    </div>
  )
}
