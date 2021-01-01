import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export default class Todo {
	@Field(() => ID)
	id: string

	@Field(() => Boolean)
	completed: boolean

	@Field(() => String)
	title: string

	@Field(() => String)
	description: string
}
