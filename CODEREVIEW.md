##Code Review

###Code smell for the code of okreads:
-The page is not responsive. It breaks in mobile view.
-Same search results displayed until pressed enter.
-We cannot remove items from the reading list from previous search, but only can remove from latest search. Even if we remove from previous search, the book do not gets added back.
-Test case failed for books-data-access

###Improvements suggestions:
-While the code is loading skeleton or loader or progress bar can be shown. Added a progress bar. _done_
-The application can be made responsive so that it can be viewed in different screen sizes. _done_
-Improve accessibility by adding alt text and contrast between background and text.Changed the font style to bold to improve the visibility. _done_
-No instant search.._done_

###web accessibility (a11y):
-Low contrast in foreground and background at 2 places. -Accessibility fails at AA and AAA level.
-For the books image alt text should be given.
-Tab focus do not go to the “Javascript” link




