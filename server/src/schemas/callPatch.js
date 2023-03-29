import callDef from "./callDef.json"
export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://capstone2-json.com/call-patch.json",
    "type": "object",
    "properties": {
      ...callDef.properties
    },
    "additionalProperties": false
  }
  