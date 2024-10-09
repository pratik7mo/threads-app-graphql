import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function init(){
const app =express()
const PORT =Number(process.env.PORT) || 8000 

app.use(express.json())

//Create graphql server.
const gqlServer=new ApolloServer({
    typeDefs:`
    type Query{
       hello:String
       say(name:String):String
    }
    `,   //in type layer i are giving sh\chema as a string.
    resolvers:{
        Query:{
            hello:()=>`Hey there,I am graphql Server`,
            say:(_,{name}:{name:String})=>`Hey ${name}, HOw are you?`
        }
    }    // actuall function or resolver
})

//start the gql server but dont use await in global level so we can use function
await gqlServer.start()


/* process.env.PORT is typically an environment variable that 
specifies the port number where the application should run.
This is useful in production environments 
(e.g., when deploying to cloud services like Heroku, AWS, or others), 
where the hosting service may dynamically assign a port for your application.*/
app.get("/",(req,res)=>{
    res.json({message: "Server is up and running"});
});

app.use('/graphql',expressMiddleware(gqlServer));

app.listen(PORT,()=> console.log(`Server started at PORT: ${PORT}`))

}
init()