@isTest
private class QueableExampleTest {
    @isTest
    static void executeUpdatesLeadsAndQueuesFollowUpJob() {
        Lead leadRecord = new Lead(
            LastName = 'Queueable Lead',
            Company = 'Original Company'
        );
        insert leadRecord;

        Test.startTest();
        new QueableExample().execute(null);

        Lead leadAfterFirstJob = [
            SELECT Company
            FROM Lead
            WHERE Id = :leadRecord.Id
        ];
        System.assertEquals('Infosys', leadAfterFirstJob.Company);

        Test.stopTest();

        Lead leadAfterFollowUpJob = [
            SELECT Company
            FROM Lead
            WHERE Id = :leadRecord.Id
        ];
        System.assertEquals('HCL - Testing', leadAfterFollowUpJob.Company);
    }
}
