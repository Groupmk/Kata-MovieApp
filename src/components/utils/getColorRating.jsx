export const getColorForRating = (rating) => {
    if (rating >= 8) {
        return "#E9D100";
    } else if (rating >= 5) {
        return "#E97E00";
    } else {
        return "#E90000";
    }
};