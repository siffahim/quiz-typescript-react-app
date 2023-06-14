import { useEffect, useState } from 'react';
import './App.css';

interface QuizQuestion{
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizData{
  title: string;
  description: string;
  questions: Array<QuizQuestion>
}

function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0)


   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('quizData.json');
        const data = await response.json();
        setQuizData(data.quiz);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  if (!quizData) {
    <div>Loading...</div>
  }

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  const handleSelect = (e:any) => {
    console.log('hi')
  }

  const handleNextQuestion = () => {
     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div className="w-4/5 m-auto p-5 px-10 bg-green-50">
      <div className='text-center mb-10'>
         <h2 className='text-3xl text-green-500 font-bold'>{quizData?.title}</h2>
        <p className='text-xl'>{quizData?.description}</p>
      </div>
      
      <h2 className='mb-4'>Questions {currentQuestionIndex + 1}/{quizData?.questions.length}</h2>
      <p className='text-xl'>{currentQuestion?.question}</p>

      <ul>
        {
          currentQuestion?.options.map((option, index) => <li
            key={index}
            className='border p-3 my-2 rounded'
            onChange={(e) => handleSelect(e)}
          >
            {option}
          </li>)
        }
      </ul>

      <div className='flex justify-end'>
          <button onClick={handleNextQuestion} className='border px-7 py-2 bg-indigo-500 text-white font-semibold rounded'>Next</button>
        </div>
    </div>
  );
}

export default App;
