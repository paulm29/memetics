--liquibase formatted sql
--changeset PR:create-multiple-tables splitStatements:true endDelimiter:;
CREATE SCHEMA IF NOT EXISTS memetics;
SET SCHEMA 'memetics';
CREATE TABLE IF NOT EXISTS UserConnection (
  userId VARCHAR(255) NOT NULL,
  providerId VARCHAR(255) NOT NULL,
  providerUserId VARCHAR(255),
  accessToken VARCHAR(512) NOT NULL,
  displayName VARCHAR(255),
  expireTime bigint,
  imageUrl VARCHAR(512),
  profileUrl VARCHAR(512),
  rank int NOT NULL,
  refreshToken VARCHAR(512),
  secret VARCHAR(512),
  CONSTRAINT user_connection_pk primary key (userId, providerId, providerUserId));

CREATE TABLE IF NOT EXISTS profile (
  profile_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100),
  nickname VARCHAR(30) NOT NULL,
  country VARCHAR(50) NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  city VARCHAR(30),
  state VARCHAR(30),
  web_site VARCHAR(50),
  modified_date TIMESTAMP DEFAULT NULL,
  created_date TIMESTAMP DEFAULT NULL,
  role VARCHAR(20) NOT NULL,
  sign_in_provider VARCHAR(20),
  version BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT profile_pk PRIMARY KEY (profile_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS uk_profile_email ON profile(email);
CREATE UNIQUE INDEX IF NOT EXISTS uk_profile_nickname ON profile(nickname);

CREATE TABLE IF NOT EXISTS meme (
  meme_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  created_date TIMESTAMP DEFAULT NULL,
  modified_date TIMESTAMP DEFAULT NULL,
  credits VARCHAR(100),
  delete_link VARCHAR(100),
  profile_id BIGINT NOT NULL,
  title VARCHAR(100),
  caption VARCHAR(280),
  url VARCHAR(100),
  usage_count BIGINT NOT NULL DEFAULT 0,
  duplicate BIGINT NOT NULL DEFAULT 0,
  original_content SMALLINT NOT NULL DEFAULT 0,
  is_active SMALLINT NOT NULL DEFAULT 1,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (meme_id),
  CONSTRAINT meme_profile_fk FOREIGN KEY (profile_id) REFERENCES profile (profile_id));
CREATE INDEX IF NOT EXISTS meme_profile_fk_ix ON meme(profile_id);

CREATE TABLE IF NOT EXISTS vote (
  vote_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  meme_id BIGINT NOT NULL,
  profile_id BIGINT NOT NULL,
  score BIGINT NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (vote_id),
  CONSTRAINT vote_profile_fk FOREIGN KEY (profile_id) REFERENCES profile (profile_id),
  CONSTRAINT vote_meme_fk FOREIGN KEY (meme_id) REFERENCES meme (meme_id));
CREATE INDEX IF NOT EXISTS vote_meme_fk_ix ON vote(meme_id);
CREATE INDEX IF NOT EXISTS vote_profile_fk_ix ON vote(profile_id);

CREATE TABLE IF NOT EXISTS comment (
  comment_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  comment_text VARCHAR(280),
  created_date TIMESTAMP DEFAULT NULL,
  modified_date TIMESTAMP DEFAULT NULL,
  meme_id BIGINT DEFAULT NULL,
  profile_profile_id BIGINT DEFAULT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (comment_id),
  CONSTRAINT comment_profile_fk FOREIGN KEY (profile_profile_id) REFERENCES profile (profile_id),
  CONSTRAINT comment_meme_fk FOREIGN KEY (meme_id) REFERENCES meme (meme_id));
CREATE INDEX IF NOT EXISTS comment_meme_fk_ix ON comment(meme_id);
CREATE INDEX IF NOT EXISTS comment_profile_fk_ix ON comment(profile_profile_id);

CREATE TABLE IF NOT EXISTS follow (
  follow_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  follower_id BIGINT NOT NULL,
  following_id BIGINT NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (follow_id),
  CONSTRAINT follow_profile_fk FOREIGN KEY (following_id) REFERENCES profile (profile_id));
CREATE INDEX IF NOT EXISTS follow_profile_fk_ix ON follow(following_id);

CREATE TABLE IF NOT EXISTS tag (
  tag_id  BIGINT       NOT NULL GENERATED ALWAYS AS IDENTITY,
  name    VARCHAR(255) NOT NULL,
  version BIGINT       NOT NULL DEFAULT 0,
  PRIMARY KEY (tag_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS tag_name_uk ON tag(name);

CREATE TABLE IF NOT EXISTS meme_tag (
  meme_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT meme_tag_tag_fk
  FOREIGN KEY (tag_id)
  REFERENCES tag (tag_id),
  CONSTRAINT meme_tag_meme_fk FOREIGN KEY (meme_id) REFERENCES meme (meme_id)
);
CREATE INDEX IF NOT EXISTS meme_tag_tag_fk_ix ON meme_tag(tag_id);
CREATE INDEX IF NOT EXISTS meme_tag_meme_fk_ix ON meme_tag(meme_id);

CREATE TABLE IF NOT EXISTS user_role (
  user_role_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  profile_id BIGINT,
  role VARCHAR(255),
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_role_id)
);

CREATE TABLE IF NOT EXISTS tweet_info (
  tweet_info_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  profile_id BIGINT NOT NULL,
  meme_id BIGINT NOT NULL,
  status_id VARCHAR(255) NOT NULL,
  text VARCHAR(280) NOT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  from_user VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (tweet_info_id)
);

CREATE TABLE IF NOT EXISTS hashtag_favourite (
  hashtag_favourite_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  profile_id BIGINT NOT NULL,
  hashtag VARCHAR(255),
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (hashtag_favourite_id),
  CONSTRAINT hashtag_favourite_profile_fk FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);
CREATE INDEX IF NOT EXISTS hashtag_favourite_profile_fk_ix ON hashtag_favourite(profile_id);

CREATE TABLE IF NOT EXISTS queue_item
(
  queue_item_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  profile_id BIGINT NOT NULL,
  meme_id BIGINT,
  content VARCHAR(280),
  hashtags VARCHAR(280),
  text_only BIGINT NOT NULL DEFAULT 0,
  posted BIGINT NOT NULL DEFAULT 0,
  created_date TIMESTAMP DEFAULT NULL,
  modified_date TIMESTAMP DEFAULT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (queue_item_id),
  CONSTRAINT queue_item_profile_fk FOREIGN KEY (profile_id) REFERENCES profile (profile_id),
  CONSTRAINT queue_item_meme_fk FOREIGN KEY (meme_id) REFERENCES meme (meme_id)
);
CREATE INDEX IF NOT EXISTS queue_item_meme_fk_ix ON queue_item (meme_id);
CREATE INDEX IF NOT EXISTS queue_item_profile_fk_ix ON queue_item (profile_id);

CREATE TABLE IF NOT EXISTS schedule (
  schedule_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  profile_id BIGINT NOT NULL,
  created_date TIMESTAMP DEFAULT NULL,
  modified_date TIMESTAMP DEFAULT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (schedule_id),
  CONSTRAINT schedule_profile_fk FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);
CREATE INDEX IF NOT EXISTS schedule_profile_fk_ix ON schedule(profile_id);
CREATE UNIQUE INDEX IF NOT EXISTS uk_schedule_profile_id ON schedule(profile_id);

CREATE TABLE IF NOT EXISTS schedule_day (
  day_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  schedule_id BIGINT NOT NULL,
  day VARCHAR(10) NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (day_id),
  CONSTRAINT day_schedule_fk FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id)
);
CREATE INDEX IF NOT EXISTS day_schedule_fk_ix ON schedule_day(schedule_id);

CREATE TABLE IF NOT EXISTS schedule_time (
  time_id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  schedule_id BIGINT NOT NULL,
  time TIME NOT NULL,
  version BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (time_id),
  CONSTRAINT time_schedule_fk FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id)
);
CREATE INDEX IF NOT EXISTS time_schedule_fk_ix ON schedule_time(schedule_id);
