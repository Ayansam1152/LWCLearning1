public with sharing class AccountClass {
   
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String searchText){
        try {
            if(String.isBlank(searchText))
            {
                return [Select Id, Name From Account];
            }
            else
            {
                searchText = '%'+searchText+'%';
                return [Select Id, Name From Account WHERE Name like :searchText];
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}