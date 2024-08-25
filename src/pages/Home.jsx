import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    const handleUserChoice = (isIndigene) => {
        if (isIndigene) {
            navigate("/indigenes");
        } else {
            navigate("/nonindigenes");
        }
    };

    return (
        <>
            <div>
                <h1>Are you an indigene of Anambra state?</h1>
                <button onClick={() => handleUserChoice(true)}>Yes</button>
                <button onClick={() => handleUserChoice(false)}>No</button>
            </div>
        </>
    )
}

export default Home