# f1-graphql
Getting to know GraphQL through using Ergast F1 data. This simply exposes GraphQL of the API data (http://ergast.com/api/f1/2019/results.json?limit=420). To make things simpler for learning, I have dumped the F1 data in a json file and used it as a mock API using [json-server](https://github.com/typicode/json-server).

1. `npm i` -> install dependencies

1. Run the mock F1 api (data from Ergast Developer API)
- `npm run json:server` -> this will run the mock F1 API on port 3000
- local mock api at http://localhost:3000/MRData

1. Run the GraphQL server
- `npm run dev:server` -> this will run your F1 GraphQL on port 5000

1. GraphiQL Explorer available at http://localhost:5000/graphql

1. **Profit!**
