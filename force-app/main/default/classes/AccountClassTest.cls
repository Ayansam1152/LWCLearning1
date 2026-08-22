@isTest
private class AccountClassTest {
    @testSetup
    static void setupData() {
        List<Account> accounts = new List<Account>{
            new Account(Name = 'Test Account 1'),
            new Account(Name = 'Another Account')
        };
        insert accounts;

        insert new Contact(
            FirstName = 'Test',
            LastName = 'Contact',
            AccountId = accounts[0].Id
        );
    }

    @isTest
    static void testGetAccounts() {
        List<Account> resultBlank = AccountClass.getAccounts('');

        System.assertEquals(2, resultBlank.size());

        List<Account> resultSearch = AccountClass.getAccounts('Test');
        System.assertEquals(1, resultSearch.size());
        System.assertEquals('Test Account 1', resultSearch[0].Name);

        List<Account> resultNone = AccountClass.getAccounts('Nonexistent');
        System.assertEquals(0, resultNone.size());
    }

    @isTest
    static void testGetAccountContacts() {
        Account accountRecord = [
            SELECT Id
            FROM Account
            WHERE Name = 'Test Account 1'
            LIMIT 1
        ];

        List<Contact> contacts = AccountClass.getAccountContacts(accountRecord.Id);

        System.assertEquals(1, contacts.size());
        System.assertEquals('Test Contact', contacts[0].Name);
    }
}
