import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate();
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab cheese from props
  const cheese = props.cheese;
  // create state for form
  const [editForm, setEditForm] = useState({});
  // useEffect to set state to the existing queso, when the data is available
  useEffect(() => {
    if (props.cheese) {
      const queso = cheese.find((c) => c._id === id);
      setEditForm(queso);
    }
  }, [props.cheese]);

  if (props.cheese) {
    // grab the target queso from the cheese array
    const queso = cheese.find((c) => c._id === id);

    // handleChange function for form
    const handleChange = (event) => {
      // create a copy of the state
      const newState = { ...editForm };
      // update the newState
      newState[event.target.name] = event.target.value;
      // update the state
      setEditForm(newState);
    };

    // handleSubmit for form
    const handleSubmit = (event) => {
      // prevent the refresh
      event.preventDefault();
      // pass the form data to updateCheese
      props.updateCheese(editForm, queso._id);
      // redirect cheese back to index
      navigate("/");
    };

    const removeQueso = () => {
      props.deleteCheese(queso._id);
      navigate("/");
    };

    const form = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="NAME"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country Of Origin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese" />
      </form>
    );

    return (
      <div className="queso-show">
        <h1 className="h1-show">{queso.name}</h1>
        <h2 className="h2-show">{queso.countryOfOrigin}</h2>
        <img src={queso.image} alt={queso.name} />
        {form}
        <button onClick={removeQueso} className="delete">DELETE CHEESE</button>
      </div>
    );
  } else {
    return <h1>No Cheese</h1>;
  }
};

export default Show;
