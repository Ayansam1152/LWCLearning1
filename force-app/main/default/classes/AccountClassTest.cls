@isTest
private class AccountClassTest {
    @isTest static void testGetAccounts() {
        // Arrange
        Account acc1 = new Account(Name = 'Test Account 1');
        Account acc2 = new Account(Name = 'Another Account');
        insert new List<Account>{acc1, acc2};

        // Act & Assert
        // Test with blank searchText
        List<Account> resultBlank = AccountClass.getAccounts('');
        System.assertEquals(2, resultBlank.size());
        // Test with specific searchText
        List<Account> resultSearch = AccountClass.getAccounts('Test');
        System.assertEquals(1, resultSearch.size());
        System.assertEquals('Test Account 1', resultSearch[0].Name);
        // Test with non-matching searchText
        List<Account> resultNone = AccountClass.getAccounts('Nonexistent');
        System.assertEquals(0, resultNone.size());
        }
}