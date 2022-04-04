export function convertToDate(dateInteger) {

    const d1 = new Date(dateInteger);
    const month = d1.getMonth();
    const year = d1.getFullYear().toString();
    const date = d1.getDate().toString();
    return `${date}/0${month + 1}/${year}`;


}
