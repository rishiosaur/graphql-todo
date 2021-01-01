import { Arg, Mutation, Query, Resolver, InputType, Field } from 'type-graphql'
import { ITodo } from '../models/Todo'
import Todo from '../models/Todo'
import { v4 as uuid } from 'uuid'
import { Resolver } from 'dns'

const data: Record<string, Omit<ITodo, 'id'>> = {
	'2815a531-66c7-4274-ac83-c6b45abe8885': {
		completed: true,
		title: 'culpa assumenda voluptas',
		description: 'Velit culpa quasi temporibus rerum.',
	},
	'd89101c1-9bc6-43ff-a1bf-b4bf7d018a5c': {
		completed: false,
		title:
			'Facilis quis optio recusandae laboriosam architecto aut iusto debitis eaque. Consectetur ducimus aut asperiores tempora aut ea.',
		description:
			'Dolore eaque quos dolorem in.\nPlaceat consectetur quo distinctio.',
	},
	'09f4332a-f037-4504-94b9-053b5f5da42b': {
		completed: true,
		title: 'voluptas architecto et',
		description: 'rerum',
	},
}

@Resolver()
export class TodoQueryResolver {
	@Query(() => [Todo])
	public todos(): Todo[] {
		return Object.entries(data).map(
			([key, value]) =>
				new Todo({
					id: key,
					...value,
				})
		)
	}

	@Query(() => Todo)
	public todo(@Arg('id') id: string) {
		const todo = data[id]

		if (todo) {
			return new Todo({
				id,
				...todo,
			})
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
		const finalTodo: Omit<ITodo, 'id'> = {
			...todo,
		}

		const id = uuid()

		data[id] = finalTodo

		return new Todo({
			...finalTodo,
			id,
		})
	}
}

@InputType()
class UpdateTodoOptions implements Partial<Omit<ITodo, 'id'>> {
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
		const searchedTodo = data[id]

		if (searchedTodo) {
			Object.assign(searchedTodo, _data)

			data[id] = searchedTodo

			return new Todo({
				...searchedTodo,
				id,
			})
		}

		throw new Error(`Could not find Todo with ID ${id}`)
	}

	@Mutation(() => Todo)
	public toggleTodo(@Arg('id') id: string) {}
}
