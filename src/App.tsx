import './App.scss';
import MessageBox from './component/MessageBox/MessageBox';
import React, { useState, FormEvent, useEffect } from 'react'
import Roche from './component/Roche';

interface IMessageObj {
  user: string
  message: string
}

interface IMessage {
  mObj: IMessageObj
  darkTheme: boolean
}
interface IMessageObj {
  user: string
  message: string
}

export default function App() {

  const [inputValue, setInputValue] = useState('')
  const [responses, setResponses] = useState<IMessageObj[]>([])
  const [message, setMessage] = useState()
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  // const data = []
  // for (let i = 0; i < 5; i++) {
  //   data.add(examplesText)
  // }
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  // const handleRegenerate = async (value: any) => {
  //   setInputValue(value)
  // }
  const [lastItem] = responses.slice(-2)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    // You can use the `inputValue` state value here
    if (inputValue.trim() !== '') {
      setResponses([...responses, { user: 'user', message: `${inputValue}` }])
      setInputValue('')
    }

    // to add update user input in chatlogs
    const responsesNew: IMessageObj[] = [...responses, { user: 'user', message: `${inputValue}` }]
    setResponses(responsesNew)

    // show loading until response is coming from api
    setResponses([...responsesNew, { user: 'chatbot', message: 'Your Response here' }])
    setDisable(true)
    // try {
    //   const response = await fetch(`${BASE_URL}${dataSourceUrl}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Access-Control-Allow-Origin': '*',
    //     },
    //     body: JSON.stringify({
    //       question: `${inputValue}`,
    //     }),
    //   })
    //   const data = await response.json()
    //   // add gpt response to chatlog
    //   setResponses([...responsesNew, { user: 'chatbot', message: `${data.answer}` }])

    //   // remove disabling once api response received
    //   setDisable(false)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const UpScroll = (querySelect: string) => {
    const up: any = document.querySelector(querySelect)
    up.scrollBy(0, -200)
  }
  const DownScroll = (querySelect: string) => {
    const down: any = document.querySelector(querySelect)
    down.scrollBy(0, 200)
  }
  const [dataSourceUrl, setDataSourceUrl] = useState('')
  const [dataSource, setDataSource] = useState('pubmed_clinical')
  // state to store boolean value for disabling input field
  const [disable, setDisable] = useState(false)


  // handle data source radio buttons change
  const handleChange = (e: any) => {
    if (e.target.checked) {
      setDataSource(e.target.value)
    }
  }

  return (
    <div className="App">
      {/* <div className='pdf-section'>
      <iframe src="https://research.google.com/pubs/archive/44678.pdf"
   width="100%" height="100%" />
      </div>
      <div className='chat-section'>
      <div className={darkTheme ? 'chat-box dark' : 'chat-box white'}>
          <div className='chat-message-box'>
              <div className='chat-content-container'>
                {responses.map((mObj: IMessageObj) => MessageBox({ mObj, darkTheme }))}
                {responses.length !== 0 && (
                  <div className='regenerate-button-holder'>
                    <div
                      className={darkTheme ? 'regenerate-button button-white' : 'regenerate-button'}
                      // clear existing chatlogs on click of Refresh Chat button
                      onClick={() => {
                        setInputValue(lastItem.message)
                      }}
                    >
                      <span>
                        {darkTheme ? (
                          <img src='./assets/icons/regenerate-icon.svg' />
                        ) : (
                          <img src='./assets/icons/Union.svg' />
                        )}
                      </span>
                      Regenerate Response
                    </div>
                  </div>
                )}
              </div>
          </div>

          <div className='question-box'>
            <div className='input-box'>
              <form onSubmit={handleSubmit} className='input-field-1'>
                <input
                  type='text'
                  disabled={disable}
                  value={inputValue}
                  onChange={handleInputChange}
                  className={darkTheme ? 'input-field__input-1 text-white' : 'input-field__input-1'}
                  placeholder='Send a message...'
                />
                <button disabled={disable} type='submit' className='input-field__button'>
                  <img src='./assets/icons/right-arrow-text-field.svg' />
                </button>
              </form>
            </div>
          </div>
        </div>
    </div> */}
    <Roche />
    </div>
  );

  }
  
