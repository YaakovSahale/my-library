import { useState } from "react";
import Star from "./Star";

function StarRating({ onChange, ratedBook ,initialStars}) {
  const [rating, setRating] = useState(initialStars);

  const changeRating = (newRating) => {
    setRating(newRating);
    // onChange?.(newRating);

    const tempCompletedList = JSON.parse(localStorage.getItem("completedList"));

    tempCompletedList.find((book) => {
      if (book.id === ratedBook.id) book.userGrade = newRating;
    });
    localStorage.setItem("completedList", JSON.stringify(tempCompletedList));
  };
  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </span>
  );
}
export default StarRating;
