export default interface SearchUsersRequestInput {
  email: string;
  name: string;
  limit?: number;
  offset?: number;
}
