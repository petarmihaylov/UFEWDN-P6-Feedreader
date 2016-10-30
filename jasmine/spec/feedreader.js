/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a url and that it is not empty', function() {
          for (var feed in allFeeds) {
            if( allFeeds.hasOwnProperty( feed ) ) {
              expect(allFeeds[feed].url).toBeDefined();
              expect(allFeeds[feed].url).not.toBe('');
            }
          }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a name and that it is not empty', function() {
           for (var feed in allFeeds) {
             if( allFeeds.hasOwnProperty( feed ) ) {
               expect(allFeeds[feed].name).toBeDefined();
               expect(allFeeds[feed].name).not.toBe('');
             }
           }
         });
    });

    /* New test suite named "The menu" */
    describe('The Menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });


         /* This test ensures the menu changes
          * visibility when th`e menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('appea`s when clicked while hidden and disappears when clicked while showing', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var matchedEntries;

        beforeEach(function(done) {
          loadFeed(0, function() {
            /* Any necessary processing that should be done after the asyc
             * function completes should be listed here
             */
            matchedEntries = $('.entry').length;
            done(); // We run this to indicate we are done and we can move forward
          });
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('should be able to call loadFeed and esure at least one entry exists', function(){
           expect(matchedEntries).toBeGreaterThan(0);
         });

    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
         var matchedEntriesInitialFeed,
             matchedEntriesNewFeed;

         beforeEach(function(done) {
           loadFeed(0, function() {
             /* Any necessary processing that should be done after the asyc
              * function completes should be listed here
              */
             matchedEntriesInitialFeed = $('div article').html();

             loadFeed(1, function() {
               /* Any necessary processing that should be done after the asyc
                * function completes should be listed here
                */
               matchedEntriesNewFeed = $('div article').html();
               done(); // We run this to indicate we are done and we can move forward
             });
             done(); // We run this to indicate we are done and we can move forward
           });

         });

         /* This test ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          */
          it('should display a new feed', function(){
            expect(matchedEntriesInitialFeed).not.toEqual(matchedEntriesNewFeed);
          });

    });
}());
