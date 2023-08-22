-- Insert data into the 'UserAccount' table
INSERT INTO UserAccount (user_name, first_name, last_name, email, password)
VALUES ('john_doe', 'John', 'Doe', 'john@example.com', 'hashed_password');

-- Insert data into the 'post' table
INSERT INTO post (user_name, title, venue_name, event_date, genre, post_text)
VALUES ('john_doe', 'Sample Post', 'Sample Venue', '2023-08-17', 'Rock', 'This is a sample post.');
