import { Entity, Fields, Validators } from 'remult';

@Entity('users', {
	allowApiCrud: true
})
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string({
		validate: Validators.required
	})
	username!: string;

	@Fields.string({
		validate: [Validators.required, Validators.unique]
	})
	email!: string;

	@Fields.string({
		validate: Validators.required,
		inputType: 'password'
	})
	password!: string;

	@Fields.string({ allowNull: true })
	avatarUrl?: string;

	@Fields.createdAt()
	createdAt!: Date;
}
