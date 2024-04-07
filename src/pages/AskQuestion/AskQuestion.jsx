import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [userPlan, setUserPlan] = useState("FREE");
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPlan === "FREE" && questionsAsked >= 1) {
      disableReviewButton();
      return;
    } else if (userPlan === "SILVER" && questionsAsked >= 5) {
      disableReviewButton();
      return;
    }

    enableReviewButton();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User?.result.name,
          userId: User?.result?._id,
        },
        navigate
      )
    );
    setQuestionsAsked(questionsAsked + 1);
  };

  const disableReviewButton = () => {
    const reviewButton = document.querySelector(".review-btn");
    if (reviewButton) {
      reviewButton.disabled = true;
    }
  };

  const enableReviewButton = () => {
    const reviewButton = document.querySelector(".review-btn");
    if (reviewButton) {
      reviewButton.disabled = false;
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  const paymentHandler = async (plan) => {
    try {
      const response = await fetch("https://stackoverflow-backendagain.onrender.com//order", {
        method: "POST",
        body: JSON.stringify({
          plan,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { order, plan: selectedPlan } = await response.json();

      if (!order) {
        return;
      }

      const options = {
        key: "rzp_test_l91rPfWBI1M6XV",
        amount: order.amount,
        currency: order.currency,
        name: "StackOverflow Clone",
        description: `Subscribe to ${selectedPlan} Plan`,
        order_id: order.id,
        handler: async (response) => {
          const body = {
            ...response,
          };

          const validateRes = await fetch(
            "https://stackoverflow-backendagain.onrender.com/order/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const jsonRes = await validateRes.json();
          console.log(jsonRes);

          if (jsonRes.msg === "success") {
            const res = await fetch(
              "https://stackoverflow-backendagain.onrender.com/user/updatePlan",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: User?.result?._id, plan }),
              }
            );

            if (res.ok) {
              setUserPlan(plan);
              setQuestionsAsked(0);
            } else {
              console.error("Failed to update the plan");
            }
          } else {
            console.error("Payment validation failed");
          }
        },
        prefill: {
          name: User?.result.name,
          email: User?.result.email,
          contact: "9000090000",
        },
        notes: {
          address: "StackOverflow Clone",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <h1>{questionBody}</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function the index of an element in a vector?"
              />
            </label>

            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>

            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
        <div>
          <button onClick={() => paymentHandler("FREE")}>
            Free Plan (₹0/1 question per day)
          </button>
          <button onClick={() => paymentHandler("SILVER")}>
            {" "}
            Silver Plan (₹100/month, 5 questions per day)
          </button>
          <button onClick={() => paymentHandler("GOLD")}>
            Gold Plan (₹1000/month, unlimited questions)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
