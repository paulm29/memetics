MERGE INTO profile (
profile_id,
email,
password,
nickname,
country,
first_name,
last_name,
city,
state,
web_site,
modified_date,
created_date,
role,
sign_in_provider,
version
)
  VALUES (1, 'drmobutu@gmail.com', NULL, 'AussieMaga', 'Australia', 'Aussie', 'MAGA', 'City', 'VIC', NULL,
          '2017-08-16 08:52:20', '2017-01-23 14:00:00', 'ROLE_ADMIN', 'TWITTER', 0);

MERGE INTO profile (
profile_id,
email,
password,
nickname,
country,
first_name,
last_name,
city,
state,
web_site,
modified_date,
created_date,
role,
sign_in_provider,
version
)
VALUES (2, 'aussiemaga@outlook.com', NULL, 'AupolNews', 'Australia', 'aupol', 'news', 'City', 'Vic', NULL,
        '2017-06-30 11:09:38', '2017-06-30 11:09:38', 'ROLE_ADMIN', 'TWITTER', 0);

MERGE INTO userconnection (USERID, PROVIDERID, PROVIDERUSERID, RANK, DISPLAYNAME, PROFILEURL, IMAGEURL, ACCESSTOKEN,
                           SECRET, REFRESHTOKEN, EXPIRETIME)
VALUES ('drmobutu@gmail.com', 'twitter', '800616534502539264', 1, '@AussieMAGA', 'http://twitter.com/AussieMAGA',
        'http://pbs.twimg.com/profile_images/884734529461551105/2jiB0nOU_normal.jpg',
        '800616534502539264-CFhNm2YR1erqoX2jtkgdv5IYxvl4BBi', 'l7EGRF9ZqusIlOyYRV5P8mY4zwTudEjhk61vU7RU1qqCo', NULL,
        NULL),
       ('aussiemaga@outlook.com', 'twitter', '870769769053421569', 1, '@AupolNews', 'http://twitter.com/AupolNews',
        'http://pbs.twimg.com/profile_images/873313835440001024/qo2AclRo_normal.jpg',
        '870769769053421569-hMWBAmL5p1XqMdDBgdhw1NduHRFV7K1', '2Hkc651CLlSouTnrYoIukXoi9IJkrH1HPa9BtAmhEhgTE', NULL,
        NULL);
