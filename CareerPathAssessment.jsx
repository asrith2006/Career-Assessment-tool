import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: "How much do you enjoy solving complex problems?",
    category: "problem_solving"
  },
  {
    id: 2,
    text: "How comfortable are you working with data and numbers?",
    category: "analytical"
  },
  {
    id: 3,
    text: "How interested are you in designing user experiences?",
    category: "design"
  },
  {
    id: 4,
    text: "How much do you enjoy learning new technologies?",
    category: "technical"
  },
  {
    id: 5,
    text: "How interested are you in understanding user behavior?",
    category: "research"
  }
];

const careerPaths = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    requiredSkills: ["problem_solving", "technical"],
    description: "Design and develop software applications",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    requiredSkills: ["analytical", "technical"],
    description: "Analyze complex data sets to find patterns",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    requiredSkills: ["design", "research"],
    description: "Design user-friendly interfaces",
  }
];

function CareerPathAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].category]: value
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = careerPaths.map(career => {
      const matchScore = career.requiredSkills.reduce((score, skill) => {
        return score + (answers[skill] || 0);
      }, 0) / career.requiredSkills.length;
      
      return {
        ...career,
        matchPercentage: Math.round(matchScore * 20)  // Convert to percentage
      };
    });

    setResults(scores.sort((a, b) => b.matchPercentage - a.matchPercentage));
    setShowResults(true);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    question: {
      marginBottom: '20px',
      fontSize: '1.2em',
    },
    options: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px',
    },
    button: {
      padding: '10px 20px',
      margin: '0 5px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#6366F1',
      color: 'white',
    },
    results: {
      marginTop: '30px',
    },
    careerCard: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      backgroundColor: 'white',
    },
    progressBar: {
      width: '100%',
      height: '10px',
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
      marginTop: '10px',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#6366F1',
      borderRadius: '5px',
      transition: 'width 0.5s ease-in-out',
    }
  };

  if (showResults) {
    return (
      <div style={styles.container}>
        <h2>Recommended Career Paths</h2>
        <p style={{ color: '#666' }}>Based on your assessments and interests, here are careers that match your profile</p>
        
        <div style={styles.results}>
          {results.map((career) => (
            <div key={career.id} style={styles.careerCard}>
              <h3>{career.title}</h3>
              <p>{career.matchPercentage}% Match</p>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${career.matchPercentage}%`
                  }}
                />
              </div>
              <p style={{ marginTop: '10px', color: '#666' }}>{career.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Career Assessment</h2>
      <div style={styles.question}>
        {questions[currentQuestion].text}
      </div>
      <div style={styles.options}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            style={styles.button}
            onClick={() => handleAnswer(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
    </div>
  );
}

export default CareerPathAssessment;