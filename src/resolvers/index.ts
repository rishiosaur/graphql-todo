import { Query, Resolver } from 'type-graphql'
import { ITodo } from '../models/Todo'
import Todo from '../models/Todo'
const data: ITodo[] = []

@Resolver()
export default class TodoQueryResolver {
	@Query(() => [Todo])
	public todos() {
		return data.map((todo) => new Todo(todo))
	}
}
