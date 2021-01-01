import { Field, ObjectType } from 'type-graphql'

export default class Todo {
	id: string

	completed: boolean

	title: string

	description: string
}
