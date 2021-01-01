import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { ITodo } from '../models/Todo'
import Todo from '../models/Todo'

const data: ITodo[] = [
	{
		id: '2815a531-66c7-4274-ac83-c6b45abe8885',
		completed: true,
		title: 'culpa assumenda voluptas',
		description: 'Velit culpa quasi temporibus rerum.',
	},
	{
		id: 'd89101c1-9bc6-43ff-a1bf-b4bf7d018a5c',
		completed: false,
		title:
			'Facilis quis optio recusandae laboriosam architecto aut iusto debitis eaque. Consectetur ducimus aut asperiores tempora aut ea.',
		description:
			'Dolore eaque quos dolorem in.\nPlaceat consectetur quo distinctio.',
	},
	{
		id: '09f4332a-f037-4504-94b9-053b5f5da42b',
		completed: true,
		title: 'voluptas architecto et',
		description: 'rerum',
	},
]

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

@Resolver()
export class TodoCreateResolver {
	@Mutation(() => Todo)
	public createTodo(@Arg('todo') todo: CreateTodoOptions) {}
}
