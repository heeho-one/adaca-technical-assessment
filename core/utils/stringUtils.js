function addTimeStamp(text) {
    let date = new Date();
    let timeStamp = date.toISOString();

    return `${text} - ${timeStamp}`;
}

module.exports = { addTimeStamp }