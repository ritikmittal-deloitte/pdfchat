import './Roche.scss'
import React, { useState, FormEvent, useEffect } from 'react'
import MessageBox from './MessageBox/MessageBox'
import { BASE_URL, PUMBED_URL, CLINICAL_URL, GPT_URL, MASTER_URL } from '../../Urls'

interface IMessageObj {
  user: string
  message: string
}

interface IMessage {
  mObj: IMessageObj
  darkTheme: boolean
}

export default function Roche() {
  const [inputValue, setInputValue] = useState('')
  const [responses, setResponses] = useState<IMessageObj[]>([])
  const [message, setMessage] = useState()
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const examplesText = [
    'What is the standard of care for Diffuse large B cell Lymphoma ?',
    'What is the second line standard of care treatment for Diffuse large B cell Lymphoma ?',
    'What is the significance of KI67 in Breast Cancer ?',
  ]
  const capabilitiesText = [
    'Real time access to data to through APIs of data providers as the data gets updated frequently',
    'Leverage APIs of the respective data such as ClinicalTrials.gov and Pubmed',
    'Output contextualized and summarized to be more domain centric for clinical scientists',
    'Asynchronous call to fetch data from all data sources in parallel',
  ]
  const limitationsText = [
    'Reliability on Public APIs - There is not much data on the authenticity of these APIs, they does keyword-based search',
    'Public APIs have a limit. Eg: Pubmed API has a limit of 10 calls per second',
    'Bot does not remember the Conversational history of the chat as it is not trained on the data',
  ]
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
    setResponses([...responsesNew, { user: 'chatbot', message: 'Loading...' }])
    setDisable(true)
    try {
      const response = await fetch(`${BASE_URL}${dataSourceUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          question: `${inputValue}`,
        }),
      })
      const data = await response.json()
      // add gpt response to chatlog
      setResponses([...responsesNew, { user: 'chatbot', message: `${data.answer}` }])

      // remove disabling once api response received
      setDisable(false)
    } catch (error) {
      console.log(error)
    }
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

  useEffect(() => {
    switch (dataSource) {
      case 'pubmed':
        setDataSourceUrl(PUMBED_URL)
        break
      case 'clinical':
        setDataSourceUrl(CLINICAL_URL)
        break
      case 'chatgpt':
        setDataSourceUrl(GPT_URL)
        break
      default:
        setDataSourceUrl(MASTER_URL)
    }
    // setResponses([{ user: 'chatbot', message: 'Welcome! How can I help you today?' }])
  }, [dataSource])

  // handle data source radio buttons change
  const handleChange = (e: any) => {
    if (e.target.checked) {
      setDataSource(e.target.value)
    }
  }
  return (
    <div className='roche-main-container'>

      <div className='content-section'>
        <aside className='side-menu'>
        <div className='pdf-section'>
      <iframe src="https://research.google.com/pubs/archive/44678.pdf"
   width="100%" height="100%" />
      </div>
        </aside>

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
      </div>
    </div>
  )
}
