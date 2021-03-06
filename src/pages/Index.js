import { useState } from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
  // state to hold form data
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    countryOfOrigin: "",
  });
  //handleChange function to sync input with state
  const handleChange = (event) => {
    // make a copy of state
    const newState = { ...newForm };
    // update the newState
    newState[event.target.name] = event.target.value;
    // update the state
    setNewForm(newState);
  };
  // handleSubmit function for when form is submitted
  const handleSubmit = (event) => {
    // prevent the page from refreshing
    event.preventDefault();
    // pass the form data to createChesse function
    props.createCheese(newForm);
    // reset the form to empty
    setNewForm({
      name: "",
      image: "",
      countryOfOrigin: "",
    });
  };
  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newForm.name}
        name="name"
        placeholder="NAME"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.image}
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.countryOfOrigin}
        name="countryOfOrigin"
        placeholder="Country of Origin"
        onChange={handleChange}
      />
      <input type="submit" value="Create CHEESE" />
    </form>
  );

  if (props.cheese) {
    return (
      <section>
        {form}
        {props.cheese.map((queso) => {
          return (
            <div key={queso._id} className="queso">
              <Link to={`/cheese/${queso._id}`}>
                <h1 className="queso-name">{queso.name}</h1>
              </Link>
              <img src={queso.image} alt={queso.name} />
              <h3 className="queso-origin">{queso.countryOfOrigin}</h3>
            </div>
          );
        })}
      </section>
    );
  } else {
    return (
      <section>
        {form}
        <h1>Loading...</h1>
      </section>
    );
  }
};

export default Index;
