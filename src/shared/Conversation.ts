import { Entity, Fields } from 'remult';

@Entity('conversations', {
	allowApiCrud: true
})
export class Conversation {
	@Fields.uuid()
	id!: string;

	@Fields.string({ allowNull: true })
	name?: string;

	@Fields.boolean()
	isGroupChat: boolean = false;

	@Fields.createdAt()
	createdAt!: Date;

	@Fields.updatedAt()
	updatedAt!: Date;
}
