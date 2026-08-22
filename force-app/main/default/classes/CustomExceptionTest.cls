@isTest
private class CustomExceptionTest {
    @isTest
    static void getMessageReturnsCustomMessage() {
        CustomException exceptionRecord = new CustomException();

        System.assertEquals(
            'Testing my custom exception',
            exceptionRecord.getMessage()
        );
    }
}
