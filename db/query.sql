SELECT *
FROM userAccount,
JOIN userPosts ON userPosts.UserName = userAccount.UserName;

SELECT *
FROM venues,
JOIN VenueName ON userPosts.VenueName = venues.VenueName;

SELECT *
FROM genres,
JOIN genres ON userPosts.Genres = genres.GenreName;