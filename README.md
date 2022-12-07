

to install the app 
    npm install 

You need to have mysql server running.

Please create a database and import gutendex.sql from database direction.

change the connection in database/db.js file.

run the app  by 
    npm start


run the url in the browser.
    http://localhost:3400/fetchBooks?topic=Civil rights,politics&language=en,zh,fr&mime_type=text/plain&author=Jefferson,United.

It can search on following parameters

book_id: number;

language: string  language=en,fr

mime_type = string ex. mime_type=text/plain

topic = string ex. topic=abc or topic=bac,sxx

author = string ex. topic=john or topic=john,james

title = string ex. title=title1 or topic=title1,title2



Thanks
