import CreateUserAccountGateway from '@core/domain/use-case/account/gateway/create_user_account.gateway'
import UpdateUserAccountGateway from '@core/domain/use-case/account/gateway/update_user_account.gateway'
import QueryUserAccountGateway from '@core/domain/use-case/account/gateway/query_user_account.gateway'
import DeleteUserAccountGateway from '@core/domain/use-case/account/gateway/delete_user_account.gateway'
import SearchUsersGateway from '@core/domain/use-case/search/gateway/search_users.gateway'

export default interface UserRepository
  extends CreateUserAccountGateway, UpdateUserAccountGateway, QueryUserAccountGateway, DeleteUserAccountGateway,
    SearchUsersGateway {}
