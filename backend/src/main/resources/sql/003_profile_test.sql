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
VALUES
(14, 'test@test.com', '$2a$10$SYxEndfsdwxVkmfXK/kYmOVCO7wTwsdUL2Y7o2THDnfLKPJGSlHG2', 'nicknameTest', 'Australia',
 'firstName', 'lastName', 'Brisbane', 'QLD', 'http://', '2017-03-31 20:33:13', '2017-03-31 20:33:13', 'ROLE_ADMIN',
 'NONE', 0);

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
  VALUES
  (15, 'role_user@test.com', '$2a$10$SYxEndfsdwxVkmfXK/kYmOVCO7wTwsdUL2Y7o2THDnfLKPJGSlHG2', 'role_user', 'Australia',
   'role', 'user', 'Brisbane', 'QLD', 'http://', '2017-03-31 20:33:13', '2017-03-31 20:33:13', 'ROLE_USER',
 'NONE', 0
);

-- password is "password"

MERGE INTO tag (tag_id, name) VALUES (1, 'a');