SELECT
  userAccount.user_name AS UserName
FROM Post
JOIN UserName ON userAccount.user_id = Post.id;