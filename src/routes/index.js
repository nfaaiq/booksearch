let getConnection = require('../database/db');

const routes = require('express').Router();

let { RECORD_LIMIT } =  require('../constants');


routes.get('/fetchBooks', async (req, res) => {  
    
    const query = req.query;

    let page = (query.page) ? query.page : 1;

    const start = (RECORD_LIMIT * page) - RECORD_LIMIT;

    let book_id = query?.book_id;
    
    let language = query?.language;

    let mime_type = query?.mime_type;

    let topic = query?.topic;

    let author = query?.author;

    let title = query?.title;

    
    let book_table = 'books_book';
    
    let books_language_table = 'books_language';
    
    let books_format_table = 'books_format';

    let book_author_table = 'books_author';
    
    if(title) {

      title = title.toLowerCase();
      let tempAr = title.split(",");
      let tempQr = tempAr.map((title) => `LOWER(title) like '${title}%'`)
      const title_query = tempQr.join(' or ');
      book_table =  `(select * from books_book where ${title_query}) as books_book`;

    }

    
    if(book_id) {
      book_table =  `(select * from books_book where id='${book_id}') as books_book`
    }

    if(language) {
      
      language = language.toLowerCase();

      const lang_query = "'" + language.split(",").join("','") + "'";
      
      books_language_table = `(select id, code from books_language where code in (${lang_query})) as books_language`

    }

    let books_format_filter = '';
    
    if(mime_type) {
      
      mime_type = mime_type.toLowerCase();

      const mime_type_query = "'" + mime_type.split(",").join("','") + "'";

      books_format_table = `(select id, mime_type, url, book_id from books_format where LOWER(mime_type) in (${mime_type_query})) as books_format`;

      books_format_filter = ` and ( mime_type in (${mime_type_query}) )`;

    }

    if(author) {
      
      author = author.toLowerCase();

      let tempAr = author.split(",");
      
      let tempQr = tempAr.map((author) => `LOWER(books_author.name) like '${author}%'`)
      
      let temp_join = tempQr.join(' or ');

      book_author_table =  `(select * from books_author where ${temp_join}) as books_author`;

    }

    
    let topic_where_query = '';

    if(topic) {

      topic = topic.toLowerCase();

      let tempAr = topic.split(",");
      
      let tempQr = tempAr.map((topic) => `LOWER(books_subject.name) like '${topic}%' OR LOWER(books_bookshelf.name)  like '${topic}%'`)
      
      topic_where_query = ' AND (' + tempQr.join(' or ') + ')';

    }


   const bookResponse = await new Promise(function (resolve, reject) {

    getConnection(function (err, con) {
      
      if(err) { console.log(err) }

      const bookQuery =  `select 
          DISTINCT 
          books_book.id,
          books_book.title, 
          books_author.name as authors, 
          books_author.birth_year, 
          books_author.death_year, 
          books_language.code as language,
          (
              select GROUP_CONCAT(name) from books_subject 
              inner join books_book_subjects 
              on books_subject.id = books_book_subjects.subject_id
              where books_book_subjects.book_id = books_book.id
          ) as book_subjects,
          (
            select GROUP_CONCAT(name) from books_bookshelf 
            inner join books_book_bookshelves 
            on books_bookshelf.id = books_book_bookshelves.bookshelf_id	
            where books_book_bookshelves.book_id = books_book.id
        ) as book_shelfs,
        (
          select GROUP_CONCAT(
              DISTINCT CONCAT(books_format.url,',',books_format.mime_type) 
              ORDER BY books_format.id 
              SEPARATOR ';'
          ) from  books_format
          where books_format.book_id = books_book.id ${books_format_filter}
        ) as books_formats
        from ${book_table} 
        inner join books_book_authors  on books_book.id = books_book_authors.book_id 
        inner join ${book_author_table} on  books_author.id = books_book_authors.author_id
        inner join books_book_languages on books_book_languages.book_id = books_book.id
        inner join ${books_language_table} on books_language.id = books_book_languages.language_id
        inner join  books_book_subjects on  books_book_subjects.book_id = books_book.id 
        inner join  books_subject on  books_subject.id = books_book_subjects.subject_id 
        inner join books_book_bookshelves on books_book_bookshelves.book_id = books_book.id 
        inner join books_bookshelf on books_bookshelf.id = books_book_bookshelves.bookshelf_id
        inner join ${books_format_table} on  books_format.book_id =  books_book.id
        where 1 ${topic_where_query}
        order by books_book.id
        limit ${start}, ${RECORD_LIMIT}
    `;
  
      con.query(bookQuery, function(err, books) {
          if(err) {
            console.log(err);
          }
          resolve(books)
          con.release();
      });
 
    });
  })

  res.status(200).end(JSON.stringify(bookResponse));
  
});



module.exports = routes;

