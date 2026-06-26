import moment from "moment";

export const calculateDaysSinceAdded = (bookAddedDate: moment.MomentInput) => {
    if (!bookAddedDate) return "Unknown date"; // Handle missing dates
    const addedDate = moment(bookAddedDate);
    if (!addedDate.isValid()) return "Invalid date"; // Handle invalid dates
    const today = moment();
    const daysPassed = today.diff(addedDate, "days");
    return daysPassed > 0 ? `${daysPassed} days ago` : "Today";
  };