@isTest
private class AccountHelperTest {
    @isTest
    static void testAccountHelperMethod() {
        Account acc = new Account(Name = 'Helper Test Account', Phone = '555-0100');
        insert acc;

        List<Account> accounts = AccountHelper.getAccountList(acc.Id);

        System.assertEquals(1, accounts.size());
        System.assertEquals('Helper Test Account', accounts[0].Name);
        System.assertEquals('555-0100', accounts[0].Phone);
    }
}
