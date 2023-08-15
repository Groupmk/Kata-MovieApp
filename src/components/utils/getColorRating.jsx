export const getColorForRating = (rating) => {
    if (rating >= 7) {
        return "#66E900";
    } else if (rating >= 5 && rating <= 7) {
        return "#E9D100";
    }else if(rating >= 3 && rating <= 5) {
        return "#E97E00";
    }else if(rating > 3){
        return "#E90000";
    }
};