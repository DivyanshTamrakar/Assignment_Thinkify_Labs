import React from "react";
import '../styles/emailCard.css';
import { convertToDate } from "../utils/integertoDate";
import { fetchEmailBody } from "../features/emailBody/emailBodySlice";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedEmail, updateReadStatus } from "../features/email/emailSlice";

function EmailCard({ data }) {
    const { selectedEmail, favorites } = useSelector((state) => {
        return state.emails;
    });



    const dispatch = useDispatch();

    return <div onClick={() => {
        dispatch(fetchEmailBody(data.id))
        dispatch(updateSelectedEmail({ id: data.id }))
        dispatch(updateReadStatus({ id: data.id }))
    }} className={selectedEmail === data.id ? "ColoredCard" : "Card"}>
        <div className="list-avatar"><b>F</b></div>
        {/* <img className="list-avatar" height='50px' width='50px' src="./utils/F.png" alt="text" /> */}
        <div className="Details">
            <section>From : <b>{data.from.name} &#60;{data.from.email}&#62;</b></section>
            <section>Subject : <b>{data.subject}</b></section>
            <section>{data.short_description}</section>
            <section className="cardfooter"><span>{convertToDate(data.date)}</span>
                {favorites.includes(data.id) && <b>Favorite</b>}
            </section>
        </div>
    </div>;
}

export default EmailCard;
