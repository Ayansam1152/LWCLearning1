public class QueableExample2 Implements Queueable {
	
    public void execute(QueueableContext BC)
    {
        List<Lead> leads = [Select FirstName, LastName, Company, status From Lead];
         
        for(Lead record : leads)
        {
            record.company = 'HCL - Testing';
        }
        
        update leads;
    }
   
}