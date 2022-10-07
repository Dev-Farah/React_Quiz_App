import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography, Divider, Chip, Avatar, Button } from '@mui/material';

function App() {
  let [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is Git?",
      options: {
        a: "A programming language",
        b: "A remote repository platform",
        c: "A nickname for GitHub",
        d: "A version control system",
      },
      answer: "A version control system",
    },
    {
      id: 2,
      question: "HTTP stands for:",
      options: {
        a: "Hyper-link Text Provider",
        b: "HTML Topic Traffic Pointer",
        c: "Hypertext Transfer Protocol",
        d: "Hyperlink Transit Path",
      },
      answer: "Hypertext Transfer Protocol",
    },
    {
      id: 3,
      question: "What does Client-Side JavaScript and Server-Side JavaScript have in common?",
      options: {
        a: "Both are run on the server",
        b: "Core JavaScript",
        c: "Both are run on the web browser",
        d: "Client-side additions",
      },
      answer: "Core JavaScript",
    },
    {
      id: 4,
      question: "What is the role of JavaScript in web development?",
      options: {
        a: "Styles",
        b: "Layout and rendering",
        c: "Actions and functionality",
        d: "Nothing",
      },
      answer: "Actions and functionality",
    },
    {
      id: 5,
      question: "What is the symbol used for logical operator OR?",
      options: {
        a: "//",
        b: "$$",
        c: "||",
        d: "&&",
      },
      answer: "||",
    },
    {
      id: 6,
      question: "What is the syntax for Javascript Ternary?",
      options: {
        a: "condition ? exprIfTrue : exprIfFalse",
        b: "expression ? exprIfTrue : exprIfFalse",
        c: "condition ? exprIfFalse : exprIfTrue",
        d: "condition ? exprIfTrue ; exprIfFalse",
      },
      answer: "condition ? exprIfTrue : exprIfFalse",
    },
    {
      id: 7,
      question: "What Is The Resolution Of The Human Eye?",
      options: {
        a: "576 Megapixels",
        b: "476 Megapixels",
        c: "376 Megapixels",
        d: "276 Megapixels",
      },
      answer: "576 Megapixels",
    },
  ]);
  let [indexNo, setIndexNo] = useState(0);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [message, setMessage] = useState(false);
  let [chipBg, setChipBg] = useState('');

  // For timer
  let timer;
  let [seconds, setSeconds] = useState(60)
  let [minutes, setMinutes] = useState(0)

  let checkAns = (usersAns) => {
    setMessage(true);
    if (usersAns[1] === questions[indexNo].answer) {
      console.log(usersAns);
      // setChipBg('#')
      usersAns.backgroundColor = "green"
      setScore(score + 1);
    }
  }

  let next = () => {
    setMessage(false);
    setIndexNo(indexNo + 1);
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds - 1)
      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(0)
      }
    }, 1000);
    if (seconds == 0 || indexNo + 1 === questions.length) {
      clearInterval(timer)
      setResult(true)
    }
    return () => clearInterval(timer)
  })

  return (
    <>
      <div className="App">
        {result ? <Container sx={{ marginTop: "40px", borderRadius: "20px", width: "550px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
        <Typography variant='h6'>
          You've attepmt {indexNo} Questions in {minutes} min {60 - seconds} secs
          </Typography>
          <Typography variant='h4'>Your score is: {score}
          </Typography></Container> :

          <Container sx={{ marginTop: "40px", borderRadius: "20px", width: "550px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            
            <Box p={2} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Typography variant='p'>
            Score {score}
            </Typography>
            <Typography variant='p'>
            Time left: {minutes}: {seconds}
            </Typography>
            </Box>
            <Divider />

            {/* Render Questions */}
            <Typography variant='h4'>
              {questions[indexNo].question}
            </Typography>

            {/* Render Options */}
            <Grid container textAlign= "start">
              {Object.entries(questions[indexNo].options).map((e) => {
                return (
                  <>
                    <Grid item xl={12} lg={12} md={6}>
                      <Chip 
                        disabled={message}
                        sx={{ margin: .6, backgroundColor: 'f1f1f1' }}
                        avatar={<Avatar>{e[0]}</Avatar>}
                        label={e[1]}
                        onClick={() => checkAns(e)}
                      /><br />
                    </Grid>
                  </>
                )
              })}
            </Grid>

            <Divider />
            <Box p={2} sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Typography variant='caption'>
            Question {indexNo + 1} / {questions.length}
            </Typography>
            {message ? <Button variant='contained' onClick={() => next()} >Next</Button> : null}
            </Box>
          </Container>}

      </div>
    </>
  );
}

export default App;
