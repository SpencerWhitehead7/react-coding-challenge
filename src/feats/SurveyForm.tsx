import React from "react";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { listTimeZones } from "timezone-support";

const timezones = listTimeZones();

export const SurveyForm = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log("submitted");
  };

  return (
    <Card raised>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          autoComplete="name"
          required
          variant="outlined"
          inputProps={{ "data-testid": "name" }}
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          variant="outlined"
          inputProps={{ "data-testid": "password" }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
          type="password"
          required
          variant="outlined"
          inputProps={{ "data-testid": "confirmPassword" }}
        />

        <TextField
          name="birthday"
          label="Birthday"
          type="date"
          required
          variant="outlined"
          inputProps={{ "data-testid": "birthday" }}
        />

        <TextField
          name="timezone"
          label="Timezone"
          select
          // using native select for performance reasons;
          // mui's <MenuItem /> visibly slows the dropdown
          SelectProps={{ native: true }}
          required
          variant="outlined"
          inputProps={{ "data-testid": "timezone" }}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </TextField>

        <FormControl component="fieldset">
          <FormLabel component="legend">Tech Preference</FormLabel>
          <RadioGroup aria-label="tech preference" name="techPref">
            <FormControlLabel value="both" control={<Radio />} label="both" />
            <FormControlLabel
              value="front end"
              control={<Radio />}
              label="front end"
            />
            <FormControlLabel
              value="back end"
              control={<Radio />}
              label="back end"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Pizza Toppings</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="pineapple" />}
              label="Pineapple"
            />
            <FormControlLabel
              control={<Checkbox name="anchovy" />}
              label="Anchovy"
            />
            <FormControlLabel control={<Checkbox name="mayo" />} label="Mayo" />
            <FormControlLabel
              control={<Checkbox name="onion" />}
              label="Onion"
            />
            <FormControlLabel control={<Checkbox name="corn" />} label="Corn" />
            <FormControlLabel
              control={<Checkbox name="lettuce" />}
              label="Lettuce"
            />
          </FormGroup>
        </FormControl>

        <Button type="submit" disabled={false}>
          Submit
        </Button>
      </form>
    </Card>
  );
};
