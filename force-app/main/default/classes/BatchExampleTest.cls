@isTest
private class BatchExampleTest {
    @isTest
    static void executeUpdatesLeadCompanies() {
        List<Lead> leads = new List<Lead>{
            new Lead(LastName = 'Batch Lead One', Company = 'Original Company'),
            new Lead(LastName = 'Batch Lead Two', Company = 'Original Company')
        };
        insert leads;
        List<Id> leadIds = new List<Id>();
        for (Lead leadRecord : leads) {
            leadIds.add(leadRecord.Id);
        }

        Test.startTest();
        Database.executeBatch(new BatchExample(), 200);
        Test.stopTest();

        List<Lead> updatedLeads = [
            SELECT Company
            FROM Lead
            WHERE Id IN :leadIds
        ];

        System.assertEquals(2, updatedLeads.size());
        for (Lead leadRecord : updatedLeads) {
            System.assertEquals('HCL', leadRecord.Company);
        }
    }
}
