/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function pushRegisterData(data) {
  return {
    type: type.APP.PUSH_DATA_REGISTER,
    data: data
  }
}
