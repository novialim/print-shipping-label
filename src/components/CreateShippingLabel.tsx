import { useReducer, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

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

  const createLabel = async () => {
    let data = { formInput };
    console.log("data formInput", data);

    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("/create_label", settings);
      const data = await response.json();
      setShippingLabel(data.postage_label.label_url);
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    createLabel();
    evt.preventDefault();
    setFormInput(initialParameters);
  };

  const handleInput = (evt: { target: { name: any; value: any } }) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  console.log("state value: ", shippingLabel);

  return (
    <Paper elevation={3}>
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
          />
        </div>
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
          />
          <TextField
            required
            id="recipentLastName"
            label="Last Name"
            name="recipentLastName"
            onChange={handleInput}
            margin="normal"
            value={formInput.recipentLastName}
          />
        </div>
        <div>
          <TextField
            required
            id="address1"
            label="Shipping Address 1"
            name="address1"
            onChange={handleInput}
            margin="normal"
            value={formInput.address1}
          />
          <TextField
            required
            id="address2"
            label="Shipping Address 2"
            name="address2"
            onChange={handleInput}
            margin="normal"
            value={formInput.address2}
          />
          <TextField
            required
            id="city"
            label="Shipping City"
            name="city"
            onChange={handleInput}
            margin="normal"
            value={formInput.city}
          />
          <TextField
            required
            id="state"
            label="Shipping State"
            name="state"
            onChange={handleInput}
            margin="normal"
            value={formInput.state}
          />
          <TextField
            required
            id="postalCode"
            label="Shipping Postal Code"
            name="postalCode"
            onChange={handleInput}
            margin="normal"
            value={formInput.postalCode}
          />
          <TextField
            required
            id="country"
            label="Shipping Country"
            name="country"
            onChange={handleInput}
            margin="normal"
            value={formInput.country}
          />
        </div>
        <div>
          <TextField
            required
            id="weight"
            label="Weight"
            name="weight"
            onChange={handleInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">lb</InputAdornment>,
            }}
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
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
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
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
            margin="normal"
            value={formInput.width}
          />
          <TextField
            required
            id="height"
            label="Height"
            name="height"
            onChange={handleInput}
            InputProps={{
              endAdornment: <InputAdornment position="end">in</InputAdornment>,
            }}
            margin="normal"
            value={formInput.height}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
}
