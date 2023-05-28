MERGE INTO profile (profile_id, username, password, email, sign_up_date, last_modified) VALUES ('001', 'admin',
                                                                                                '$2a$10$CJByT9d39tHRK/tFhwX83uoKiZ98jRJZpUJ4wIqKl7ks0cokoFxvW',
                                                                                                'a@a.com', '2000-01-01',
                                                                                                '2000-01-01');
MERGE INTO profile (profile_id, username, password, email, sign_up_date, last_modified) VALUES ('002', 'profile',
                                                                                                '$2a$10$ecfQei8Qbcwai5Pvoj7nRuEIz2rXgpOGIH7TtnWcL7H3/iPfxIB5i',
                                                                                                'b@b.com', '2000-01-01',
                                                                                                '2000-01-01');
MERGE INTO profile (profile_id, username, password, email, sign_up_date, last_modified) VALUES ('003', 'admin2',
                                                                                                '$2a$10$CJByT9d39tHRK/tFhwX83uoKiZ98jRJZpUJ4wIqKl7ks0cokoFxvW',
                                                                                                'c@c.com', '2000-01-01',
                                                                                                '2000-01-01');
-- INSERT INTO user_role (user_role_id, profile_id, role) VALUES ('001', '001', 'ROLE_USER');
-- INSERT INTO user_role (user_role_id, profile_id, role) VALUES ('002', '001', 'ROLE_ADMIN');
-- INSERT INTO user_role (user_role_id, profile_id, role) VALUES ('003', '002', 'ROLE_USER');
-- INSERT INTO user_role (user_role_id, profile_id, role) VALUES ('004', '003', 'ROLE_ADMIN');
