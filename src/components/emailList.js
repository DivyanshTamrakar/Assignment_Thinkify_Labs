import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmailCard from "./emailCard";
import { fetchAllEmails, updateChipSelect } from "../features/email/emailSlice";

export default function Emails() {
    const { allEmails, read, unread, favorites, chipselect } = useSelector((state) => {
        return state.emails;
    });
    const dispatch = useDispatch();
    const [filter, setfilter] = useState(null);
    let [page, setpage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllEmails({ pageNo: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getFilteredEmails = (emails) => {
        let copyemails = emails;
        if (filter != null) {
            copyemails = emails.filter((email) => {
                if (filter === "read") {
                    return read.some((id) => id === email.id);
                }
                if (filter === "unread") {
                    return unread.some((id) => id === email.id);
                }
                if (filter === "favorite") {
                    return favorites.some((id) => id === email.id);
                }
            });
        }
        return copyemails;
    };

    const fileredEmails = getFilteredEmails(allEmails);

    return (
        <div>
            <nav>
                Filter By:
                <span
                    onClick={() => {
                        setfilter("unread");
                        dispatch(updateChipSelect({ text: "unread" }));
                    }}
                    className={chipselect === "unread" ? "colorChips" : "chips"}
                >
                    Unread
                </span>
                <span
                    onClick={() => {
                        setfilter("read");
                        dispatch(updateChipSelect({ text: "read" }));
                    }}
                    className={chipselect === "read" ? "colorChips" : "chips"}
                >
                    Read
                </span>
                <span
                    className={chipselect === "favorite" ? "colorChips" : "chips"}
                    onClick={() => {
                        setfilter("favorite");
                        dispatch(updateChipSelect({ text: "favorite" }));
                    }}
                >
                    Favorites
                </span>
                <span
                    onClick={() => {
                        setfilter(null);
                        dispatch(updateChipSelect({ text: "clear" }));
                    }}
                    className={chipselect === "clear" ? "colorChips" : "chips"}
                >
                    Clear Filter
                </span>
            </nav>
            <div>
                {fileredEmails.map((item) => {
                    return (
                        <div key={item.id}>
                            <EmailCard data={item} />
                        </div>
                    );
                })}
                <button onClick={() => { setpage(page++); dispatch(fetchAllEmails({ pageNo: page })) }
                }>Load More</button>
            </div>
        </div>
    );
}
