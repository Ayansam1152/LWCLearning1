@isTest
private class AccountHelperTest {
    @isTest static void testAccountHelperMethod() {
        // Arrange
        Account acc = new Account(Name = 'Helper Test Account');
        insert acc;

        // Act
        List<Account> accounts = AccountHelper.getAccountList('Helper Test Account');

        // Assert
        System.assertEquals(1,  accounts.size());
        System.assertEquals('Helper Test Account', accounts[0].Name);
        }
}