import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import styled from 'styled-components'
import './styles.css'

const StyledBlockWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  cursor: move;
  display:
  &:hover {
    //background: #eeeeee;
  }
`

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
}

export default function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      content: 'item 1',
      parent_id: null,
      type: 'container',
      children: [
        {
          id: 2,
          content: 'item 2',
          width: 3,
          type: 'text',
          parent_id: 1
        },
        {
          id: 3,
          content: 'item 3',
          width: 3,
          type: 'text',
          parent_id: 1
        }
      ]
    },
    {
      id: 4,
      content: 'item 2',
      parent_id: null,
      type: 'container',
      children: [
        {
          id: 6,
          content: 'item 6',
          width: 2,
          type: 'text',
          parent_id: 2
        },
        {
          id: 7,
          content: 'item 7',
          width: 2,
          type: 'text',
          parent_id: 2
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
          sort={false}
          setList={setBlocks}
          group={{
            name: 's',
            pull: false,
            put: false
          }}
          {...sortableOptions}>
          <BlockWrapper
            key={blocks[0].id}
            block={blocks[0]}
            blockIndex={0}
            setBlocks={setBlocks}
          />
        </ReactSortable>
      </div>
      <div className='Card-2'>
        <ReactSortable
          style={{ display: 'block', justifyContent: 'space-around' }}
          list={blocks}
          setList={setBlocks}
          animation={300}
          delay={0}
          group={{
            name: 's',
            pull: true,
            put: false
          }}>
          <ReactSortable
            group={{
              name: 's',
              pull: true,
              put: false
            }}
            key={blocks[1].id}
            list={blocks[1].children}
            setList={(currentList) => {
              setBlocks((sourceList) => {
                const tempList = [...sourceList]
                const _blockIndex = [1]
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
            {blocks[1].children &&
              blocks[1].children.map((childBlock, index) => {
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
        </ReactSortable>
      </div>
    </div>
  )
}
function Container({ block, blockIndex, setBlocks }) {
  return (
    <ReactSortable
      group={{
        name: 's',
        pull: true,
        put: true
      }}
      key={block.id}
      list={block.children}
      setList={(currentList) => {
        setBlocks((sourceList) => {
          const tempList = [...sourceList]
          const _blockIndex = [blockIndex]
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
      {block.children &&
        block.children.map((childBlock, index) => {
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
  )
}
function BlockWrapper({ block, blockIndex, setBlocks }) {
  // console.log(block);
  if (!block) return null
  if (block.type === 'container') {
    return (
      <StyledBlockWrapper className='block'>
        container: {block.content}
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </StyledBlockWrapper>
    )
  } else {
    return (
      <StyledBlockWrapper className='block'>
        text: {block.content}
      </StyledBlockWrapper>
    )
  }
}
