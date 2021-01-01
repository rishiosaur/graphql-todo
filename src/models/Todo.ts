import { Field, ObjectType, ID } from 'type-graphql'

export interface ITodo {
	id: string
	completed: boolean
	title: string
	description: string
}

@ObjectType()
export default class Todo implements ITodo {
	constructor(todo: ITodo) {
		Object.assign(this, todo)
	}

	@Field(() => ID)
	id: string

	@Field(() => Boolean)
	completed: boolean

	@Field(() => String)
	title: string

	@Field(() => String)
	description: string
}
