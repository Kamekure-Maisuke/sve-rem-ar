import { Entity, Fields } from 'remult';

@Entity('conversation_members', {
	allowApiCrud: true
})
export class ConversationMember {
	@Fields.uuid()
	id!: string;

	@Fields.string()
	userId!: string;

	@Fields.string()
	conversationId!: string;

	@Fields.boolean()
	isAdmin: boolean = false;

	@Fields.createdAt()
	joinedAt!: Date;
}
