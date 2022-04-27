export default interface Requester<RequestInput, RequestResponse> {
  execute(input: RequestInput): Promise<RequestResponse>;
}
