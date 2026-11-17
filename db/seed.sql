-- Run with `npm run db:seed`, or paste into any Postgres SQL console (Render, psql, etc.).

CREATE TABLE IF NOT EXISTS meetings (
  id             SERIAL        PRIMARY KEY,
  date           DATE          NOT NULL UNIQUE,
  meeting_type   VARCHAR(20)   NOT NULL
                               CHECK (meeting_type IN
                                 ('testimony','regular','stake','general','special')),
  presiding      VARCHAR(255)  NOT NULL,
  conducting     VARCHAR(255)  NOT NULL,
  announcements  TEXT[]        DEFAULT '{}',
  opening_hymn   JSONB         NOT NULL,
  opening_prayer VARCHAR(255)  NOT NULL,
  ward_business  JSONB         DEFAULT '[]',
  stake_business BOOLEAN       DEFAULT false,
  sacrament_hymn JSONB         NOT NULL,
  speakers       JSONB         DEFAULT '[]',
  closing_hymn   JSONB         NOT NULL,
  closing_prayer VARCHAR(255)  NOT NULL
);

INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  '2026-01-04','testimony','Bishop Thompson','Brother Nakamura',
  ARRAY[]::TEXT[],
  '{"number":134,"title":"I Believe in Christ"}','Sister Park',
  '[]',false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[]',
  '{"number":219,"title":"Because I Have Been Given Much"}','Brother Alvarez'
),
(
  '2026-01-11','regular','Bishop Thompson','Brother Nakamura',
  ARRAY['Ward temple night: Jan 30'],
  '{"number":2,"title":"The Spirit of God"}','Sister Ramirez',
  '[{"description":"Sustaining of new Sunday School president"}]',true,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},
    {"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Lewis'
),
(
  '2026-01-18','regular','Bishop Thompson','Sister Torres',
  ARRAY['Ministering interviews this week'],
  '{"number":85,"title":"How Firm a Foundation"}','Brother Kim',
  '[{"description":"Release - Sister Martinez - Primary Teacher"},{"description":"Sustain - Sister Agbavor - Primary Teacher"},{"description":"Sustain - Sister Mukiwa - RS 2nd Counselor"}]',false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},
    {"name":"Youth Choir","topic":"","type":"musical-number"},
    {"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]',
  '{"number":226,"title":"Improve the Shining Moments"}','Sister Jensen'
),
(
  '2026-01-25','stake','President Gimenez','Stake Presidency',
  ARRAY['Stake conference — no ward meetings'],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}','Sister Okafor',
  '[]',true,
  '{"number":185,"title":"Reverently and Meekly Now"}',
  '[{"name":"President Gimenez","topic":"Gathering Israel","type":"speaker"}]',
  '{"number":85,"title":"How Firm a Foundation"}','Brother Whitaker'
),
(
  '2026-03-01','testimony','Bishop Smith','Brother Jones',
  ARRAY['Youth fireside: March 8'],
  '{"number":2,"title":"The Spirit of God"}','Sister Williams',
  '[]',false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[]',
  '{"number":30,"title":"Come, Come, Ye Saints"}','Brother Davis'
),
(
  '2026-04-05','general','Stake Presidency','Stake Presidency',
  ARRAY['General conference broadcast'],
  '{"number":1,"title":"The Morning Breaks"}','To be announced',
  '[]',false,
  '{"number":193,"title":"I Stand All Amazed"}',
  '[]',
  '{"number":85,"title":"How Firm a Foundation"}','To be announced'
),
(
  '2026-05-03','regular','Bishop Smith','Brother Jones',
  ARRAY['Ward temple night: May 10'],
  '{"number":2,"title":"The Spirit of God"}','Sister Williams',
  '[{"description":"Sustaining of new Primary president"}]',false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Brown","topic":"Faith in Jesus Christ","type":"speaker"},
    {"name":"Youth Choir","topic":"","type":"musical-number"}]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}','Brother Davis'
),
(
  '2026-07-26','special','Bishop Smith','Sister Torres',
  ARRAY['Pioneer Day ward picnic after church'],
  '{"number":30,"title":"Come, Come, Ye Saints"}','Brother Kim',
  '[]',false,
  '{"number":181,"title":"Jesus of Nazareth, Savior and King"}',
  '[{"name":"Primary Children","topic":"","type":"musical-number"},
    {"name":"Sister Chen","topic":"Faith of the Pioneers","type":"speaker"}]',
  '{"number":36,"title":"They, the Builders of the Nation"}','Sister Park'
),
(
  '2026-11-01','testimony','Bishop Smith','Brother Jones',
  ARRAY['Ward temple night this month'],
  '{"number":2,"title":"The Spirit of God"}','Sister Williams',
  '[]',false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[]',
  '{"number":30,"title":"Come, Come, Ye Saints"}','Brother Davis'
),
(
  '2026-11-08','regular','Bishop Smith','Brother Nakamura',
  ARRAY['Ward service project this month'],
  '{"number":6,"title":"Redeemer of Israel"}','Sister Ramirez',
  '[{"description":"Sustain - Brother Osei - Elders Quorum Secretary"}]',false,
  '{"number":185,"title":"Reverently and Meekly Now"}',
  '[{"name":"Sister Brown","topic":"Faith in Jesus Christ","type":"speaker"},
    {"name":"Ward Choir","topic":"","type":"musical-number"},
    {"name":"Brother Davis","topic":"Serving with love","type":"speaker"}]',
  '{"number":134,"title":"I Believe in Christ"}','Sister Taylor'
),
(
  '2026-11-15','regular','Bishop Smith','Sister Torres',
  ARRAY['Thanksgiving food drive through Nov 22'],
  '{"number":92,"title":"For the Beauty of the Earth"}','Brother Lewis',
  '[]',false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[{"name":"Brother Santos","topic":"Gratitude","type":"speaker"},
    {"name":"Sister Smith","topic":"Ministering","type":"speaker"}]',
  '{"number":94,"title":"Come, Ye Thankful People"}','Sister Jensen'
),
(
  '2026-11-22','regular','Bishop Smith','Brother Jones',
  ARRAY[]::TEXT[],
  '{"number":3,"title":"Now Let Us Rejoice"}','Sister Okafor',
  '[]',false,
  '{"number":169,"title":"As Now We Take the Sacrament"}',
  '[{"name":"Sister Agbavor","topic":"The Atonement of Jesus Christ","type":"speaker"},
    {"name":"Brother Alvarez","topic":"Missionary Work","type":"speaker"}]',
  '{"number":98,"title":"I Need Thee Every Hour"}','Brother Whitaker'
)
ON CONFLICT (date) DO NOTHING;
