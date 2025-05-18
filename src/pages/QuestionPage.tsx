import { triviaAPI }from '../services/TriviaService'
import { useEffect, useState, useRef, JSX } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Question from 'src/types/Question'
import { getCategoryIdByName } from '../services/CategoryService'
import MainFooter from '../components/MainFooter'
import MainHeader from '../components/MainHeader'
import axios from 'axios'
import BackButton from '../components/BackButton.js'

export default function QuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [hasAnswered, setHasAnswered] = useState<boolean>(false)
  const [answerElement, setAnswerElement] = useState<JSX.Element>(<></>)
  const hasFetched = useRef<boolean>(false)

  const navigate = useNavigate()

  const { category } = useParams();

  async function fetchQuestion() {
    triviaAPI.get('', {
      params: {
        amount: 1,
        category: getCategoryIdByName(category),
        type: 'multiple'
      }
    })
    .then(async (res) => {
      const question: Question = res.data.results[0]
      setQuestion(question)
      const allAnswers = [...question.incorrect_answers, question.correct_answer]
      setAnswers(allAnswers.sort(() => Math.random() - 0.5))
    })
    .catch(err => {
      if (err.response.status === 429) {
        setTimeout(() => fetchQuestion(), 1000)
      }
      else {
        console.error(err)
      }
    }) 
  }

  useEffect(() => {
    // Make sure request is made only
    // once when rendered
    if (hasFetched.current) return
    hasFetched.current = true

    fetchQuestion()
  })

  function checkAnswer(answer: string, ev: React.MouseEvent) {
    ev.preventDefault()

    if (hasAnswered) return
    setHasAnswered(true)

    if (answer === question?.correct_answer) {
      axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/increase-balance`, {}, {
        withCredentials: true,
        params: {
          amount: 5
        }
      })
      .then((res) => {
        console.log(res)
      })
      setAnswerElement(
        <div className='message'>You have answered correctly!</div>
      )
    }
    else {
      setAnswerElement(
        <div className='message'>You have answered falsely {`:(`}</div>
      )
    }
  }

  function handleReturnHomeClick(ev: React.MouseEvent) {
    ev.preventDefault()

    navigate("/")
  }

  return (
    <>
      <MainHeader />
      <form className='question-form'>
        {
        question ?
        <>
          <div className="header-back-button">
            <BackButton />
            <h2 dangerouslySetInnerHTML={{__html: question.category}}></h2>
          </div>
          <div className='question' dangerouslySetInnerHTML={{ __html: question.question || 'loading...'}}></div>
        </>
            : <div className="lds-hourglass"></div>
        }

        <div className="question-group">
          <button className='answer' onClick={(ev) => checkAnswer(answers[0], ev)} dangerouslySetInnerHTML={{__html: answers[0]}}></button>
          <button className='answer' onClick={(ev) => checkAnswer(answers[1], ev)} dangerouslySetInnerHTML={{__html: answers[1]}}></button>
        </div>
        <div className="question-group">
          <button className='answer' onClick={(ev) => checkAnswer(answers[2], ev)} dangerouslySetInnerHTML={{__html: answers[2]}}></button>
          <button className='answer' onClick={(ev) => checkAnswer(answers[3], ev)} dangerouslySetInnerHTML={{__html: answers[3]}}></button>
        </div>

        {
          hasAnswered && 
          <div className='answered-element'>
            {answerElement}
            <div className="button-group">
              <button className="return-home" onClick={(ev) => handleReturnHomeClick(ev)}>return home</button>
              <button className="try-again">try a different question</button>
            </div>
          </div>
        }

      </form>
      <MainFooter />
    </>
  )
}