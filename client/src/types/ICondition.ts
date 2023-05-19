import { IUserMessage } from "./IMessage";

export interface ICondition {
  condition: keyof IUserMessage //Filter an array by what criteria?
  value: string | number; //What value to filter by?
}