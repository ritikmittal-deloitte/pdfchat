// import React, { CSSProperties } from 'react'
// import './MessageBox.scss'

// interface IMessageObj {
//   user: string
//   message: string
// }

// interface IMessage {
//   mObj: IMessageObj
//   darkTheme: boolean
// }

// const MessageBox: React.FC<IMessage> = ({ mObj, darkTheme }): ReturnType<React.FC> => {
//   const { user } = mObj

//   const messageBoxStylesDC: CSSProperties = {
//     border: darkTheme ? '1px solid #5B5B5B' : '1px solid #2BA1E2',
//     boxShadow: darkTheme
//       ? '0px 0px 12px 0px rgba(172, 172, 172, 0.30)'
//       : '0px 0px 12px 0px rgba(43, 161, 226, 0.30)',
//     background: darkTheme ? '#1F1F1F' : ' rgba(215, 240, 254, 0.60)',
//     color: darkTheme ? 'white' : 'black',
//   }
//   const messageBoxStylesUsr: CSSProperties = {
//     border: darkTheme
//       ? 'px solid rgba(228, 228, 228, 0.40)'
//       : '1px solid rgba(174, 174, 174, 0.40)',
//     boxShadow: darkTheme
//       ? '1px 1px 5px 0px rgba(0, 0, 0, 0.10)'
//       : '1px 1px 5px 0px rgba(0, 0, 0, 0.10)',
//     background: darkTheme ? '#363636' : '#ECECEC',
//     color: darkTheme ? 'white' : 'black',
//   }
//   const messageUserStylesDC: CSSProperties = {
//     border: darkTheme ? '1px solid #DDD' : '1px solid #2BA1E2',
//     background: darkTheme ? '#B6B6B6' : '#D7F0FE',
//     left: '30px',
//     top: '-15px',
//   }
//   const messageUserStylesUsr: CSSProperties = {
//     border: '1px solid #AEAEAE',
//     background: '#ECECEC',
//     right: '-18px',
//     bottom: '-13px',
//   }
//   const sourcesTextStyleDC: CSSProperties = {
//     color: darkTheme ? '#BDBDBD' : 'black',
//   }
//   const mockSources = ['LoremIpsum (Pg no. 23)', 'LoremIpsum (Pg no. 10)', 'LoremIpsum (Pg no. 10)']
//   return (
//     <div className='box'>
//       <div
//         className='message-box'
//         style={user === 'chatbot' ? messageBoxStylesDC : messageBoxStylesUsr}
//       >
//         <span className='message'>{mObj.message}</span>
//         {user === 'chatbot' && (
//           <div className='sources-box'>
//             <span className='sources-text' style={sourcesTextStyleDC}>
//               Sources:{' '}
//             </span>
//             {mockSources.map((src, index) => (
//               <a className='links' key={index} href='#'>
//                 {src}
//               </a>
//             ))}
//           </div>
//         )}
//       </div>
//       <div
//         className='message-user'
//         style={user === 'chatbot' ? messageUserStylesDC : messageUserStylesUsr}
//       >
//         {user === 'chatbot' ? 'DC' : 'R'}
//       </div>
//     </div>
//   )
// }

// export default MessageBox

import React, { CSSProperties } from 'react'
import './MessageBox.scss'
import Linkify from 'react-linkify'

interface IMessageObj {
  user: string
  message: string
}

interface IMessage {
  mObj: IMessageObj
  darkTheme: boolean
}

const MessageBox: React.FC<IMessage> = ({ mObj, darkTheme }): ReturnType<React.FC> => {
  const { user } = mObj

  const messageBoxStylesDC: CSSProperties = {
    border: darkTheme ? '1px solid #5B5B5B' : '1px solid #2BA1E2',
    boxShadow: darkTheme
      ? '0px 0px 12px 0px rgba(172, 172, 172, 0.30)'
      : '0px 0px 12px 0px rgba(43, 161, 226, 0.30)',
    background: darkTheme ? '#1F1F1F' : ' rgba(215, 240, 254, 0.60)',
    color: darkTheme ? 'white' : 'black',
  }
  const messageBoxStylesUsr: CSSProperties = {
    border: darkTheme
      ? 'px solid rgba(228, 228, 228, 0.40)'
      : '1px solid rgba(174, 174, 174, 0.40)',
    boxShadow: darkTheme
      ? '1px 1px 5px 0px rgba(0, 0, 0, 0.10)'
      : '1px 1px 5px 0px rgba(0, 0, 0, 0.10)',
    background: darkTheme ? '#363636' : '#ECECEC',
    color: darkTheme ? 'white' : 'black',
  }
  const messageUserStylesDC: CSSProperties = {
    border: darkTheme ? '1px solid #DDD' : '1px solid #2BA1E2',
    background: darkTheme ? '#B6B6B6' : '#D7F0FE',
    left: '30px',
    top: '-15px',
  }
  const messageUserStylesUsr: CSSProperties = {
    border: '1px solid #AEAEAE',
    background: '#ECECEC',
    right: '-18px',
    bottom: '-13px',
  }
  const sourcesTextStyleDC: CSSProperties = {
    color: darkTheme ? '#BDBDBD' : 'black',
  }
  // const mockSources = ['LoremIpsum (Pg no. 23)', 'LoremIpsum (Pg no. 10)', 'LoremIpsum (Pg no. 10)']
  return (
    <div className='box'>
      <div
        className='message-box'
        style={user === 'chatbot' ? messageBoxStylesDC : messageBoxStylesUsr}
      >
        <Linkify
          componentDecorator={(
            decoratedHref: string | undefined,
            decoratedText:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined,
            key: React.Key | null | undefined,
          ) => (
            <a target='blank' href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <span className='message'>{mObj.message}</span>
          {/* {user === 'chatbot' && (
            <div className='sources-box'>
              <span className='sources-text' style={sourcesTextStyleDC}>
                Sources:{' '}
              </span>
              {mockSources.map((src, index) => (
                <a className='links' key={index} href='#'>
                  {src}
                </a>
              ))}
            </div>
          )} */}
        </Linkify>
      </div>
      <div
        className='message-user'
        style={user === 'chatbot' ? messageUserStylesDC : messageUserStylesUsr}
      >
        {user === 'chatbot' ? 'R' : 'U'}
      </div>
    </div>
  )
}

export default MessageBox
