import folderDef from "./folderDef.json"
export default {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://capstone2-json.com/folder-new.json",
    "type": "object",
    "properties": {
      ...folderDef.properties
    },
    "additionalProperties": false,
    "required": ["userID","folderName"]
  }
  