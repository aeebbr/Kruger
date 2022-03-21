import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { getRegExp } from 'korean-regexp';
import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get('userlist').then((res) => setUsers(res.data));
    }, [userState, navigate]);

    /**
     *
     * @param {코치님 여기에여!코치님 여기에여!코치님 여기에여!코치님 여기에여!코치님 여기에여!
     * 입력창에 입력 할 때마다 네트워크 창에서 name을 매치시켜 찾는 로직입니다!
     * 외부 라이브러리 korean-regexp 활용했습니다.
     * 좀 더 좋은 방법으로 개선할 방향이 있을까요! 라이브러리를 쓰지 않고 하거나요!
     * 라이브러리를 사용해서 해결해서 오케이라면 이 질문은 넘어가 주셔도 괜찮습니다!
     * }
     */
    const handleOnChange = (e) => {
        setInputValue(e.target.value);
        const regexp = getRegExp(e.target.value, {
            initialSearch: true,
            fuzzy: true
        });

        const searchList = users.filter((user) => {
            return user.name.match(regexp) || user.email.match(regexp);
        });
        setSearchUsers([...searchList]);
    };

    const handleOnClickAscUser = () => {
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? -1
                : userA.name > userB.name
                ? 1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickDescUser = () => {
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? 1
                : userA.name > userB.name
                ? -1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickAscCreatedAt = () => {
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.createdAt < userB.createdAt
                ? -1
                : userA.createdAt > userB.createdAt
                ? 1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickDescCreatedAt = () => {
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.createdAt < userB.createdAt
                ? 1
                : userA.createdAt > userB.createdAt
                ? -1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    return (
        <Container fluid>
            <Row className="justify-content-md-center mb-4">
                <Col md="auto" style={{ width: '400px' }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            type="text"
                            placeholder="입력해주세요..."
                            onChange={handleOnChange}
                            style={{ display: 'inline' }}
                        />
                    </Form>
                    <Button
                        variant="primary"
                        onClick={handleOnClickAscUser}
                        value="이름오름차순"
                        className="me-3"
                    >
                        이름 오름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickDescUser}
                        value="이름내름차순"
                        className="me-3"
                    >
                        이름 내름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickAscCreatedAt}
                        value="포스팅 오름차순"
                        className="me-3"
                    >
                        포스팅 오름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickDescCreatedAt}
                        value="포스팅 내름차순"
                        className="me-3"
                    >
                        포스팅 내림차순
                    </Button>
                </Col>
            </Row>
            <Row xs="auto" className="jusify-content-center">
                {searchUsers?.length === 0 && inputValue === ''
                    ? users.map((user) => (
                          <UserCard key={user.id} user={user} isNetwork />
                      ))
                    : searchUsers.map((user) => (
                          <UserCard key={user.id} user={user} isNetwork />
                      ))}
            </Row>
        </Container>
    );
}

export default Network;
