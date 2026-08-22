@isTest
private class BookIntegrationServiceTest {
    private class FailingBookApiMock implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest request) {
            throw new CalloutException('Mock callout failure');
        }
    }

    @isTest
    static void searchBooksReturnsResponseBody() {
        Test.setMock(HttpCalloutMock.class, new BookApiMock());

        Test.startTest();
        String result = BookIntegrationService.searchBooks('Atomic Habits');
        Test.stopTest();

        System.assertNotEquals(null, result);
        System.assert(result.contains('"success":true'));
        System.assert(result.contains('Atomic Habits'));
    }

    @isTest
    static void searchBooksRejectsBlankBookName() {
        Boolean exceptionThrown = false;

        try {
            BookIntegrationService.searchBooks('');
        } catch (BookIntegrationService.BookIntegrationException e) {
            exceptionThrown = true;
            System.assertEquals('Book name cannot be null or empty', e.getMessage());
        }

        System.assert(exceptionThrown, 'Expected blank book name to throw an exception.');
    }

    @isTest
    static void searchBooksWrapsCalloutFailures() {
        Test.setMock(HttpCalloutMock.class, new FailingBookApiMock());

        Boolean exceptionThrown = false;

        Test.startTest();
        try {
            BookIntegrationService.searchBooks('Failure Case');
        } catch (BookIntegrationService.BookIntegrationException e) {
            exceptionThrown = true;
            System.assert(e.getMessage().contains('Mock callout failure'));
        }
        Test.stopTest();

        System.assert(exceptionThrown, 'Expected callout failures to be wrapped.');
    }
}
