import messageDef from "./messageDef.json"
export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://capstone2-json.com/message-patch.json",
    "type": "object",
    "properties": {
      ...messageDef.properties
    },
    "additionalProperties": false
  }
  