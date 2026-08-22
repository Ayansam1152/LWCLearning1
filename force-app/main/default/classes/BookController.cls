public with sharing class BookController {

    @AuraEnabled(cacheable = true)
    public static string searchBooks(String bookName){
        return BookIntegrationService.searchBooks(bookName);
    }
    
}