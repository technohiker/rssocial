import userDef from "./userDef";

export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://capstone2-json.com/register-user.json",
  type: "object",
  properties: {
    ...userDef.properties,
  },
  additionalProperties: false,
  required: ["username", "password", "email"],
};
