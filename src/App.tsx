import { Container } from "@material-ui/core";

import { SurveyForm } from "./feats";

export const App = () => (
  <Container maxWidth={"sm"}>
    <h1>React Coding Challenge</h1>
    <SurveyForm />
  </Container>
);
