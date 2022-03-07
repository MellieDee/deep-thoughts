import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";

const ReactionForm = ({ thoughtId }) => {
  const [reactionText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);


  const [addReaction, { error }] = useMutation(ADD_REACTION);

  //  --------------- UPDATE STATE Starts ----------------------//
  // based on Input Form changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  //  --------------- UPDATE STATE Ends ----------------------//


  // ------------- SUBMIT THOUGHT Handling Starts ------------- //
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionText, thoughtId },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };
  // ---------- SUBMIT THOUGHT Handling Ends ----------- //


  return (
    <diiv>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>

      <form
        className="flex-row justify center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={reactionText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" typle="submit">Submit
        </button>
      </form>
    </diiv>
  );
};

export default ReactionForm;