public class QueableExample Implements Queueable {
	
    public void execute(QueueableContext BC)
    {
        List<Lead> leads = [Select FirstName, LastName, Company, status From Lead];
         
        for(Lead record : leads)
        {
            record.company = 'Infosys';
        }
        
        update leads;
        
         QueableExample2 obj2 = new QueableExample2();
    	Id jobId = System.enqueueJob(obj2);
    }
}