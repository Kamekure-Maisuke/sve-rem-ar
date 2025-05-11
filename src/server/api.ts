import { remultApi } from 'remult/remult-sveltekit';
import { User } from '../shared/User';
import { Message } from '../shared/Message';
import { Conversation } from '../shared/Conversation';
import { ConversationMember } from '../shared/ConversationMember';

export const api = remultApi({
	entities: [User, Message, Conversation, ConversationMember],
	admin: true
});
