import React, { useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import BlockWrapper from './BlockWrapper'

const sortableOptions = {
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function DragDrop({
  containersArray,
  itemsArray,
  renderCardStyle,
  renderContainerStyle,
  renderBlockWrapperStyle,
  onChange
}) {
  const [blocks, setBlocks] = useState(containersArray)
  const [items, setItems] = useState(itemsArray)

  useEffect(()=>{
    onChange(blocks, items)
  }, [blocks])
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={renderCardStyle}>
        <ReactSortable
          style={renderContainerStyle}
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
          {blocks.map((block, index) => {
            return (
              <BlockWrapper
                renderBlockWrapperStyle={renderBlockWrapperStyle}
                key={block.id}
                block={block}
                blockIndex={[index]}
                setBlocks={setBlocks}
              />
            )
          })}
        </ReactSortable>
      </div>
      <div style={renderCardStyle}>
        <ReactSortable
          delay={2}
          style={renderContainerStyle}
          list={items}
          setList={()=>setItems}
          group={{
            name: 's',
            pull: true,
            put: true
          }}>
          {items && items.map((item, index) => (
            <ReactSortable
              key={index}
              style={renderContainerStyle}
              group={{
                name: 's',
                pull: true,
                put: true
              }}
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
                  lastArr[lastIndex]['children'] = currentList
                  return tempList
                })
              }}
              {...sortableOptions}>
              {(item.children && item.id && item.children.length > 0) &&
                item.children.map((childBlock, index) => {
                  return (
                    <BlockWrapper
                      renderBlockWrapperStyle={renderBlockWrapperStyle}
                      key={index}
                      block={childBlock}
                      blockIndex={[index]}
                      setBlocks={setItems}
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
