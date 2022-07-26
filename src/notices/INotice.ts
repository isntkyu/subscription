import { Owners } from '../owners/owners.schema';
import { Users } from '../users/users.schema';

export interface Notice {
  message?: string;
  messageText?: string;
  owner?: Owners;
  writer?: Users;
}
