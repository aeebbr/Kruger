import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteDescription = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [note, setNote] = useState('');
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));
    }, []);

    useEffect(() => {
        Api.get(`sentNotes/${params.noteId}`).then((res) => {
            setNote(res.data);
        });

        !user &&
            Api.get(`takenNotes/${params.noteId}`).then((res) => {
                setNote(res.data);
            });
    }, [params]);

    useEffect(() => {
        const newDate = new Date(note?.createdAt);

        // date format을 'yyyy년 MM월 dd일 h:m:s'로 변경
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const time = newDate.toLocaleString().split('.')[3];

        setNewDateFormatted(`${year}년 ${month}월 ${day}일 ${time}`);
    }, [note]);

    console.log(note);

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {user?.name === note.fromUser?.name ? (
                            // 발신
                            <Col>
                                <Row>
                                    <span class="fs-2">
                                        <strong>{note.toUser?.name}</strong>
                                        <span className="text-muted">
                                            <small>에게 보낸 쪽지</small>
                                        </span>
                                    </span>
                                </Row>
                                <Row>
                                    <span className="text-muted">
                                        <small>{note.toUser?.email}</small>
                                    </span>
                                </Row>
                            </Col>
                        ) : (
                            // 수신
                            <Col>
                                <Row>
                                    <span class="fs-2">
                                        <strong>{note.fromUser?.name}</strong>
                                        <span className="text-muted">
                                            <small>가 보낸 쪽지</small>
                                        </span>
                                    </span>
                                </Row>
                                <Row>
                                    <span className="text-muted">
                                        <small>{note.fromUser?.email}</small>
                                    </span>
                                </Row>
                            </Col>
                        )}
                        <Card.Text>
                            <span className="fs-6 text-muted" >
                                {newDateFormatted}
                            </span>
                        </Card.Text>
                    </Card.Title>
                    <br />
                    <Card.Title>
                        <span class="fs-4">
                            <strong>{note.title}</strong>
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <span className="fs-5 text-muted">{note.content}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteDescription;
