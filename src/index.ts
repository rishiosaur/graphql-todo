import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { TodoQueryResolver, TodoCreateResolver } from './resolvers/index'

async function main() {
	// Compiled schema definition from TypeGraphQL
	const schema = await buildSchema({
		resolvers: [TodoQueryResolver, TodoCreateResolver], // TODO: remove this, add in real resolvers
		validate: false,
	})

	// Apollo handles all of our HTTP for us; takes in bundled schema & resolvers.
	const server = new ApolloServer({
		schema: schema,
		introspection: true,
		playground: true,
		context: ({ req }) => req,
	})
	await server.listen(process.env.PORT || 3000)
	console.log('✅ Todo server has started!')
}

main()
