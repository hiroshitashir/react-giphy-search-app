import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { GifsResult } from '@giphy/js-fetch-api';

import './App.css'
import GifService from '../services/Giphy.service';
import Grid from '../components/Grid/Grid';


export const gifyService = new GifService()

interface State {
  result: GifsResult|undefined
  error: Error|undefined
}

export function App() {
  const [state, setState] = useState<State>({
    result: undefined,
    error: undefined
  })

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.currentTarget.elements as typeof e.currentTarget.elements & {
      keywords: { value: string }
    }
    
    const keywords = target.keywords.value
    if (keywords) {
      try {
        const result = await gifyService.searchGIFs(keywords)
        setState({...state, result: result})
      } catch(err) {
        setState({...state, 'error': err as Error})
        console.error("Error while searching GIFs:", err)
      }
    }
  }

  return (
    <div className="App">
      <h1 className='App-title mb-5'>GIFs Search</h1>

      <Container>
        <Form onSubmit={handleSubmit} >
          <Row className='justify-content-center'>
            <Col sm={6}>
              <InputGroup className='mb-5'>
                <Form.Control className="Input-search" size="lg" type="text" name="keywords" placeholder="Search GIFs" />
                <Button type="submit" className="Btn-search" variant="dark">
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>

        <Grid result={state.result} />

        {state.error &&
          <span>
            An error has occurred fetching GIFs: {state.error.message}
          </span>
        }
      </Container>

    </div>
  );
}

export default App
