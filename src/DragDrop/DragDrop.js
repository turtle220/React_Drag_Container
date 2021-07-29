import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import BlockWrapper from './BlockWrapper'
import './index.css'

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function DragDrop({props}) {
  console.log(props, 'You can check the props value here so you can use it')
  const [blocks, setBlocks] = useState([
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
  ])
  const [items, setItems] = useState([
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
  ])
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='Card-1'>
        <ReactSortable
          style={{ display: 'block', justifyContent: 'space-around' }}
          list={blocks}
          delay={2}
          sort={true}
          setList={setBlocks}
          group={{
            name: 's',
            pull: false,
            put: false
          }}
          {...sortableOptions}>
          {blocks.map((block, index) => (
            <BlockWrapper
              key={block.id}
              block={block}
              blockIndex={[index]}
              setBlocks={setBlocks}
            />
          ))}
        </ReactSortable>
      </div>
      <div className='Card-2'>
        <ReactSortable
          style={{ display: 'block', justifyContent: 'space-around' }}
          list={items}
          setList={setItems}
          animation={300}
          delay={0}
          group={{
            name: 's',
            pull: true,
            put: true
          }}>
          {items.map((item, index) => (
            <ReactSortable
              group={{
                name: 's',
                pull: true,
                put: true
              }}
              key={item.id}
              list={item.children}
              setList={(currentList) => {
                setItems((sourceList) => {
                  const tempList = [...sourceList]
                  const _blockIndex = [index]
                  const lastIndex = _blockIndex.pop()
                  const lastArr = _blockIndex.reduce(
                    (arr, i) => arr[i]['children'],
                    tempList
                  )
                  console.log(lastIndex)
                  lastArr[lastIndex]['children'] = currentList
                  return tempList
                })
              }}
              {...sortableOptions}>
              {item.children &&
                item.children.map((childBlock, index) => {
                  return (
                    <BlockWrapper
                      key={childBlock.id}
                      block={childBlock}
                      blockIndex={[index]}
                      setBlocks={setBlocks}
                    />
                  )
                })}
            </ReactSortable>
          ))}
        </ReactSortable>
      </div>
    </div>
  )
}