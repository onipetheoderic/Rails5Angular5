# firstly we test it with the Json Api
>>> json-server --watch db.json
>>>>http://localhost:3000/movies we go to this link to view the movies

## lets Create the Model folder and file
## lets now create the movies component
ng g c movies

## lets now create service
ng g s movie --module=app.module 
>>this will automatically create the servie for you and add it to the app.module.ts file