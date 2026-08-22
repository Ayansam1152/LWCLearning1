@isTest
private class QueableExample2Test {
    @isTest
    static void executeUpdatesLeadCompanies() {
        List<Lead> leads = new List<Lead>{
            new Lead(LastName = 'Queueable Two Lead One', Company = 'Original'),
            new Lead(LastName = 'Queueable Two Lead Two', Company = 'Original')
        };
        insert leads;
        List<Id> leadIds = new List<Id>();
        for (Lead leadRecord : leads) {
            leadIds.add(leadRecord.Id);
        }

        Test.startTest();
        System.enqueueJob(new QueableExample2());
        Test.stopTest();

        List<Lead> updatedLeads = [
            SELECT Company
            FROM Lead
            WHERE Id IN :leadIds
        ];

        System.assertEquals(2, updatedLeads.size());
        for (Lead leadRecord : updatedLeads) {
            System.assertEquals('HCL - Testing', leadRecord.Company);
        }
    }
}
