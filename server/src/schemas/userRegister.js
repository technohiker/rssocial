import userDef from "./userDef.json";

export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://capstone2-json.com/user-register.json",
  type: "object",
  properties: {
    ...userDef.properties,
  },
  additionalProperties: false,
  required: ["username", "password", "email"],
};
