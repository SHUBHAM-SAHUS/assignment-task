import React, { useEffect, useRef, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PostCard = ({ userPostsList }) => {
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState('');
    const modalRef = useRef(null);

    const toggleModal = (post) => {
        setShowModal(!showModal);
        setPostData(post)
    };
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>


            <div className='d-flex flex-wrap gap-4 mt-5 justify-content-between align-items-center'>
                {userPostsList.map(post => (
                    <Card key={post.id} className='post-card' onClick={(post) => toggleModal(post)} >
                        {/* image  is not avliable  in this api */}
                        <Card.Img variant="top" src={`https://via.placeholder.com/100`} />
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>
                                {post.body}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            {showModal &&
                <div className="modal" >
                    <div className="modal-content" ref={modalRef}>
                        <div className='text-right' >
                            <span className="close" onClick={toggleModal}>&times;</span>
                        </div>

                        <h2>{postData.title}vgdfhfgh</h2>
                        <p>{postData.body} gdfghfghtryg rwgtr gre gtreg trgtr ghftrg hftrg hftrg hrt h htry htr hftg hry htry hft hte tr hfry htry htr ghtr hftryt hjty h</p>
                    </div>
                </div>
            }

        </>
    )
}

export default PostCard