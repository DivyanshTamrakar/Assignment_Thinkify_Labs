import React from 'react'
import '../styles/emailBody.css'
import { useSelector, useDispatch } from "react-redux";
import { updateFavorite } from '../features/email/emailSlice';
import logo from '../utils/F.png'
function EmailBody() {
  const emailBody = useSelector((state) => {
    return state.emailBody.emailData;
  });
  const { favorites } = useSelector((state) => {
    return state.emails;
  });

  const dispatch = useDispatch();


  return (
    <div className='bodyCard'>
      <img className="avatar" src={logo} alt="text" />
      <div className="Content">
        <section className='subject'>
          <section className='title'>Lorem Ipsum</section>
          {
            favorites.includes(emailBody.id)
              ? <section className='Colredfavorite' onClick={() => {
                dispatch(updateFavorite({ id: emailBody.id }))
              }}>Unmark as favorite</section>
              : <section className='favoriteBtn' onClick={() => {
                dispatch(updateFavorite({ id: emailBody.id }))
              }}>Mark as favorite</section>

          }
        </section>
        <section>26/02/2020 10:30</section>
        <section dangerouslySetInnerHTML={{ __html: emailBody.body }}></section>
      </div>
    </div>
  )
}

export default EmailBody