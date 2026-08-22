public class BatchExample implements Database.Batchable<SObject> {
	
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator('Select FirstName, LastName, Company, Status from Lead');
    }
    
    public void execute(Database.BatchableContext bc, List<Lead> scope)
    {
        System.debug('I am in execute method');
        
        for(Lead record : scope)
        {
            record.company = 'HCL';
        }
        
        update scope;
    }
    
    public void finish(Database.BatchableContext bc)
    {
        System.debug('Job Done, I am from finish method');
    }
}