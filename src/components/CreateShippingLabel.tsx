import { useReducer, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

export type Parameters = {
  senderName: string;
  fromAddress: string;
  recipentFirstName: string;
  recipentLastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  weight: string;
  length: string;
  width: string;
  height: string;
};

const initialParameters: Parameters = {
  senderName: "",
  fromAddress: "",
  recipentFirstName: "",
  recipentLastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  weight: "",
  length: "",
  width: "",
  height: "",
};

export default function Index() {
  const textInput = useRef(null);
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    initialParameters
  );

  const [shippingLabel, setShippingLabel] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createLabel = async () => {
    let data = { formInput };

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://print-shipping-label-server.herokuapp.com/create_label",
        // "http://localhost:1337/create_label",
        settings
      );

      const data = await response.json();

      setIsLoading(false);
      setShippingLabel(data.postage_label.label_url);
      setFormInput(initialParameters);
      setError("");
    } catch (err) {
      console.log("Error: ", err);
      setIsLoading(false);
      setError(
        "Error creating label, please double check your input and try again."
      );
    }
  };

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    setIsLoading(true);
    createLabel();
    evt.preventDefault();
  };

  const handleInput = (evt: { target: { name: any; value: any } }) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  return (
    <div style={{ display: "flex", height: "90vh", width: "90vw" }}>
      <Paper elevation={3} style={{ width: "50%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "1rem",
          }}
        >
          <div>
            <TextField
              required
              id="senderName"
              label="Sender Contact Name"
              name="senderName"
              onChange={handleInput}
              margin="normal"
              inputRef={textInput}
              value={formInput.senderName}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="fromAddress"
              label="From Address"
              name="fromAddress"
              onChange={handleInput}
              margin="normal"
              inputRef={textInput}
              value={formInput.fromAddress}
              sx={{ m: 1 }}
            />
          </div>
          <h4>Who are you sending to?</h4>
          <div>
            <TextField
              required
              id="recipentFirstName"
              label="First Name"
              name="recipentFirstName"
              onChange={handleInput}
              margin="normal"
              inputRef={textInput}
              value={formInput.recipentFirstName}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="recipentLastName"
              label="Last Name"
              name="recipentLastName"
              onChange={handleInput}
              margin="normal"
              value={formInput.recipentLastName}
              sx={{ m: 1 }}
            />
          </div>
          <div>
            <TextField
              required
              id="address1"
              label="Address 1"
              name="address1"
              onChange={handleInput}
              margin="normal"
              value={formInput.address1}
              sx={{ m: 1, width: "25ch" }}
            />
            <TextField
              required
              id="address2"
              label="Address 2"
              name="address2"
              onChange={handleInput}
              margin="normal"
              value={formInput.address2}
              sx={{ m: 1, width: "25ch" }}
            />
            <br />
            <TextField
              required
              id="city"
              label="City"
              name="city"
              onChange={handleInput}
              margin="normal"
              value={formInput.city}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="state"
              label="State"
              name="state"
              onChange={handleInput}
              margin="normal"
              value={formInput.state}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              onChange={handleInput}
              margin="normal"
              value={formInput.postalCode}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="country"
              label="Country"
              name="country"
              onChange={handleInput}
              margin="normal"
              value={formInput.country}
              sx={{ m: 1 }}
            />
          </div>
          <h4>What size is your parcel?</h4>
          <div>
            <TextField
              required
              id="weight"
              label="Weight"
              name="weight"
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lb</InputAdornment>
                ),
              }}
              sx={{ m: 1 }}
              margin="normal"
              value={formInput.weight}
            />
            <TextField
              required
              id="length"
              label="Length"
              name="length"
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
              sx={{ m: 1 }}
              margin="normal"
              value={formInput.length}
            />
            <TextField
              required
              id="width"
              label="Width"
              name="width"
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
              margin="normal"
              value={formInput.width}
              sx={{ m: 1 }}
            />
            <TextField
              required
              id="height"
              label="Height"
              name="height"
              onChange={handleInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">in</InputAdornment>
                ),
              }}
              sx={{ m: 1 }}
              margin="normal"
              value={formInput.height}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Paper>
      <Paper elevation={3} style={{ width: "50%", marginLeft: 10 }}>
        {isLoading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {shippingLabel && (
          <img
            style={{ width: "100%", height: "100%" }}
            src={shippingLabel}
            alt="shipping label"
          />
        )}
      </Paper>
    </div>
  );
}
