import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { formatISO } from "date-fns";
import { listTimeZones } from "timezone-support";

import { Form } from "../comps";

const timezones = listTimeZones();

export const SurveyForm = () => {
  const [formValues, setFormValues] = React.useState<{
    name: string;
    password: string;
    confirmPassword: string;
    birthday: string; // ISO Format
    techPref: "front end" | "back end" | "both";
    pizzaToppings: { [key: string]: boolean };
    timezone: string;
  }>({
    name: "",
    password: "",
    confirmPassword: "",
    birthday: formatISO(new Date(), { representation: "date" }),
    techPref: "both",
    pizzaToppings: {
      pineapple: false,
      anchovy: false,
      mayo: false,
      onion: false,
      corn: false,
      lettuce: false,
    },
    timezone: timezones[0],
  });

  const validatePasswordsMatch = () =>
    formValues.password === formValues.confirmPassword;
  const getPasswordsMatchError = () =>
    validatePasswordsMatch() ? "" : "Passwords must match";
  // add && otherValidation if more are added
  const validateAll = () =>
    formValues.name.length > 0 &&
    formValues.password.length > 0 &&
    validatePasswordsMatch();

  const handleInput = (
    evt: React.ChangeEvent<
      | HTMLTextAreaElement
      | HTMLInputElement
      | { name?: string | undefined; value: unknown }
    >
  ) => {
    setFormValues({
      ...formValues,
      [evt.target.name as string]: evt.target.value,
    });
  };

  const handleCheck = (evt: React.ChangeEvent<{}>, checked: boolean) => {
    const target = evt.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      pizzaToppings: {
        ...formValues.pizzaToppings,
        [target.name]: checked,
      },
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) =>
    // in a real app, I'd dispatch an action, call window.fetch, use a GQL mutation, etc
    new Promise((res, rej) => {
      setTimeout(() => {
        console.log({
          name: formValues.name,
          password: formValues.password,
          birthday: formValues.birthday,
          preferences: {
            techPref: formValues.techPref,
            pizzaToppings: Object.entries(formValues.pizzaToppings)
              .filter(([key, val]) => Boolean(val))
              .map(([key, val]) => key),
            timezone: formValues.timezone,
          },
        });
        res(null);
      }, 1000);
    });

  return (
    <Card raised>
      <CardHeader title={"Survey Form"} />
      <CardContent>
        <Form onSubmit={handleSubmit} isSubmitDisabled={!validateAll()}>
          <TextField
            name="name"
            label="Name"
            autoComplete="name"
            required
            fullWidth
            variant="outlined"
            margin="normal"
            value={formValues.name}
            onChange={handleInput}
            inputProps={{ "data-testid": "name" }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            margin="normal"
            value={formValues.password}
            onChange={handleInput}
            inputProps={{ "data-testid": "password" }}
          />

          <TextField
            name="confirmPassword"
            label="Confirm Password"
            autoComplete="new-password"
            type="password"
            required
            fullWidth
            variant="outlined"
            margin="normal"
            value={formValues.confirmPassword}
            onChange={handleInput}
            error={!validatePasswordsMatch()}
            helperText={getPasswordsMatchError()}
            inputProps={{ "data-testid": "confirmPassword" }}
          />

          <TextField
            name="birthday"
            label="Birthday"
            type="date"
            required
            fullWidth
            variant="outlined"
            margin="normal"
            value={formValues.birthday}
            onChange={handleInput}
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
            fullWidth
            variant="outlined"
            margin="normal"
            value={formValues.timezone}
            onChange={handleInput}
            inputProps={{ "data-testid": "timezone" }}
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </TextField>

          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Tech Preference</FormLabel>
            <RadioGroup
              aria-label="tech preference"
              name="techPref"
              row
              value={formValues.techPref}
              onChange={handleInput}
            >
              <Grid container>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="both"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="front end"
                    control={<Radio />}
                    label="front end"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="back end"
                    control={<Radio />}
                    label="back end"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Pizza Toppings</FormLabel>
            <FormGroup>
              <Grid container>
                {Object.entries(formValues.pizzaToppings).map(
                  ([name, isChecked]) => (
                    <Grid key={name} item sm={4} xs={6}>
                      <FormControlLabel
                        control={<Checkbox name={name} />}
                        label={name}
                        checked={isChecked}
                        onChange={handleCheck}
                      />
                    </Grid>
                  )
                )}
              </Grid>
            </FormGroup>
            <FormHelperText>Inquiring minds want to know!</FormHelperText>
          </FormControl>
        </Form>
      </CardContent>
    </Card>
  );
};
