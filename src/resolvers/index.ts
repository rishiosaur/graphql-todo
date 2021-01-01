import { Arg, Query, Resolver } from 'type-graphql'
import { ITodo } from '../models/Todo'
import Todo from '../models/Todo'
const data: ITodo[] = []

@Resolver()
export default class TodoQueryResolver {
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
