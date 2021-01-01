import { Arg, Mutation, Query, Resolver, InputType, Field } from 'type-graphql'
import { ITodo } from '../models/Todo'
import Todo from '../models/Todo'
import { v4 as uuid } from 'uuid'
import { Resolver } from 'dns'

const data: Record<string, Omit<ITodo, 'id'>>

@Resolver()
export class TodoQueryResolver {
	@Query(() => [Todo])
	public todos() {
		return data.map((todo) => new Todo(todo))
	}

	@Query(() => Todo)
	public todo(@Arg('id') id: string) {
		const todo = data.filter((todo) => todo.id === id)[0]

		if (todo) {
			return new Todo(todo)
		} else {
			throw new Error(`Could not find Todo with ID ${id}`)
		}
	}
}

@InputType()
class CreateTodoOptions implements Partial<ITodo> {
	@Field()
	title: string

	@Field()
	description: string

	@Field({ nullable: true, defaultValue: false })
	completed: boolean
}

@Resolver()
export class TodoCreateResolver {
	@Mutation(() => Todo)
	public createTodo(@Arg('todo') todo: CreateTodoOptions) {
		const finalTodo: ITodo = {
			...todo,
			id: uuid(),
		}

		data.push(finalTodo)

		return new Todo(finalTodo)
	}
}

@InputType()
class UpdateTodoOptios implements Partial<Omit<ITodo, 'id'>> {
	@Field({ nullable: true })
	title?: string

	@Field({ nullable: true })
	description?: string

	@Field({ nullable: true })
	completed?: boolean
}

@Resolver()
export class TodoUpdateResolver {
	@Mutation(() => Todo)
	public updateTodo(
		@Arg('id') id: string,
		@Arg('data') _data: UpdateTodoOptions
	) {
		const searchedTodo = data.filter((todo) => todo.id === id)

		if (searchedTodo) {
			Object.assign(searchedTodo, _data)
		}

		throw new Error(`Could not find Todo with ID ${id}`)
	}

	@Mutation(() => Todo)
	public toggleTodo(@Arg('id') id: string) {}
}
