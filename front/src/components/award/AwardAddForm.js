import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AwardAddForm = ({ setIsAdding }) => {
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post('', {

  //     });
  //   } catch (err) {
  //     console.log('내역 추가에 실패하였습니다.', err);
  //   }
  // };
  return (
    <Form>
      <Form.Group controlId='awardAddTitle'>
        <Form.Control type='text' placeholder='수상내역' />
      </Form.Group>
      <Form.Group className='mt-3' controlId='awardAddDescription'>
        <Form.Control type='text' placeholder='상세내역' />
      </Form.Group>

      <Row className='text-center mt-3'>
        <Col>
          <Button
            className='me-3'
            variant='primary'
            type='submit'
            // onClick={handleClick}
          >
            확인
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => {
              setIsAdding(false);
            }}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AwardAddForm;
