const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')

require('./initDB')();

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/* creation du schema */
const bookSchema = mongoose.Schema({
    author: String,
    bookTitle: String,
    yearPub: Number
});

/* creation d'un model avec le schema */
const Book = mongoose.model('Book', bookSchema);

const router = express.Router();
router.route('/')
.get(function(req,res){
    Book.find(function(err, books){
        if(err){
            res.send(err);
        }
        res.send(books);
    })
})

//aiguillage d'ajout sans id
.post(function(req,res){
   let book = new Book()
    book.author = req.body.author;
    book.bookTitle = req.body.bookTitle;
    book.yearPub = req.body.yearPub;
    book.save(function(err){
            if(err){
                res.send(err)
            }
            res.send({message: 'book created'})
        })
    })


//aiguillage avec id
router.route('/:book_id')
    .get(function(req,res){
        Book.findOne({_id: req.params.book_id}, function(err,book){
            if(err){
                res.send(err)
            }
            res.send(book);
        })
    })

    .put(function(req,res){
        Book.findOne({_id: req.params.book_id}, function(err,book){
            book.author = req.body.author;
            book.bookTitle = req.body.bookTitle;
            book.yearPub = req.body.yearPub;
            book.save(function(err){
                if(err){
                    res.send(err)
                }
                res.send({message: 'Book updated'})
            })

    
        })
    })
    .delete(function(req,res){
        Book.remove({_id: req.params.book_id}, function(err){
            if(err){
                res.send(err);
            }
            res.send({message: 'Book deleted'})
        })
    })


app.use('/api',router)

app.listen(process.env.PORT, function(){
    console.log('Listening on ' + process.env.PORT)
})