import bookmarkDef from "./bookmarkDef.json";
export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://capstone2-json.com/bookmark-new.json",
  type: "object",
  properties: {
    ...bookmarkDef.properties,
  },
  additionalProperties: false,
  required: ["base_url"],
};
