public with sharing class AccountHelper {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(Id accountId) {
        try {
            return [SELECT Name, Phone FROM Account WHERE Id = :accountId];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching account list: ' + e.getMessage());
        }
    }
}