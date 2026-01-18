import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle, HelpCircle, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Sample quiz data
const quizzes: Record<string, { title: string; questions: QuizQuestion[] }> = {
  'basic-annotations': {
    title: 'Basic Annotations Quiz',
    questions: [
      {
        id: '1',
        question: 'Which of the following is the correct way to annotate a number variable?',
        options: [
          'let age: Number = 25;',
          'let age: number = 25;',
          'let age = number(25);',
          'let number age = 25;'
        ],
        correctAnswer: 1,
        explanation: 'In TypeScript, primitive types use lowercase: string, number, boolean. The uppercase versions (String, Number, Boolean) refer to JavaScript wrapper objects.'
      },
      {
        id: '2',
        question: 'What does the `any` type do?',
        options: [
          'Restricts the variable to any single type',
          'Creates a type that can only be null or undefined',
          'Disables type checking for that variable',
          'Automatically infers the best type'
        ],
        correctAnswer: 2,
        explanation: 'The `any` type disables type checking. A variable of type `any` can be assigned any value without TypeScript errors, but this defeats the purpose of using TypeScript.'
      },
      {
        id: '3',
        question: 'How do you annotate a function parameter?',
        options: [
          'function greet(name): string {}',
          'function greet(string name) {}',
          'function greet(name: string) {}',
          'function greet<string>(name) {}'
        ],
        correctAnswer: 2,
        explanation: 'Function parameters are annotated using a colon after the parameter name, followed by the type: `parameterName: Type`.'
      },
      {
        id: '4',
        question: 'What is type inference in TypeScript?',
        options: [
          'When you must always specify types explicitly',
          'When TypeScript automatically determines types from context',
          'When types are checked at runtime',
          'When types are imported from other files'
        ],
        correctAnswer: 1,
        explanation: 'Type inference is TypeScript\'s ability to automatically determine types based on the values assigned or the context. For example, `let x = 5` infers `x` as `number`.'
      },
      {
        id: '5',
        question: 'Which is the correct way to type an array of strings?',
        options: [
          'let arr: string = [];',
          'let arr: string[] = [];',
          'let arr: [string] = [];',
          'let arr: strings = [];'
        ],
        correctAnswer: 1,
        explanation: 'Arrays are typed using `Type[]` syntax. `string[]` means an array of strings. `[string]` would be a tuple with exactly one string element.'
      }
    ]
  },
  'object-literals': {
    title: 'Object Literals Quiz',
    questions: [
      {
        id: '1',
        question: 'How do you make a property optional in a type definition?',
        options: [
          'name: string | undefined',
          'name?: string',
          'optional name: string',
          'name: string = undefined'
        ],
        correctAnswer: 1,
        explanation: 'Use the `?` operator after the property name to make it optional: `name?: string`. This is equivalent to `name: string | undefined`.'
      },
      {
        id: '2',
        question: 'What does `readonly` do to a property?',
        options: [
          'Makes the property optional',
          'Makes the property private',
          'Prevents the property from being modified after initialization',
          'Makes the property static'
        ],
        correctAnswer: 2,
        explanation: 'The `readonly` modifier prevents a property from being reassigned after the object is created. It provides immutability at the type level.'
      },
      {
        id: '3',
        question: 'Which syntax correctly defines an inline object type?',
        options: [
          'let user: object = { name: "Alice" };',
          'let user: { name: string } = { name: "Alice" };',
          'let user = { name: string };',
          'let user: type { name: string } = { name: "Alice" };'
        ],
        correctAnswer: 1,
        explanation: 'Inline object types use curly braces with property names and types: `{ propertyName: Type }`. The `object` type is too generic and doesn\'t describe the shape.'
      }
    ]
  }
};

export default function Quiz() {
  const { topic } = useParams<{ topic: string }>();
  const quiz = topic ? quizzes[topic] : null;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <HelpCircle className="mx-auto text-slate-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Quiz Not Found</h1>
          <p className="text-slate-400 mb-4">This quiz is coming soon!</p>
          <Link to="/zones" className="text-ts-blue hover:underline">
            Return to Skill Tree
          </Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassing = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isPassing ? 'bg-green-500/20' : 'bg-yellow-500/20'
          }`}>
            <Trophy className={isPassing ? 'text-green-500' : 'text-yellow-500'} size={48} />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {isPassing ? 'Great Job!' : 'Keep Practicing!'}
          </h1>
          
          <p className="text-slate-400 mb-6">
            You scored {score} out of {totalQuestions} ({percentage}%)
          </p>

          <div className="bg-slate-900 rounded-lg p-4 mb-6">
            <div className="text-4xl font-bold text-ts-blue mb-2">+{score * 20} XP</div>
            <p className="text-slate-500 text-sm">Earned from this quiz</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <RotateCcw size={20} />
              Try Again
            </button>
            <Link
              to={`/learn/${topic}`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-ts-blue to-quest-purple rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Review Lesson
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/zones"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Exit Quiz
        </Link>
        <div className="text-slate-400">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ts-blue to-quest-purple transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h2 className="text-xl font-bold mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = isAnswered;

            let optionClass = 'bg-slate-700 border-slate-600 hover:border-slate-500';
            if (showResult) {
              if (isCorrect) {
                optionClass = 'bg-green-500/20 border-green-500';
              } else if (isSelected && !isCorrect) {
                optionClass = 'bg-red-500/20 border-red-500';
              }
            } else if (isSelected) {
              optionClass = 'bg-ts-blue/20 border-ts-blue';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass} ${
                  !isAnswered && 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult && isCorrect ? 'bg-green-500 text-white' :
                    showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-ts-blue text-white' :
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {showResult && isCorrect ? <CheckCircle size={14} /> :
                     showResult && isSelected && !isCorrect ? <XCircle size={14} /> :
                     String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-mono text-sm">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-500/10 border border-green-500/30'
              : 'bg-yellow-500/10 border border-yellow-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
              ) : (
                <HelpCircle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
              )}
              <p className="text-slate-300 text-sm">{question.explanation}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedAnswer === null
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-ts-blue to-quest-purple hover:opacity-90'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-ts-blue to-quest-purple rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="mt-6 text-center text-slate-400">
        Current Score: {score} / {currentQuestion + (isAnswered ? 1 : 0)}
      </div>
    </div>
  );
}
