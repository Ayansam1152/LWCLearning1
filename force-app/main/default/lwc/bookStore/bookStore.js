import { LightningElement, wire } from 'lwc';
import searchBooks from '@salesforce/apex/BookController.searchBooks';

export default class BookStore extends LightningElement {
    enteredText;
    searchText;
    showText = 'Please enter valid book name';
    books = [];
    hasBooks = false;
    isLoading = false;
    IMAGE_BASE_URL = 'https://i.dr.com.tr';

    handleChange(event)
    {
        this.enteredText = event.target.value;
    }

   async handleSearchClick(event)
    {
        // call the apex
        if(this.searchText != this.enteredText)
        {
            this.isLoading = true;
        }

        this.searchText = this.enteredText;
        

        //this.books = await searchBooks({bookName:this.searchText});

        //this.hasBooks = this.books.length > 0 ? true : false;
    }

    @wire(searchBooks,{bookName:'$searchText'})
    fetchResult(result)
    {
        if(result.data)
        {
            let data = JSON.parse(result.data);

            if(data.success)
            {
                //this.books = data.result;
                this.showText = '';

                this.books = data.result.map(book => {
                    const imagePath = book.image?.replace(/^\.{3}/, '');

                    return {
                        ...book,
                        fullImageUrl: imagePath
                            ? `${this.IMAGE_BASE_URL}${imagePath}`
                            : null
                    };
                });
                
                // for (let index = 0; index < data.result.length; index++) {
                //     const element = data.result[index];
                //     console.log(element);
                // }
            }
            else
            {
                this.books = [];
            }
        }
        else if(result.error)
        {
            console.log('Error occurred while searching the books: '+ result.error);
            this.showText = 'Error occurred while searching the books: '+ result.error;
        }

        this.isLoading = false;
    }
}