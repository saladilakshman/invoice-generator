const Notes = ({ notesactions: { feedback, dispatch } }) => {
  return (
    <div>
      <h1 className="text-base lg:text-lg font-semibold pb-3">Notes :</h1>
      <textarea
        className="bg-gray-100 w-full focus:outline-none p-1 placeholder:pb-3"
        placeholder="Thank you for your business."
        value={feedback}
        onChange={(e) =>
          dispatch({ type: "feedback-notes", payload: e.target.value })
        }
      />
    </div>
  );
};

export default Notes;
