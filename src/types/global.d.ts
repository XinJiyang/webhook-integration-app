/* eslint-disable no-var */
export { };

declare global {
  var messagesStore: Record<
    string,
    { name: string; message: string; timestamp: number }[]
  >;
}
