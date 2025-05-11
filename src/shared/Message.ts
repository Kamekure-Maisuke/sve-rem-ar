import { Entity, Fields, Validators } from 'remult';

@Entity('messages', {
	allowApiCrud: true
})
export class Message {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	conversationId!: string;

	@Fields.string()
	senderId!: string;

	@Fields.string({
		validate: Validators.required
	})
	content!: string;

	@Fields.boolean()
	isRead: boolean = false;

	@Fields.createdAt()
	sentAt!: Date;
}
