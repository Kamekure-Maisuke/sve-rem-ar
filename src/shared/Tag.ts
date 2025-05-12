import { Entity, Fields, Validators } from 'remult';

@Entity('tags', {
	allowApiCrud: true
})
export class Tag {
	@Fields.cuid()
	id!: string;

	@Fields.string({
		validate: [Validators.required, Validators.unique]
	})
	name!: string;

	@Fields.createdAt()
	createdAt!: Date;
}
