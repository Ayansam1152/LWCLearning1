public with sharing class BookIntegrationService {

    public class BookIntegrationException extends Exception {}
    
    public static String searchBooks(String bookName){

        if(String.isBlank(bookName) || String.isEmpty(bookName))
        {
            throw new BookIntegrationException('Book name cannot be null or empty');
        }
       
        HttpRequest request = new HttpRequest();
        
        // this is for Remote site setting
        // String endpoint =
        //     'https://api.collectapi.com/book/search?query=' +
        //     EncodingUtil.urlEncode(bookName, 'UTF-8');

        // this is for named credential

        String endpoint =
            'callout:Collect_API/book/search?query=' +
            EncodingUtil.urlEncode(bookName, 'UTF-8');
        
        request.setEndpoint(endpoint);
        
        request.setMethod('GET');
        
        request.setHeader('Accept', 'application/json');
        //request.setHeader('User-Agent', 'Salesforce-Apex-Integration');
        
        // request.setHeader(
        //     'Authorization',
        // 'apikey 2CnYcbPQ4q3l0XTNT8e07K:5CupPYbLTeG7guqFzfEpj5'
        //     );
        
        Http http = new Http();
        
        try {
            
            HttpResponse response = http.send(request);
            
            System.debug('Status Code: ' + response.getStatusCode());
            System.debug('Status: ' + response.getStatus());
            System.debug('Response Headers: ' + response.getHeaderKeys());
            System.debug('Response Body: ' + response.getBody());

            return response.getBody();
            
        } catch (CalloutException e) {
            
            throw new BookIntegrationException(e.getMessage());
            // System.debug(
            //     'Callout failed: ' + e.getMessage()
            //     );
        }
    }
}