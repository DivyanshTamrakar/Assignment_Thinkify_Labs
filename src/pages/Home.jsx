import React from 'react'
import EmailBody from '../components/emailBody';
import Emails from '../components/emailList';
import { useSelector, useDispatch } from "react-redux";
function Home() {
    const obj = useSelector((state) => {
        return state.emailBody.emailData;
    });

    return (

        <div className='HomeLayout'>
            <section><Emails /></section>
            {Object.keys(obj).length !== 0 && <section><EmailBody /></section>}
        </div>
    )
}

export default Home;